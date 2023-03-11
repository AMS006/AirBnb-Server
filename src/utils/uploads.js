const dotenv = require('dotenv')
const cloudinary = require('cloudinary')

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true
})
const uploads = (file) =>{
    return new Promise((resolve) =>{
        cloudinary.v2.uploader.upload(
            file,
            (result) =>{
                resolve({url:result.url, id:result.public_id})
            },
            {folder:"AirBnbClone"},
            {resource_type:'auto'}
        )
    })
}
// const uploads = (file) =>{
//     cloudinary.v2.uploader.upload(file).then((result) =>{
//         return result.url
//     })
// }
module.exports = uploads