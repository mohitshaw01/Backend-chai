import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

// uploading file on cloudinary
const uploadOnCloudinary = async (file) => {
  try {
    if(!file) throw new Error("No file received");
    // uploading to cloudinary
    const result = await cloudinary.uploader.upload(file, {upload_preset: "dev_setups",resource_type: "auto"});
    console.log(result.url);
    return result;
  } catch (error) {
    fs.unlinkSync(file);
    console.log("err or uploading file on cloudinary", error);
    throw new Error(error);
  }
}

export default uploadOnCloudinary;