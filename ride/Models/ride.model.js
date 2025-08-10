const mongoose = require('mongoose');

const rideSchema=new mongoose.Schema({

    captain:{
        type: mongoose.Schema.Types.ObjectId,// Reference to the captain model
        ref: 'captain',
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,// Reference to the user model
        ref: 'user',
        required: true
    },
    pickup:{
        type:String,
        required: true
    },
    destination:{
        type:String,
        required: true
    },
    status:{
        type:String,
        enum:['requested','accepted', 'in-progress', 'completed', 'cancelled'],
        default: 'requested'
    },

},{timestamp:true});

const Ride = mongoose.model('Ride', rideSchema);
module.exports = { Ride, createRide };