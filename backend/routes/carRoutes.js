const express = require('express');
const router = express.Router();
const db = require('../db');

// Create new car
router.post('/', (req, res) => {
  const { license_plate, car_type, model, year_of_manufacture, driver_phone } = req.body;
  const sql = 'INSERT INTO cars (license_plate, car_type, model, year_of_manufacture, driver_phone) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [license_plate, car_type, model, year_of_manufacture, driver_phone], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Car added successfully' });
  });
});

// Get all cars
router.get('/', (req, res) => {
  db.query('SELECT * FROM cars', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Update car by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { license_plate, car_type, model, year_of_manufacture, driver_phone } = req.body;
    const sql = `
      UPDATE cars 
      SET license_plate = ?, car_type = ?, model = ?, year_of_manufacture = ?, driver_phone = ? 
      WHERE id = ?
    `;
    db.query(sql, [license_plate, car_type, model, year_of_manufacture, driver_phone, id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Car updated successfully' });
    });
  });
// Delete car by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM cars WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Car deleted successfully' });
    });
  });
    

module.exports = router;
