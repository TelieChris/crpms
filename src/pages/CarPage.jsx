import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;


const CarPage = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    license_plate: '',
    car_type: '',
    model: '',
    year_of_manufacture: '',
    driver_phone: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchCars = async () => {
    const res = await axios.get('http://localhost:5000/api/cars');
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/cars/${editId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/cars', form);
    }
    setForm({ license_plate: '', car_type: '', model: '', year_of_manufacture: '', driver_phone: '' });
    setEditId(null);
    fetchCars();
  };

  const handleEdit = car => {
    setForm(car);
    setEditId(car.id);
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      fetchCars();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Car Management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6 max-w-4xl">
        <input type="text" name="license_plate" placeholder="License Plate" value={form.license_plate} onChange={handleChange} className="p-2 border rounded" required />
        <input type="text" name="car_type" placeholder="Car Type" value={form.car_type} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="model" placeholder="Model" value={form.model} onChange={handleChange} className="p-2 border rounded" />
        <input type="number" name="year_of_manufacture" placeholder="Year" value={form.year_of_manufacture} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="driver_phone" placeholder="Driver Phone" value={form.driver_phone} onChange={handleChange} className="p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          {editId ? 'Update Car' : 'Add Car'}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Registered Cars</h3>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">License Plate</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Driver Phone</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td className="border px-4 py-2">{car.license_plate}</td>
              <td className="border px-4 py-2">{car.car_type}</td>
              <td className="border px-4 py-2">{car.model}</td>
              <td className="border px-4 py-2">{car.year_of_manufacture}</td>
              <td className="border px-4 py-2">{car.driver_phone}</td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button onClick={() => handleEdit(car)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(car.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarPage;
