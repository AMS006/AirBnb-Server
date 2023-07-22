const bookingModel = require('../models/booking');

exports.addBooking = async(req,res) =>{
    try {
        const {checkIn,checkOut,name,phone,price,place} = req.body
        
        const _id = req.user._id
        const data = {checkIn,checkOut,name,phone,price,place,user:_id}

        const booking = await bookingModel.create(data)

        return res.status(200).json({booking});
    } catch (error) {
        return res.status(500).json({message:error.massage})
    }
}
exports.getUserBookings = async(req,res) =>{
    try {
        const _id = req.user._id
        const bookings = await bookingModel.find({user:_id}).populate('place')
        if(bookings.length <= 0)
           return res.status(404).json({message:"No Booking Found"})
        return res.status(200).json({bookings});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}