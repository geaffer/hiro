import React, { useState } from 'react';

const LaborCostForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    type: '알바',
    name: '',
    date: '',
    hours: '',
    hourlyWage: '',
    monthlySalary: '',
    memo: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      hours: parseFloat(form.hours) || null,
      hourlyWage: parseInt(form.hourlyWage) || null,
      monthlySalary: parseInt(form.monthlySalary) || null,
    };
    onCreate(payload);
    setForm({ type: '알바', name: '', date: '', hours: '', hourlyWage: '', monthlySalary: '', memo: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="type" value={form.type} onChange={handleChange}>
        <option>알바</option>
        <option>직원</option>
      </select>
      <input type="text" name="name" placeholder="이름" value={form.name} onChange={handleChange} required />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      {form.type === '알바' ? (
        <>
          <input type="number" name="hours" placeholder="시급 시간" value={form.hours} onChange={handleChange} />
          <input type="number" name="hourlyWage" placeholder="시급" value={form.hourlyWage} onChange={handleChange} />
        </>
      ) : (
        <input type="number" name="monthlySalary" placeholder="월급" value={form.monthlySalary} onChange={handleChange} />
      )}
      <input type="text" name="memo" placeholder="메모" value={form.memo} onChange={handleChange} />
      <button type="submit">등록</button>
    </form>
  );
};

export default LaborCostForm;
