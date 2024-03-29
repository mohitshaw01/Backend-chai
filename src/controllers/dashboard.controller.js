import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"

const getChannelStats = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        refreshToken : req.cookies.refreshToken
    });
    if(!user){
        throw new ApiError(401,"Unauthorized")
    }
    // total video views
    const totalVideoViews = await Video.aggregate([
        {
            $match : {
                owner : user._id
            }
        },
        {
            $group : {
                _id : null,
                totalViews : {
                    $sum : "$views"
                }
            }
        }
    ]);

    // total subscribers
    const totalSubscribers = await Subscription.countDocuments({
        channel : user._id
    });
    // total likes
    const totalLikes = await Like.countDocuments({
        LikedBy : user._id
    });
    // total videos
    const totalVideos = await Video.countDocuments({
        owner : user._id
    });

    //returning response
    return(
        res
        .status(200)
        .json(new ApiResponse(200,{
            totalVideoViews: totalVideoViews[0]?.totalViews || 0,
            totalLikes,
            totalSubscribers,
            totalVideos
        }))
    )

})

const getChannelVideos = asyncHandler(async (req, res) => {
    //get channel videos steps
    //1. get the user id from the token
    //2. get the channel videos
    //3. return the channel videos
    //4. handle errors
    //5. return the response
    const user = await User.findone({
        refreshToken : req.cookies.refreshToken
    })
    if(!user){
        throw new ApiError(401,"Unauthorized")
    }
    // fetch the channel videos
    const videos = await Video.find({
        owner : user._id
    })
    if(!videos){
        throw new ApiError(404,"No videos found")
    }
    return new ApiResponse(200,"video fetched succesfully",videos)
});


export {getChannelStats,getChannelVideos}