const dotenv = require('dotenv')
const cloudinary = require('cloudinary')

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const uploads = (file) =>{
    return new Promise((resolve) =>{
        cloudinary.uploader.upload(
            file,
            (result) =>{
                resolve({url:result.url, id:result.public_id})
            },
            {folder:"AirBnbClone"},
            {resource_type:'auto'}
        )
    },(reject)=>{
        console.log(reject);
    })
}
// const uploads = async(file) =>{
//     console.log(file)
//     const result = await cloudinary.uploader.upload(file)
//     // console.log(result);
// }
module.exports = uploads