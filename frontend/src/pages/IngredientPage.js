import React, { useEffect, useState } from 'react';
import { fetchIngredients, createIngredient, deleteIngredient } from '../service/ingredientService';
import IngredientForm from '../components/IngredientForm';
import IngredientTable from '../components/IngredientTable';
import './IngredientPage.css';

const IngredientPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [filteredDate, setFilteredDate] = useState('');

  const loadData = async () => {
    const data = await fetchIngredients();
    setIngredients(data);
  };

  const handleCreate = async (newItem) => {
    await createIngredient(newItem);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteIngredient(id);
    loadData();
  };

  const handleDateFilter = (e) => {
    setFilteredDate(e.target.value);
  };

  const filteredData = filteredDate
    ? ingredients.filter((item) => item.date === filteredDate)
    : ingredients;

  const totalSum = filteredData.reduce((sum, item) => sum + item.totalPrice, 0);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h2>식자재 관리</h2>

      <div className="filter-section">
        <label htmlFor="dateFilter">날짜 필터:</label>
        <input
          type="date"
          id="dateFilter"
          value={filteredDate}
          onChange={handleDateFilter}
        />
      </div>

      <IngredientForm onCreate={handleCreate} />
      <IngredientTable data={filteredData} onDelete={handleDelete} />

      <div className="total-sum">
        <h4>총합 금액: {totalSum.toLocaleString()} 원</h4>
      </div>
    </div>
  );
};

export default IngredientPage;
