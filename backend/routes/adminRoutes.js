const express = require('express');
const router = express.Router();
const db = require('../database');

// Add a new doctor
router.post('/doctor', (req, res) => {
    const { name, specialization, email, phone, availability } = req.body;
    db.run(
        `INSERT INTO Doctors (name, specialization, email, phone, availability) VALUES (?, ?, ?, ?, ?)`,
        [name, specialization, email, phone, availability],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).json({ message: 'Doctor added successfully', doctorId: this.lastID });
        }
    );
});

// Get all doctors
router.get('/doctors', (req, res) => {
    db.all('SELECT * FROM Doctors', [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(rows);
    });
});

// Delete a doctor
router.delete('/doctor/:doctorId', (req, res) => {
    const doctorId = req.params.doctorId;
    db.run(`DELETE FROM Doctors WHERE id = ?`, [doctorId], function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json({ message: 'Doctor deleted successfully' });
    });
});

module.exports = router;
