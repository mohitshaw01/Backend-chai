import { Router } from "express";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT) // using the verifyJWT middleware to verify the access token

router.route("/toggle/v/:videoId").post(toggleVideoLike) // route to toggle like on a video
router.route("/toggle/t/:tweetId").post(toggleTweetLike) // route to toggle like on a tweet
router.route("/toggle/c/:commentId").post(toggleCommentLike) // route to toggle like on a comment
router.route("/videos").get(getLikedVideos) // route to get all liked videos  


export default router;

// meaning of toggle 
// 1. switch from one effect, feature, or state to another by using a toggle.
//