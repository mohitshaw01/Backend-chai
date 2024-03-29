import {Router} from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {upload} from '../middlewares/multer.middleware.js';
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controller.js"

const router = Router();
// verifyJWT is a middleware that checks if the user is authenticated or not
router.use(verifyJWT);

router.route('/').get(getAllVideos);
