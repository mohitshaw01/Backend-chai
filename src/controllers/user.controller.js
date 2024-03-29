import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// if we do not use asyncHadler, we will have to use try catch block in every controller function

// asyncHandler is a middleware that takes a function and returns a new function that takes the same parameters
// and calls the original function. It then wraps the call to the original function in a try/catch block and calls next with any error that occurs.
// If the original function returns a promise, it will call next with any error that occurs, otherwise it will call next with no arguments.
// This allows you to write async route handlers and middleware in a synchronous style, without having to catch any errors or call next yourself.
// It also allows you to use the same error handling logic for synchronous route handlers and middleware.
// It is a good practice to use asyncHandler in every controller function
// asyncHandler will catch any error that occurs in the controller function and pass it to the next middleware
// if the controller function returns a promise, asyncHandler will catch any error that occurs in the promise and pass it to the next middleware
// if the controller function does not return a promise, asyncHandler will pass the control to the next middleware
// asyncHandler will catch any error that occurs in the controller function and pass it to the next middleware

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if(!user){
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // explain the below line
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Token generation failed");
  }
};

const registeredUser = asyncHandler(async (req, res) => {
  console.log("in registeredUser function in user.controller.js");
  // steps to register a user
  // 1. get the user data from the request body
  // 2. validate the user data
  // 3. check if the user already exists
  // 4. check for images  and upload them to cloudinary
  // 5. create a new user and check if the user is created
  //6. remove password from the user object before sending it to the client
  console.log(req.body);
  const { fullname, email, username, password } = req.body;
  // if the data is not present in the request body, we will throw an error
  if (!fullname || !email || !username || !password) {
    throw new ApiError(400, "All fields are required");
  }
  // check email formatting
  const emailRegex = /\S+@\S+\.\S+/;
  if (emailRegex.test(email) === false) {
    throw new ApiError(400, "Invalid email");
  }
  // check username formatting
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (usernameRegex.test(username) === false) {
    throw new ApiError(400, "Invalid username");
  }
  // finding user by username or email
  const user = await User.findOne({ $or: [{ email }, { username }] });
  // if user already exists, we will throw an error
  if (user) {
    throw new ApiError(400, "User already exists");
  }
  // checking for files using ternary
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverimageLocalPath = req.files?.coverimage[0]?.path;
  if (!avatarLocalPath || !coverimageLocalPath) {
    throw new ApiError(400, "Avatar and cover image are required");
  }
  // uploading images to cloudinary
  // console.log(avatarLocalPath);
  const avatar_upload = await uploadOnCloudinary(avatarLocalPath);
  const coverimage_upload = await uploadOnCloudinary(coverimageLocalPath);
  //
  // console.log(avatar_upload);
  // console.log(coverimage_upload);
  //
  const newUser = await User.create({
    fullname,
    email,
    username,
    password,
    avatar: avatar_upload.url || " ",
    coverimage: coverimage_upload?.url || " ",
  });
  // finding user by id and not selecting password and refreshToken
  const usercreated = await User.findById(newUser._id).select(
    "-password -refreshToken",
  );
  if (!usercreated) {
    throw new ApiError(500, "User not created");
  }
  // giving a response to the client
  const response = new ApiResponse(201, "User created", usercreated);
  res.status(response.statusCode).json(response);
});

const loginUser = asyncHandler(async (req, res) => {
  //steps to login a user
  // 1. get the user data from the request body
  // 2. validate the user data
  // 3. check if the user exists
  // 4. check if the password matches
  // 5. create a token and send it to the client
  const { email, password, username } = req.body;
  // if the data is not present in the request body, we will throw an error
  if (!email || !password || !username) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({ $or: [{ email }, { username }] });
  // if user does not exist, we will throw an error
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }
  // check if the password matches
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }
  // create a token and send it to the client
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  //steps to logout a user
  // 1. clear the refresh token
  // 2. clear the access token
  // 3. send a response to the client
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  res.clearCookie("refreshToken", options);
  res.clearCookie("accessToken", options);
  res.status(200).json(new ApiResponse(200, "User logged out successfully"));
});


export { registeredUser, loginUser, logoutUser };
