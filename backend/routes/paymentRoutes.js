const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all payment records with service details
router.get('/', (req, res) => {
  const sql = `
    SELECT p.id, p.amount_paid, p.payment_date,
           c.license_plate, s.service_name, sr.date as service_date
    FROM payments p
    JOIN service_record sr ON p.service_record_id = sr.id
    JOIN cars c ON sr.car_id = c.id
    JOIN services s ON sr.service_id = s.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get all service records (for payment dropdown)
router.get('/records', (req, res) => {
  const sql = `
    SELECT sr.id, c.license_plate, s.service_name, sr.date
    FROM service_record sr
    JOIN cars c ON sr.car_id = c.id
    JOIN services s ON sr.service_id = s.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Create a payment
router.post('/', (req, res) => {
  const { service_record_id, amount_paid, payment_date } = req.body;
  const sql = 'INSERT INTO payments (service_record_id, amount_paid, payment_date) VALUES (?, ?, ?)';
  db.query(sql, [service_record_id, amount_paid, payment_date], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Payment recorded' });
  });
});

// Update payment
router.put('/:id', (req, res) => {
  const { service_record_id, amount_paid, payment_date } = req.body;
  const sql = 'UPDATE payments SET service_record_id = ?, amount_paid = ?, payment_date = ? WHERE id = ?';
  db.query(sql, [service_record_id, amount_paid, payment_date, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Payment updated' });
  });
});

// Delete payment
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM payments WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Payment deleted' });
  });
});

module.exports = router;
