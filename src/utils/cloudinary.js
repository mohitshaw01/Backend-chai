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
// const uploadOnCloudinary = async (file) => {
//   try {
//     if(!file) throw new Error("No file received");
//     // uploading to cloudinary
//     const result = await cloudinary.uploader.upload(file, {resource_type: "auto"});
//     console.log(result.url);
//     fs.unlinkSync(file)
//     return result;
//   } catch (error) {
//     fs.unlinkSync(file);
//     console.log("err or uploading file on cloudinary", error);
//     throw new Error(error);
//   }
// }
// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//       if (!localFilePath) return null
//       //upload the file on cloudinary
//       const response = await cloudinary.uploader.upload(localFilePath, {
//           resource_type: "auto"
//       })
//       // file has been uploaded successfull
//       //console.log("file is uploaded on cloudinary ", response.url);
//       fs.unlinkSync(localFilePath)
//       return response;

//   } catch (error) {
//       fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//       return null;
//   }
// }

const uploadOnCloudinary = async (localFilePath) => {
  const path  = localFilePath.path;
  console.log(path);
  console.log(localFilePath + ' in uploadOnCloudinary')
  try {
    if (!localFilePath || typeof localFilePath !== 'string') {
      console.error('Invalid localFilePath:', localFilePath);
      return null;
    }

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // File has been uploaded successfully
    //console.log("File is uploaded on Cloudinary ", response.url);
    
    // Delete the local file
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error('Error uploading or deleting local file:', error);

    // Remove the locally saved temporary file as the upload operation failed
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.error('Error deleting local file:', unlinkError);
    }

    return null;
  }
}



export default uploadOnCloudinary;