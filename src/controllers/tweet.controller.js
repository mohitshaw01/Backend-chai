import {asyncHandler} from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.model.js";

const createTweet = asyncHandler(async (req, res, next) => {
  // steps to createtweet
  // 1. get content from req.body
  // 2. get user from req.user
  // 3. create tweet
  // 4. save tweet
  // 5. return tweet
  try {
    const { content } = req.body;
    if (!content) {
      throw new ApiError(400, "Content is required");
    }
    const user = User.findById(req.user?._id);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    const tweet = new Tweet({ content, owner: user._id });
    await tweet.save();
    return res
      .status(201)
      .json(new ApiResponse(201, tweet, "Tweet created successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, "Internal server error while creating tweet"));
  }
});

const getUserTweets = asyncHandler(async (req, res, next) => {
    try {
        // Get user ID from request parameters
        const { userId } = req.params;
        if (!userId) {
            return next(new ApiError(404, "User not found"));
        }

        // Fetch tweets of the user
        const tweets = (await Tweet.find({ owner: userId })) // Convert Mongoose documents to plain JavaScript objects

        // Return the tweets in the response
        return res
            .status(200)
            .json(new ApiResponse(200, tweets, "User tweets fetched successfully"));
    } catch (error) {
        // Handle any errors
        console.error(error);
        return next(new ApiError(500, "Internal server error"));
    }
});


const updateTweet = asyncHandler(async (req, res, next) => {
    // steps to upadate tweet
    // 1. get tweetid from req.params
    // 2. get content from req.body
    // 3. get user from req.user
    // 4. find tweet by id
    // 5. check if user is owner of tweet
    // 6. update tweet
    // 7. save tweet    
    // 8. return tweet
    try {
        const { tweetId } = req.params;
        const { content } = req.body;
        const user = User.findById(req.user?._id);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }   
        const tweet = Tweet.findById(tweetId);
        if (!tweet) {
            return next(new ApiError(404, "Tweet not found"));
        }
        if (tweet.owner !== user._id) {
            return next(new ApiError(401, "You are not authorized to update this tweet"));
        }
        tweet.content = content;
        await tweet.save();
        return res
            .status(200)
            .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
    } catch (error) {
        throw new ApiError(500, "Internal server error while updating tweet");
    }
});

const deleteTweet = asyncHandler(async (req, res, next) => {
    // steps to delete tweet
    // 1. get tweetid from req.params
    // 2. get user from req.user
    // 3. find tweet by id
    // 4. check if user is owner of tweet
    // 5. delete tweet
    // 6. return success message
    try {
        const { tweetId } = req.params;
        const user = User.findById(req.user?._id);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }   
        const tweet = Tweet.findById(tweetId);
        if (!tweet) {
            return next(new ApiError(404, "Tweet not found"));
        }
        if (tweet.owner !== user._id) {
            return next(new ApiError(401, "You are not authorized to delete this tweet"));
        }
        await tweet.delete();
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Tweet deleted successfully"));
    } catch (error) {
        throw new ApiError(500, "Internal server error while deleting tweet");
    }
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
