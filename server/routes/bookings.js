const express = require('express');
const router = express.Router();

const Booking  = require('../models/Booking');

// get a list of bookings from db
router.get('/bookings', function(req, res, next){
    Booking.find({}).then(function(bookings){
        res.send(bookings);
    });
});


//add new booking to db
router.post('/bookings', function(req, res, next){
    Booking.create(req.body).then(function(booking){
        res.send(booking);
    }).catch(next);
});

// update a booking in db
router.put('/bookings/:id', function(req, res, next){
    Booking.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Booking.findOne({_id: req.params.id}).then(function(booking){
            res.send(booking);
        });
    });
});

// delete a booking from db
router.delete('/bookings/:id', function(req, res, next){
    Booking.findByIdAndRemove({_id: req.params.id}).then(function(booking){
        res.send(booking);
    });
});

module.exports = router;