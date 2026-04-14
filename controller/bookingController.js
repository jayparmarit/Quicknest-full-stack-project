import Service from "../model/Services.js";

import HttpsError from "../middleware/HttpError.js";
import Booking from "../model/Booking.js"

const createBooking = async (req, res, next,) => {
    try {
        
        const { serviceID, bookingDate, timeSlot, notes } = req.body;

        const userID = req.user._id;

        const service = await Service.findById(serviceID);

        if(!service){
            return next(new HttpsError("service not found",404))
        }

        if(!service.isActive){
            return next(new HttpsError("service is currently not active please try again after some time",400))
        }

        const startOfDay = new Date(bookingDate);
        startOfDay.setHours(0,0,0,0);

        const endOfDay = new Date(bookingDate);
        endOfDay.setHours(23, 59, 59, 999);

        const existingBooking = await Booking.findOne({
            serviceID,
            bookingDate:{$gte: startOfDay, $lt: endOfDay},
            status: {$in : ["pending", "confirmed"]},
        })
        console.log("service", existingBooking)

        if(existingBooking){
            return next(new HttpsError("service already book for this time slot",409))
        }

        const newBooking = new Booking ({
            userID,
            serviceID,
            bookingDate: new Date(bookingDate),
            timeSlot,
            notes,
            totalPrice: service.price
        })

        await newBooking.save();

        await newBooking.populate([{
            path:"serviceId",
            select:"name price duration"
        },
        {
            path:"userId",
            select:"name email phone",
        }
    ]);

     res.status(201).json({
        success:true,
        message:"service booked succesfully",
        newBooking,
     })

    } catch (error) {
        next (new HttpsError(error.message, 500))
    }
}

export default { createBooking };