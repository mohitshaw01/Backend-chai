import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

// This middleware is used to verify the access token
// It checks if the token is present in the request header or cookies
// If the token is present, it verifies the token using jwt.verify
// If the token is verified, it then checks if the user is present in the database
// If the user is present, it attaches the user object to the request object
// If the user is not present, it throws an error
export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const decoded = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!decoded) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
        // we can use req.user to find the current logged in user
        req.user = decoded;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
});