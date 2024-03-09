import asyncHandler from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'
import ApiError from '../utils/ApiError.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'
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

const registeredUser = asyncHandler(async (req, res) => {
  // steps to register a user
  // 1. get the user data from the request body
  // 2. validate the user data
  // 3. check if the user already exists
  // 4. check for images  and upload them to cloudinary
  // 5. create a new user and check if the user is created
  //6. remove password from the user object before sending it to the client
  
  const {fullname,email,username,password} = req.body;
  console.log(fullname);
  // if the data is not present in the request body, we will throw an error
  if (!fullname || !email || !username || !password) {
    throw new ApiError(400, 'All fields are required');
  }
  // check email formatting
  const emailRegex = /\S+@\S+\.\S+/;
  if(emailRegex.test(email) === false){
    throw new ApiError(400, 'Invalid email');
  }
  // check username formatting
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if(usernameRegex.test(username) === false){
    throw new ApiError(400, 'Invalid username');
  }
  // finding user by username or email
  const user = await User.findOne({ $or: [{ email }, { username }] });
  // if user already exists, we will throw an error
  if(user){
    throw new ApiError(400, 'User already exists');
  } 
  // checking for files using ternary
  console.log(req.files);
  const avatarLocalPath = req.files ? req.files.avatar : null;
  const coverimageLocalPath = req.files ? req.files.coverimage : null;
  if(!avatarLocalPath || !coverimageLocalPath){
    throw new ApiError(400, 'Avatar and cover image are required');
  }
  // uploading images to cloudinary
  const avatar_upload = await uploadOnCloudinary(avatarLocalPath);
  const coverimage_upload = await uploadOnCloudinary(coverimageLocalPath);
  //
  const newUser = await new User({
    fullname,
    email,
    username,
    password,
    avatar: avatar_upload.url,
    coverimage: coverimage_upload.url
  });
  // finding user by id and not seelectiong password and refreshToken
   const usercreated = await User.finbyId(newUser._id).select('-password','-refreshToken');
   if(!usercreated){
      throw new ApiError(500, 'User not created');
    }
  // giving a response to the client
  const response = new ApiResponse(201, 'User created', usercreated); 
  res.status(response.statusCode).json(response);
});

export { registeredUser};