import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const PaymentsPage = () => {
  const [records, setRecords] = useState([]);
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ service_record_id: '', amount_paid: '', payment_date: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res1 = await axios.get('http://localhost:5000/api/payments');
    const res2 = await axios.get('http://localhost:5000/api/payments/records');
    setPayments(res1.data);
    setRecords(res2.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/payments/${editId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/payments', form);
    }
    setForm({ service_record_id: '', amount_paid: '', payment_date: '' });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (payment) => {
    const matched = records.find(r =>
      r.license_plate === payment.license_plate &&
      r.service_name === payment.service_name &&
      r.date?.split('T')[0] === payment.service_date?.split('T')[0]
    );
    setForm({
      service_record_id: matched?.id || '',
      amount_paid: payment.amount_paid,
      payment_date: payment.payment_date?.split('T')[0]
    });
    setEditId(payment.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      await axios.delete(`http://localhost:5000/api/payments/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payments Management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 max-w-4xl mb-6">
        <select name="service_record_id" value={form.service_record_id} onChange={handleChange} required className="p-2 border rounded">
          <option value="">Select Service Record</option>
          {records.map(record => (
            <option key={record.id} value={record.id}>
              {record.license_plate} - {record.service_name} ({record.date.split('T')[0]})
            </option>
          ))}
        </select>

        <input
          type="number"
          name="amount_paid"
          placeholder="Amount Paid"
          value={form.amount_paid}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <input
          type="date"
          name="payment_date"
          value={form.payment_date}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded col-span-3">
          {editId ? 'Update Payment' : 'Add Payment'}
        </button>
      </form>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Car</th>
            <th className="border px-4 py-2">Service</th>
            <th className="border px-4 py-2">Amount Paid</th>
            <th className="border px-4 py-2">Payment Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td className="border px-4 py-2">{payment.license_plate}</td>
              <td className="border px-4 py-2">{payment.service_name}</td>
              <td className="border px-4 py-2">{payment.amount_paid} RWF</td>
              <td className="border px-4 py-2">{payment.payment_date?.split('T')[0]}</td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button onClick={() => handleEdit(payment)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(payment.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsPage;
