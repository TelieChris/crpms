import React from 'react';

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome to SmartPark System</h1>
      <p className="text-lg text-gray-700">
        This is the central dashboard to manage car repairs, payments, and reports.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Manage Cars</h2>
          <p className="text-gray-600">Register and track vehicles in the system.</p>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Repair Services</h2>
          <p className="text-gray-600">Add or update available car repair services.</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Generate Reports</h2>
          <p className="text-gray-600">View daily service and payment reports.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
