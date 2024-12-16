const express = require('express');
const router = express.Router();
const db = require('../database'); // Import your database connection

// Get all appointments for a specific patient
router.get('/patient/:patientId', (req, res) => {
    const patientId = req.params.patientId;
    db.all('SELECT * FROM Appointments WHERE patient_id = ?', [patientId], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(rows);
    });
});

// Schedule a new appointment
router.post('/schedule', (req, res) => {
    const { patientId, doctorId, appointmentDate } = req.body;
    db.run(
        `INSERT INTO Appointments (patient_id, doctor_id, appointment_date) VALUES (?, ?, ?)`,
        [patientId, doctorId, appointmentDate],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).json({ message: 'Appointment scheduled successfully', appointmentId: this.lastID });
        }
    );
});

// Update an appointment's status
router.put('/:appointmentId/status', (req, res) => {
    const appointmentId = req.params.appointmentId;
    const { status } = req.body;
    db.run(
        `UPDATE Appointments SET status = ? WHERE id = ?`,
        [status, appointmentId],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).json({ message: 'Appointment status updated successfully' });
        }
    );
});

module.exports = router;
