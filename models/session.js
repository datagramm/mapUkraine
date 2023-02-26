const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const sessionSchema = new Schema({

  userName: {
   type:String,
   required: true,
  },

  sessionActivationLink : {
   type: String,
   required: true,
  },
  isActivated:{
   type: Boolean,
   required: true,
  },

   refreshToken: {
     id: {
      type:String,
      required: true,
     },
    timeExp: {
      type: Number,
     required: true,
    }
   }

 })

const Session = mongoose.model('Session', sessionSchema);
 module.exports = Session;