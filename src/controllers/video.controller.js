import {asyncHandler} from "../utils/asyncHandler.js";
import {Video} from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import {v2 as cloudinary} from 'cloudinary';

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
    try {
        const {videoId} = req.params;
        if(!videoId){
            console.log("videoId not found");
        }
        const video = await Video.findById(videoId);
        if(!video){
            console.log("video not found");
        }
        return res.status(200).json(
            new ApiResponse(200,video,"Video found successfully")
        );
    } catch (error) {
        throw new ApiError(500,"Internal Server Error " + error.message || " ");
    }

})
// It will use moongose aggregate paginate
const getAllVideos = asyncHandler(async (req,res) => {
    // incomplete
    res.status(200).json(
        new ApiResponse(200,"working getAllVideos")
    );
})

const deleteVideo = asyncHandler(async (req,res) => {
    // steps to delete videos
    // 1. get videoId from the request params
    // 2. find the video by id
    // 3. delete the video from cloudinary
    // 4. delete the video from the database (video previously has been unlinked from the database)
    // 5. send the response
    const {videoId} = req.params;
    if(!videoId){
        throw new ApiError(400,"Please provide videoId in the parameter of the url");
    }
    const video = await Video.findById(videoId);
    if(!video){
        throw new ApiError(404,"Video not found");
    }
    // delete the video from cloudinary

    const response = cloudinary.uploader.destroy(videoId, { resource_type: "video" }, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Video deleted successfully");
        }
      });
    console.log(response.then((result) => console.log(result)));
    if(response.result === "not found"){
        throw new ApiError(404,"Video not found on cloudinary");
    }
    return res.status(200).json(new ApiResponse(200,{},"Video deleted successfully"));
});

export {publishAVideo,getVideoById,getAllVideos,deleteVideo}