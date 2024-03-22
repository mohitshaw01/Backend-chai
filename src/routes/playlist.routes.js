import { Router } from "express";

import {
    addVideoToPlaylist, createPlaylist, deletePlaylist, getPlayListById, removeVideoFromPlaylist, updatePlaylist , 
} from '../controllers/playlist.controller'
import {verifyJWT} from '../middlewares/auth.middleware.js'


const router = Router();

router.use(verifyJWT)

router.route("/").post(createPlaylist)

router.route("/:playlistId")
.get(getPlayListById)
.patch(updatePlaylist)
.patch(updatePlaylist)
.delete(deletePlaylist);

router.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist)
router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist)

router.route("/user/:userId").get(getPlayListById)

export default router;