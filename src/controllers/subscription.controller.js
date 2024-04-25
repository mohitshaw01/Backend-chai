//
import { isValidObjectId } from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const toggleSubscription = asyncHandler(async (req, res) => {

    const {channelId} = req.params;
    //
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel id");
    }
    //
    const channel = await User.findById;
    if (!channel) {
        throw new ApiError(404, "Channel not found");
    }
    // finding user using refresh token
    const user = await User.findById({
        refreshToken: req.user.refreshToken,
    });
    // if user is not found, return error
    if (!user) {
        throw new ApiError(401, "Unauthorized");
    }
    //
    const usersubscribe = await Subscription.findOne({
        subscriber: req.user._id,
        channel: channelId,
    });
    // if user has subscribed to channel, unsubscribe the user
    if(usersubscribe){
        const unsubscribe = await Subscription.findByIdAndDelete({
            subscriber: user._id,
            channel: channel._id,
        });
        // 
        if(!unsubscribe){
            throw new ApiError(500, "Failed to unsubscribe");
        }
        // return success message
       return res.status(200).json(
        new ApiResponse(200,unsubscribe, "Unsubscribed successfully")
       )
    }
    else{
        // if user has not subscribed to channel, subscribe the user
        const subscribe = await Subscription.create({
            subscriber: user._id,
            channel: channel._id,
        });
        // 
        if(!subscribe){
            throw new ApiError(500, "Failed to subscribe");
        }
        // return success message
       return res.status(200).json(
        new ApiResponse(200,subscribe, "Subscribed successfully")
       )
    }  
});



export {toggleSubscription}