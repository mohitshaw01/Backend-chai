import { Router } from "express";
import { loginUser, logoutUser, registeredUser } from "../controllers/User.controller.js";
import upload from '../middlewares/multer.middleware.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// before going to register we are uploading the images and then we are registering user
// we are using upload.fields middleware to upload multiple images
// name is the name of the field in the form and maxCount is the maximum number of files that can be uploaded
console.log('User routes not initialized');
router.route("/register")
.post(upload.fields([
    {
        name: 'avatar', maxCount: 1
    },
    {
        name: 'coverimage', maxCount: 1
    }
]),registeredUser)
console.log('User routes initialized')

router.route('/login').post(loginUser);
// middlewares routes
router.route('/logout').get(verifyJWT, logoutUser);


export default router;