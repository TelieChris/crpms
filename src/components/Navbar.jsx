import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">SmartPark System</h1>
        <ul className="flex space-x-6">
          <li><Link to="/car" className="hover:text-gray-200">Car</Link></li>
          <li><Link to="/services" className="hover:text-gray-200">Services</Link></li>
          <li><Link to="/service-record" className="hover:text-gray-200">Service Record</Link></li>
          <li><Link to="/payments" className="hover:text-gray-200">Payments</Link></li>
          <li><Link to="/reports" className="hover:text-gray-200">Reports</Link></li>
          <li>
            <button onClick={handleLogout} className="hover:text-red-300">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
