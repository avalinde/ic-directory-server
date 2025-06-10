const mongoose = require("mongoose");
const { Schema } = mongoose;

const clinicSchema = new Schema({
  clinicName: {
    type: String,
    required: true,
    trim: true,
  },

  street: String,
  city: String,
  state: String,
  zip: String,

  phone: String,

  website_url: String,

  latitude: {
    type: Number,
    required: true,
  },
  //mapping purposes
  longitude: {
    type: Number,
    required: true,
  }, //mapping purposes

  //Accepted Insurance
  aetna: {
    name: "Aetna",
    type: Boolean,
    default: false,
  },
  blueCrossBlueShield: {
    name: "Blue Cross Blue Shield",
    type: Boolean,
    default: false,
  },
  cigna: {
    name: "Cigna",
    type: Boolean,
    default: false,
  },
  commonWealthCareAlliance: {
    name: "Commonwealth Care Alliance",
    type: Boolean,
    default: false,
  },

  harvardPilgrim: {
    name: "Harvard Pilgrim Health Care",
    type: Boolean,
    default: false,
  },

  humana: {
    name: "Humana",
    type: Boolean,
    default: false,
  },
  mgb: {
    name: "Mass General Brigham Health Plan",
    type: Boolean,
    default: false,
  },
  masshealth: {
    name: "MassHealth",
    type: Boolean,
    default: false,
  },
  medicare: {
    name: "Medicare",
    type: Boolean,
    default: false,
  },

  tricare: {
    name: "Tricare",
    type: Boolean,
    default: false,
  },

  tufts: {
    name: "Tufts Health Plan",
    type: Boolean,
    default: false,
  },
  United: {
    name: "United",
    type: Boolean,
    default: false,
  },

  wellsense: {
    name: "Wellsense",
    type: Boolean,
    default: false,
  },

  // servicesOffered:
  primaryCare: {
    name: "Primary Care",
    type: Boolean,
    default: true,
  },

  behavioralHealth: {
    name: "Mental Health Counseling",
    type: Boolean,
    default: false,
  },

  surgicalTeam: {
    name: "Surgical Team",
    type: Boolean,
    default: false,
  },
});

const Clinic = mongoose.model("Clinic", clinicSchema);
module.exports = Clinic;
