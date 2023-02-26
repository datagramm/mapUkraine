const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markerSchema = new Schema({
    coord: {
        type: String,
        required: true,
    },
    timer: {
        type: String,
        required: true,
    },
    timeInMoment: {
        type: String,
        required: true
    },
    status1: {
        type: String,
        required: true
    },
    status2: {
        type: String,
        required: true
    },
    status3: {
      type: String,
      required: true,
    },
    uprate: {
        type: Number,
        required: true
    },
    downrate: {
        type: Number,
        required: true
    },
    comments: [
        {
            userName: {
                type: String,
                required: true,
            },
            textOfComment: {
                type: String,
                required: true,
            },

        }
    ],
    likedBy: [{
        type: String,
        required: true,
    }],


    timeOfMarkerInPanel: {
        type: String,
        required: true,
    }

});

const Marker = mongoose.model('Marker', markerSchema);
module.exports = Marker;