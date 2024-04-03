import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Comment} from "../models/comment.model.js";
import { Video } from "../models/video.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.models.js';

// see this again for moongoose aggreagatio pipeline and how to use it
const getVideoComments = asyncHandler(async (req, res, next) => {
  // steps
  // get video id from request
  // find video by id
  // get comments from video
  // send response
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const video = await Video.findById(videoId);
  if (!video) {
    return next(new ApiError(404, "Video not found"));
  }
  const comments = await Comment.aggregate([
    {
      $match: {
        video: mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    {
      $unwind: "$ownerDetails",
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "comment",
        as: "likeDetails",
      },
    },
    {
      $project: {
        content: 1,
        createdAt: 1,
        owner_avatar: "$ownerDetails.avatar",
        owner_username: "$ownerDetails.username",
        numberOfLikes: {
          $size: "$likeDetails",
        },
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(200, comments || [], "Comments fetched successfully"),
    );
});

const addComment = asyncHandler(async (req, res, next) => {
  // steps
  // get video id from request
  // find video by id
  // create comment
  // send response
  const { videoId } = req.params;
  const { content } = req.body;
  const video = await Video.findById(videoId);
  if (!video) {
    return next(new ApiError(404, "Video not found"));
  }
  const comment = await Comment.create({
    content,
    owner: req.user._id,
    video: videoId,
  });
  if (!comment) {
    return next(new ApiError(400, "Failed to add comment"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res, next) => {
  //steps
  // get comment id from request
  // find comment by id
  // check if user is owner of comment
  // update comment
  // send response
  const { commentId } = req.params;
  const { content } = req.body;
  const comment = await Comment.findOneAndUpdate(
    {
      _id: commentId,
      owner: user._id,
    },
    {
      $set: {
        content: content,
      },
    },
    { new: true },
  );

  if (!comment) {
    return next(new ApiError(400, "Failed to update comment"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res, next) => {
    // steps
    // get comment id from request
    // find comment by id
    // check if user is owner of comment
    // delete comment
    // send response
    const { commentId } = req.params;
    const deleteComment = await Comment.findOneAndDelete({
        _id: commentId,
        owner: req.user._id,
    });
    if (!deleteComment) {
        return next(new ApiError(400, "Failed to delete comment"));
    }
    res
        .status(200)
        .json(new ApiResponse(200, deleteComment, "Comment deleted successfully"));
    
});


export { getVideoComments, addComment,updateComment, deleteComment };
