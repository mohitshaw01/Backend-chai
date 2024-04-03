import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

// console.log("Cloud Name:", process.env.CLOUD_NAME);
// console.log("API Key:", process.env.API_KEY);
// console.log("API Secret:", process.env.API_SECRET);

          
cloudinary.config({ 
  cloud_name: 'dipgxx7e1', 
  api_key: '659778549624785', 
  api_secret: '8tKjIhtXp8HyeolOhjBSAxw6QrQ' 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    console.log(localFilePath)
    const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"});
    // fs.unlinkSync(localFilePath);
    console.log("File uploaded successfully to Cloudinary:", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
