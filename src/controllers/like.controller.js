import mongoose from "mongoose";
import Like from "../models/like.model.js";
import Video from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js";

const getLikedVideos = asyncHandler(async(req,res) => {})

const toggleVideoLike = asyncHandler(async(req,res) => {}) 

const toggleTweetLike = asyncHandler(async(req,res) => {})  

const toggleCommentLike = asyncHandler(async(req,res) => {})

export { getLikedVideos, toggleVideoLike, toggleTweetLike, toggleCommentLike }