import {asyncHandler} from "../utils/asyncHandler.js";
import {Video} from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

const publishAVideo = asyncHandler(async (req,res) => {
    // steps to publish a video
    // 1. get title and description from the request body
    // 2. upload video and thumbnail to cloudinary
    // 3. create a video document in the database
    // 4. update the user document with the video id
    // 5. send the response

    // get title and description from the request body
    const {title,description} = req.body;

    if(!title){
        throw new ApiError(400,"Please provide title of the video");
    }

    const videoLocalPath = req.files?.videoFile[0].path;
    if(!videoLocalPath){
        throw new ApiError(400,"Please provide video file");
    }

    const thumbnailLocalPath = req.files?.thumbnail[0].path;
    if(!thumbnailLocalPath){
        throw new ApiError(400,"Please provide thumbnail");
    }
    

    // upload video and thumbnail to cloudinary
    const videoFile = await uploadOnCloudinary(videoLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if(!videoFile || !thumbnail){
        throw new ApiError(500,"Failed to upload video or thumbnail");
    }
    // req.user?._id is the id of the user who is publishing the video
    // meaning of req.user 
    const user = await User.findById(req.user?._id);

    if(!user){
        throw new ApiError(404,"User not found");
    }
    // store the url in the mongodb database
    const video = await Video.create({
        videoFile : videoFile.secure_url,
        thumbnail : thumbnail.secure_url,
        owner : req.user?._id,
        title : title,
        description : description || " ",
        duration : videoFile.duration
    });

    //we are storing owner id for every video
    // so that we can get all videos of a user

    // send the response
    res.status(200).json(
        new ApiResponse(200,video,"video published Successfully")
    );

});

const getVideoById = asyncHandler(async (req,res) => {

})

export {publishAVideo,getVideoById}