const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all service records with JOIN
router.get('/', (req, res) => {
  const sql = `
    SELECT sr.id, sr.date, c.license_plate, c.model, s.service_name, s.amount
    FROM service_record sr
    JOIN cars c ON sr.car_id = c.id
    JOIN services s ON sr.service_id = s.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add service record
router.post('/', (req, res) => {
  const { car_id, service_id, date } = req.body;
  const sql = 'INSERT INTO service_record (car_id, service_id, date) VALUES (?, ?, ?)';
  db.query(sql, [car_id, service_id, date], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Record added' });
  });
});

// Update service record
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { car_id, service_id, date } = req.body;
  const sql = 'UPDATE service_record SET car_id = ?, service_id = ?, date = ? WHERE id = ?';
  db.query(sql, [car_id, service_id, date, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Record updated' });
  });
});

// Delete service record
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM service_record WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Record deleted' });
  });
});

module.exports = router;
