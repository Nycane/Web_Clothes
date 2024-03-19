let cloudinary = require('cloudinary').v2;
let fs = require('fs')
require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,   
    api_secret:process.env.CLOUDINARY_API_SECRET,
    // secure:true
})
async function uploadImage(fileName,userId){
    return new Promise(async(resolve,reject)=>{
        const options={
            public_id:userId,
            folder:"avatar",
            overwrite: true,
            invalidate: true,
            accept: ["jpg", "jpeg", "png", "gif"],
            // transformation: [
            //     {
            //         // width: 100,
            //         // height: 100,
            //         gravity: "face",
            //         crop: "fill",
            //         // quality: 80,
            //         // sharpen: 2,
            //       },
            //     ]
        }
       cloudinary.uploader.upload(fileName,options,(error,result)=>{
            if (result && result.secure_url) {
                resolve({status:200,url:result.secure_url})
                return;
              }
              reject({ status:500,message:error.message})
              return;
        })
    })
}
module.exports = {uploadImage}