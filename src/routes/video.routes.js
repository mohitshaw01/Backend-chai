import { Router } from "express";
// verifyJWT is a middleware that checks if the user is authenticated or not
import { verifyJWT } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  // togglePublishStatus,
  // updateVideo,
} from "../controllers/video.controller.js";

const router = Router();
// verifyJWT is a middleware that checks if the user is authenticated or not and upload.fields is a middleware that uploads files

router.route("/publish-video").post(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  publishAVideo,
);

router.route("/get-all-videos").get(getAllVideos);
router.route("/:videoId").get(verifyJWT,getVideoById);
// router.route("/toggle-publish-status/:videoId").put(verifyJWT,togglePublishStatus);
// router.route("/update-video/:videoId").put(verifyJWT,updateVideo);
router.route("/delete-video/:videoId").delete(verifyJWT,deleteVideo);


export default router;

