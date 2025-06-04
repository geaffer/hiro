import React, { useState } from 'react';

const RevenueForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    date: '',
    revenue: '',
    memo: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      ...form,
      revenue: parseInt(form.revenue),
    });
    setForm({ date: '', revenue: '', memo: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <input type="number" name="revenue" value={form.revenue} onChange={handleChange} placeholder="매출액" required />
      <input type="text" name="memo" value={form.memo} onChange={handleChange} placeholder="메모" />
      <button type="submit">등록</button>
    </form>
  );
};

export default RevenueForm;
