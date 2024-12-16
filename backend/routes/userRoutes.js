const express = require('express');
const router = express.Router();
const db = require('../database');

// Get user profile
router.get('/profile/:userId', (req, res) => {
    const userId = req.params.userId;
    db.get('SELECT * FROM Patients WHERE id = ?', [userId], (err, row) => {
        if (err) return res.status(500).send(err.message);
        if (!row) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(row);
    });
});

// Update user profile
router.put('/profile/:userId', (req, res) => {
    const { name, email, phone, address, dateOfBirth } = req.body;
    const userId = req.params.userId;
    db.run(
        `UPDATE Patients SET name = ?, email = ?, phone = ?, address = ?, date_of_birth = ? WHERE id = ?`,
        [name, email, phone, address, dateOfBirth, userId],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).json({ message: 'User profile updated successfully' });
        }
    );
});

module.exports = router;
