import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;


const ReportsPage = () => {
  const [summary, setSummary] = useState({});
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchDetails();
  }, []);

  const fetchSummary = async () => {
    const res = await axios.get('http://localhost:5000/api/reports/summary');
    setSummary(res.data);
  };

  const fetchDetails = async () => {
    const res = await axios.get('http://localhost:5000/api/reports/details');
    setDetails(res.data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reports</h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h3 className="text-lg font-semibold">Total Cars</h3>
          <p className="text-2xl">{summary.total_cars}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h3 className="text-lg font-semibold">Total Services</h3>
          <p className="text-2xl">{summary.total_services}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl">{summary.total_revenue?.toLocaleString()} RWF</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Detailed Records</h3>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">License Plate</th>
            <th className="border px-4 py-2">Service</th>
            <th className="border px-4 py-2">Service Date</th>
            <th className="border px-4 py-2">Amount Paid</th>
            <th className="border px-4 py-2">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{item.license_plate}</td>
              <td className="border px-4 py-2">{item.service_name}</td>
              <td className="border px-4 py-2">{item.service_date?.split('T')[0]}</td>
              <td className="border px-4 py-2">{item.amount_paid || 'N/A'}</td>
              <td className="border px-4 py-2">{item.payment_date?.split('T')[0] || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPage;
