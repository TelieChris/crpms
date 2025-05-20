const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all services
router.get('/', (req, res) => {
  db.query('SELECT * FROM services', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST a new service
router.post('/', (req, res) => {
  const { service_name, amount } = req.body;
  db.query('INSERT INTO services (service_name, amount) VALUES (?, ?)', [service_name, amount], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Service added successfully' });
  });
});

// UPDATE a service
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { service_name, amount } = req.body;
  db.query('UPDATE services SET service_name = ?, amount = ? WHERE id = ?', [service_name, amount, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Service updated successfully' });
  });
});

// DELETE a service
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM services WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Service deleted successfully' });
  });
});

module.exports = router;
