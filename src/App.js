import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import CarPage from './pages/CarPage';
import ServicesPage from './pages/ServicesPage';
import ServiceRecordPage from './pages/ServiceRecordPage';
import PaymentsPage from './pages/PaymentsPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/car"
          element={<CarPage />}/>
        <Route
          path="/services"
          element={
              <ServicesPage />
          }
        />
        <Route
          path="/service-record"
          element={
              <ServiceRecordPage />
          }
        />
        <Route
          path="/payments"
          element={
              <PaymentsPage />
          }
        />
        <Route
          path="/reports"
          element={
              <ReportsPage />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
