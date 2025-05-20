const express = require('express');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const app = express();
const PORT = 5000;
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');

app.use(cors({
  origin: 'http://localhost:3000', // or 5173 if you're using Vite
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set to true in production with HTTPS
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

app.use('/api/auth', authRoutes);

app.use(express.json());
app.use('/api/cars', carRoutes);
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/service-records', require('./routes/serviceRecordRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

const initAdmin = require('./initAdmin');
initAdmin();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
