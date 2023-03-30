const placeModel = require('../models/places')

const jwt = require('jsonwebtoken')
const uploads = require('../utils/uploads')

exports.addNewPlaces = async(req,res) =>{
    const {userToken} = req.cookies
    if(!userToken){
        return res.status(400).json({message:"Invalid Request"})
    }
    const userData = await jwt.verify(userToken,process.env.SECRET_KEY);
    const {title,address,images,price,perks,checkIn,checkOut,maxGuests,description} = req.body
    const data = {
        owner:userData._id,
        title,address,images,price,perks,checkIn,checkOut,maxGuests,description
    }
    const place = await placeModel.create(data);

    res.status(201).json({place});
}
exports.getUserPlaces = async(req,res) =>{
    try {
        const {userToken} = req.cookies
        if(!userToken){
            return res.status(400).json({message:"Invalid Request"})
        }
        const userData = await jwt.verify(userToken,process.env.SECRET_KEY);
        const {_id} = userData;
        const places = await placeModel.find({owner:_id});
        if(!places)
            res.json({message:"No places Found"})
        return res.status(200).json({places})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getAllPlaces = async(req,res) =>{
    try {
        const places = await placeModel.find();

        if(!places)
            return res.status(404).json({message:"No restaurant found"})
        
        return res.status(200).json({places});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getPlaceById = async(req,res) =>{
    try {
        const {id} = req.params
        if(!id)
            return res.status(400).json({message:"Bad Request"})

        const place = await placeModel.findById(id);

        return res.status(200).json({place});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.updatePlace = async(req,res) =>{
    try {
        const {userToken} = req.cookies
        const {id} = req.params
        const {title,address,images,price,perks,checkIn,checkOut,maxGuests,description} = req.body
        if(!userToken){
            return res.status(400).json({message:"Invalid Request"})
        }
        const {_id} = await jwt.verify(userToken,process.env.SECRET_KEY);
        const place = await placeModel.findById(id)
        if(!place)
            return res.status(400).json({message:"Invalid request"})
        if(_id === place.owner.toString()){
            place.set({
                title,address,images,price,perks,checkIn,checkOut,maxGuests,description
            })
            await place.save()
            return res.status(200).json({place})
        }
            return res.status(400).json({message:"Unable to update Place"})
        } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.uploadImage = async(req,res) =>{
    try {
        const uploadedImages = []
        console.log(req.files)
        for(let i = 0;i<req.files.length;i++){
            const img = await uploads(req.files[i].buffer)
            uploadedImages.push(img.url)
        }
        return res.json({images:uploadedImages})
    } catch(error) {
        return res.status(500).json({message:error.message})
    }
}