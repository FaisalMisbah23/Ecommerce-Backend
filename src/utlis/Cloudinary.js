import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dmniws8v3',
    api_key: process.env.CLOUDINARY_API_KEY || '122482676583427',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'Rzp1wqK5kG8hJfTKe92DNfROcTU',
  });
    
const uploadOnCloudinary = async (localPath) => {
    try {
        if(!localPath) return null            
        const response = await cloudinary.uploader.upload(localPath,{resource_type:"auto"})
        console.log("The file uploaded on Cloudinary Successfully",response.url )
        fs.unlinkSync(localPath)
        return response
    } catch (error) {
        console.log("Error while uploading to Cloudinary",error)
        fs.unlinkSync(localPath)
        return null;
    }
}

const deleteOnCloundinary = async (public_id,resource_type) => {
    if(!public_id) return null
    try {
         await cloudinary.uploader.destroy(public_id,{resource_type})
    } catch (error) {
        console.log("Error while deleting from Cloudinary",error)
        return null;
    }
}

export {uploadOnCloudinary,deleteOnCloundinary}