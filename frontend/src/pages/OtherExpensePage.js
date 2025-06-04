// src/pages/OtherExpensePage.js
import React, { useEffect, useState } from 'react';
import {
  fetchOtherExpenses,
  createOtherExpense,
  deleteOtherExpense
} from '../service/otherExpenseService';
import OtherExpenseForm from '../components/OtherExpenseForm';
import './OtherExpensePage.css';

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

const OtherExpensePage = () => {
  const [data, setData] = useState([]);
  const [openMonths, setOpenMonths] = useState({});

  const loadData = async () => {
    const result = await fetchOtherExpenses();
    setData(result);
  };

  const handleCreate = async (item) => {
    await createOtherExpense(item);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteOtherExpense(id);
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
    <div className="other-expense-container">
      <h2>기타 비용 관리</h2>
      <OtherExpenseForm onCreate={handleCreate} />

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
                  <th>메모</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.item}</td>
                    <td>{item.amount.toLocaleString()}원</td>
                    <td>{item.memo || '-'}</td>
                    <td>
                      <button className="delete-button" onClick={() => handleDelete(item.id)}>삭제</button>
                    </td>
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

export default OtherExpensePage;
