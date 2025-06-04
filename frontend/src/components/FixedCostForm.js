import React, { useState } from 'react';

const FixedCostForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    name: '',
    date: '',
    amount: '',
    memo: '',
    recurring: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amount: parseInt(form.amount) || 0,
    };
    onCreate(payload);
    setForm({ name: '', date: '', amount: '', memo: '', recurring: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="비용 이름" required />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="금액" required />
      <input name="memo" value={form.memo} onChange={handleChange} placeholder="메모" />
      <label>
        <input type="checkbox" name="recurring" checked={form.recurring} onChange={handleChange} />
        매달 반복
      </label>
      <button type="submit">등록</button>
    </form>
  );
};

export default FixedCostForm;
