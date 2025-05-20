const express = require('express');
const router = express.Router();
const db = require('../db');

// Summary report
router.get('/summary', (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM cars) AS total_cars,
      (SELECT COUNT(*) FROM service_record) AS total_services,
      (SELECT SUM(amount_paid) FROM payments) AS total_revenue
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

// Detailed report
router.get('/details', (req, res) => {
  const sql = `
    SELECT 
      c.license_plate, s.service_name, sr.date as service_date, 
      p.amount_paid, p.payment_date
    FROM service_record sr
    LEFT JOIN cars c ON sr.car_id = c.id
    LEFT JOIN services s ON sr.service_id = s.id
    LEFT JOIN payments p ON p.service_record_id = sr.id
    ORDER BY sr.date DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
