import React, { useState } from 'react';

const OtherExpenseForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    item: '',
    date: '',
    amount: '',
    memo: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amount: parseInt(form.amount),
    };
    onCreate(payload);
    setForm({ item: '', date: '', amount: '', memo: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="item" value={form.item} onChange={handleChange} placeholder="항목명" required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="금액" required />
      <input name="memo" value={form.memo} onChange={handleChange} placeholder="메모" />
      <button type="submit">등록</button>
    </form>
  );
};

export default OtherExpenseForm;
