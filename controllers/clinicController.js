const { request } = require("express");

const Clinic = require("../models/clinicModel");

const getAllClinics = async (request, response, next) => {
  try {
    const clinics = await Clinic.find({});

    response.status(200).json({
      success: { message: "This route sends all of the clinics data " },
      data: { clinics },
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};

const getClinic = async (request, response, next) => {
  const { _id } = request.params;

  try {
    if (!_id) {
      throw new Error("ID is required");
    }

    const clinic = await Clinic.findById(_id);

    if (!clinic) {
      throw new Error("No clinic found by given ID");
    }

    response.status(200).json({
      success: { message: "This route sends a single clinic by its ID " },
      data: { clinic },
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};

const createClinic = async (request, response, next) => {
  const {
    clinicName,
    street,
    city,
    state,
    zip,
    phone,
    website_url,
    latitude,
    longitude,
    aetna,
    blueCrossBlueShield,
    cigna,
    commonWealthCareAlliance,
    harvardPilgrim,
    humana,
    mgb,
    masshealth,
    medicare,
    United,
    wellsense,
    primaryCare,
    behavioralHealth,
    surgicalTeam,
  } = request.body;

  try {
     if (!clinicName || !latitude || !longitude) {
      throw new Error("Missing required fields, please review.");
     }

    const newClinic = {
      clinicName,
      street,
      city,
      state,
      zip,
      phone,
      website_url,
      latitude,
      longitude,
      aetna,
      blueCrossBlueShield,
      cigna,
      commonWealthCareAlliance,
      harvardPilgrim,
      humana,
      mgb,
      masshealth,
      medicare,
      United,
      wellsense,
      primaryCare,
      behavioralHealth,
      surgicalTeam,
    };

    const result = await Clinic.insertOne(newClinic);
    console.log("Document inserted with _id:", result.insertedId);

    response.status(201).json({
      success: { message: "This route created a new clinic " },
      data: newClinic,
      statusCode: 201,
    });
  } catch (error) {
    throw next(error);
  }
};

const updateClinic = async (request, response, next) => {
  const { _id } = request.params;
  const {
    clinicName,
    street,
    city,
    state,
    zip,
    phone,
    website_url,
    latitude,
    longitude,
    aetna,
    blueCrossBlueShield,
    cigna,
    commonWealthCareAlliance,
    harvardPilgrim,
    humana,
    mgb,
    masshealth,
    medicare,
    United,
    wellsense,
    primaryCare,
    behavioralHealth,
    surgicalTeam,
  } = request.body;

  try {
    if (!clinicName || !latitude || !longitude) {
      throw new Error("Missing required fields, please review.");
    }

    const updatedClinic = await Clinic.findByIdAndUpdate(
      _id,
      {
        $set: {
          clinicName,
          street,
          city,
          state,
          zip,
          phone,
          website_url,
          latitude,
          longitude,
          aetna,
          blueCrossBlueShield,
          cigna,
          commonWealthCareAlliance,
          harvardPilgrim,
          humana,
          mgb,
          masshealth,
          medicare,
          United,
          wellsense,
          primaryCare,
          behavioralHealth,
          surgicalTeam,
        },
      },
      { new: true }
    );
    if (!updatedClinic) {
      throw new Error("Clinic not found");
    }

    response.status(201).json({
      success: { message: "This route updated a clinic by its id" },
      data: { updatedClinic },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteClinic = async (request, response, next) => {
  const { _id } = request.params;

  try {
    if (!_id) {
      throw new Error("ID is required");
    }

    await Clinic.findByIdAndDelete(_id);

    response.status(200).json({
      success: { message: "This route deleted a clinic by its id" },
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllClinics,
  getClinic,
  createClinic,
  updateClinic,
  deleteClinic,
};
