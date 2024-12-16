const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

// Create a new prescription
router.post('/', async (req, res) => {
    try {
        const newPrescription = new Prescription(req.body);
        const savedPrescription = await newPrescription.save();
        res.status(201).json(savedPrescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get prescriptions for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patientId: req.params.userId });
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
