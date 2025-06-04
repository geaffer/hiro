// src/pages/FixedCostPage.js
import React, { useEffect, useState } from 'react';
import { fetchFixedCosts, createFixedCost, deleteFixedCost } from '../service/fixedCostService';
import FixedCostForm from '../components/FixedCostForm';
import './FixedCostPage.css';

const groupByMonth = (data) => {
  const groups = {};
  data.forEach(item => {
    const month = item.date.slice(0, 7); // YYYY-MM
    if (!groups[month]) groups[month] = [];
    groups[month].push(item);
  });

  return Object.entries(groups)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([month, items]) => ({ month, items }));
};

const FixedCostPage = () => {
  const [data, setData] = useState([]);
  const [openMonths, setOpenMonths] = useState({});

  const loadData = async () => {
    const result = await fetchFixedCosts();
    setData(result);
  };

  const handleCreate = async (item) => {
    await createFixedCost(item);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteFixedCost(id);
    loadData();
  };

  const toggleMonth = (month) => {
    setOpenMonths(prev => ({ ...prev, [month]: !prev[month] }));
  };

  useEffect(() => {
    loadData();
  }, []);

  const grouped = groupByMonth(data);

  return (
    <div className="fixed-cost-container">
      <h2>고정비 관리</h2>
      <FixedCostForm onCreate={handleCreate} />

      {grouped.map(({ month, items }) => (
        <div key={month} className="month-section">
          <div className="month-header" onClick={() => toggleMonth(month)}>
            <h3>{month}</h3>
            <span>{openMonths[month] ? '▲' : '▼'}</span>
          </div>
          {openMonths[month] && (
            <table>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>항목</th>
                  <th>금액</th>
                  <th>반복</th>
                  <th>메모</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.amount.toLocaleString()}원</td>
                    <td>{item.recurring ? '매달' : '-'}</td>
                    <td>{item.memo || '-'}</td>
                    <td><button onClick={() => handleDelete(item.id)}>삭제</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default FixedCostPage;
