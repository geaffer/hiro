import React, { useEffect, useState } from 'react';
import { fetchRevenues, createRevenue, deleteRevenue } from '../service/revenueService';
import RevenueForm from '../components/RevenueForm';
import RevenueTable from '../components/RevenueTable';

const RevenuePage = () => {
  const [revenues, setRevenues] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const loadData = async () => {
    const data = await fetchRevenues();
    setRevenues(data);
  };

  const handleCreate = async (newItem) => {
    await createRevenue(newItem);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteRevenue(id);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = selectedDate
    ? revenues.filter(r => r.date === selectedDate)
    : revenues;

  return (
    <div>
      <h2>매출 관리</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="date">날짜 선택: </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {selectedDate && (
          <button onClick={() => setSelectedDate('')} style={{ marginLeft: '0.5rem' }}>
            초기화
          </button>
        )}
      </div>

      <RevenueForm onCreate={handleCreate} />
      <RevenueTable data={filtered} onDelete={handleDelete} />
    </div>
  );
};

export default RevenuePage;
