import { Router } from "express";
import { registeredUser } from "../controllers/user.controller.js";
import upload from '../middlewares/multer.middleware.js';

const router = Router();

// before going to register we are uploading the images and then we are registering user
// we are using upload.fields middleware to upload multiple images
// name is the name of the field in the form and maxCount is the maximum number of files that can be uploaded

router.route('/register')
.post(upload.fields([
    {
        name: 'avatar', maxCount: 1
    },
    {
        name: 'coverimage', maxCount: 1
    },registeredUser
]))

export default router;