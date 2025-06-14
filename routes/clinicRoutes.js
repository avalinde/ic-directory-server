//Clinic Router

//All routes start with /api/clinics

const express = require("express");
const router = express.Router();

const {
    getAllClinics,
    getClinic,
    createClinic,
    updateClinic,
    deleteClinic
} = require("../controllers/clinicController");

router.get("/", getAllClinics);

router.get("/:_id", getClinic);

router.post("/create/new", createClinic);

router.put("/update/:_id", updateClinic);

router.delete("/delete/:_id", deleteClinic);

module.exports = router;