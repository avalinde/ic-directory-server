const mongoose = require("mongoose");
const { Schema } = mongoose;

// const serviceSchema = newSchema({
//     primaryCare: {
//         type: Boolean,
//     },

//     behavioralHealth:{
//         type: Boolean,
//     },

//     surgicalTeam:{
//         type: Boolean
//     }

// })

// const insuranceSchema = new Schema({
//     providerName: {
//         type: String,
//         required: true,
//     },

//     isActive: {
//         type: Boolean,
//         required: true,
//     }
// })

const clinicSchema = new Schema({
    clinicName: {
    type: String,
    required: true,
    trim: true,
  },
    address:{
        street: String,
        city: String,
        state: String,
        zip: String
        
    },
    phone: String,

    latitude: Number, //mapping purposes
    longitude: Number, //mapping purposes

   // acceptedInsurance: [insuranceSchema],

    // servicesOffered: [serviceSchema]
    
},)


const Clinic = mongoose.model("Clinic", clinicSchema);
module.exports = Clinic;