import React, { useState } from 'react';

const IngredientForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    date: '',
    itemName: '',
    quantity: '',
    unitPrice: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = parseInt(form.unitPrice) * parseFloat(form.quantity);

    onCreate({
      ...form,
      quantity: parseFloat(form.quantity),
      unitPrice: parseInt(form.unitPrice),
      totalPrice,
    });

    setForm({
      date: '',
      itemName: '',
      quantity: '',
      unitPrice: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px', marginBottom: '10px' }}>
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <input type="text" name="itemName" value={form.itemName} onChange={handleChange} placeholder="품목명" required />
      <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="수량" required />
      <input type="number" name="unitPrice" value={form.unitPrice} onChange={handleChange} placeholder="단가" required />
      <button type="submit">등록</button>
    </form>
  );
};

export default IngredientForm;
