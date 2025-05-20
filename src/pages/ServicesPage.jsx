import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ service_name: '', amount: '' });
  const [editId, setEditId] = useState(null);

  const fetchServices = async () => {
    const res = await axios.get('http://localhost:5000/api/services');
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/services/${editId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/services', form);
    }
    setForm({ service_name: '', amount: '' });
    setEditId(null);
    fetchServices();
  };

  const handleEdit = service => {
    setForm(service);
    setEditId(service.id);
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      fetchServices();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Service Management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-2xl mb-6">
        <input
          type="text"
          name="service_name"
          placeholder="Service Name"
          value={form.service_name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded col-span-2">
          {editId ? 'Update Service' : 'Add Service'}
        </button>
      </form>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Service Name</th>
            <th className="border px-4 py-2">Amount (RWF)</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td className="border px-4 py-2">{service.service_name}</td>
              <td className="border px-4 py-2">{service.amount}</td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button onClick={() => handleEdit(service)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(service.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesPage;
