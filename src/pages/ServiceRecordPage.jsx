import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;


const ServiceRecordPage = () => {
  const [records, setRecords] = useState([]);
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ car_id: '', service_id: '', date: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [carRes, serviceRes, recordRes] = await Promise.all([
      axios.get('http://localhost:5000/api/cars'),
      axios.get('http://localhost:5000/api/services'),
      axios.get('http://localhost:5000/api/service-records')
    ]);
    setCars(carRes.data);
    setServices(serviceRes.data);
    setRecords(recordRes.data);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/service-records/${editId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/service-records', form);
    }
    setForm({ car_id: '', service_id: '', date: '' });
    setEditId(null);
    fetchData();
  };

  const handleEdit = record => {
    const matchedCar = cars.find(car => car.license_plate === record.license_plate);
    const matchedService = services.find(s => s.service_name === record.service_name);
    setForm({
      car_id: matchedCar?.id || '',
      service_id: matchedService?.id || '',
      date: record.date.split('T')[0]
    });
    setEditId(record.id);
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`http://localhost:5000/api/service-records/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Service Record Management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 max-w-4xl mb-6">
        <select name="car_id" value={form.car_id} onChange={handleChange} required className="p-2 border rounded">
          <option value="">Select Car</option>
          {cars.map(car => (
            <option key={car.id} value={car.id}>{car.license_plate} - {car.model}</option>
          ))}
        </select>

        <select name="service_id" value={form.service_id} onChange={handleChange} required className="p-2 border rounded">
          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>{service.service_name}</option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded col-span-3">
          {editId ? 'Update Record' : 'Add Record'}
        </button>
      </form>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Car</th>
            <th className="border px-4 py-2">Service</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td className="border px-4 py-2">{record.license_plate}</td>
              <td className="border px-4 py-2">{record.service_name}</td>
              <td className="border px-4 py-2">{record.amount} RWF</td>
              <td className="border px-4 py-2">{record.date?.split('T')[0]}</td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button onClick={() => handleEdit(record)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(record.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceRecordPage;
