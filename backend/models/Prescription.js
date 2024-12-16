const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all prescriptions for a specific appointment
router.get('/appointment/:appointmentId', (req, res) => {
    const appointmentId = req.params.appointmentId;
    db.all('SELECT * FROM Prescriptions WHERE appointment_id = ?', [appointmentId], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(rows);
    });
});

// Add a new prescription
router.post('/add', (req, res) => {
    const { appointmentId, medication, dosage, notes } = req.body;
    db.run(
        `INSERT INTO Prescriptions (appointment_id, medication, dosage, notes) VALUES (?, ?, ?, ?)`,
        [appointmentId, medication, dosage, notes],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).json({ message: 'Prescription added successfully', prescriptionId: this.lastID });
        }
    );
});

module.exports = router;
