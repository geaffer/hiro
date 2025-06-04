import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import './WeeklyReportPage.css';

const WeeklyReportPage = () => {
  const [selectedDate, setSelectedDate] = useState('2025-03-28');
  const [data, setData] = useState({
    revenue: [],
    labor: [],
    ingredient: [],
    fixed: [],
  });

  const fetchData = async () => {
    const [revenues, laborCosts, ingredients, fixedCosts] = await Promise.all([
      axios.get(`/api/revenues/by-date?date=${selectedDate}`),
      axios.get(`/api/labor-costs/by-date?date=${selectedDate}`),
      axios.get(`/api/ingredients/by-date?date=${selectedDate}`),
      axios.get(`/api/fixed-costs/by-date?date=${selectedDate}`)
    ]);

    setData({
      revenue: revenues.data,
      labor: laborCosts.data,
      ingredient: ingredients.data,
      fixed: fixedCosts.data,
    });
  };

  const getTotal = (items, field) => items.reduce((sum, item) => sum + (item[field] || 0), 0);

  const getLaborCost = (items) =>
    items.reduce((sum, item) => {
      if (item.type === '시급제' && item.hourlyWage && item.hours) {
        return sum + item.hourlyWage * item.hours;
      } else if (item.type === '월급제' && item.monthlySalary) {
        return sum + Math.round(item.monthlySalary / 4.345);
      }
      return sum;
    }, 0);

  const summary = {
    totalRevenue: getTotal(data.revenue, 'revenue'),
    totalLabor: getLaborCost(data.labor),
    totalIngredient: getTotal(data.ingredient, 'totalPrice'),
    totalFixed: getTotal(data.fixed, 'amount'),
  };
  summary.profit = summary.totalRevenue - summary.totalLabor - summary.totalIngredient - summary.totalFixed;

  const chartData = [
    {
      name: `${selectedDate} (주차)`,
      매출: summary.totalRevenue,
      인건비: summary.totalLabor,
      식자재비: summary.totalIngredient,
      고정비: summary.totalFixed,
      순이익: summary.profit,
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="weekly-container">
      <h2>📅 주간 리포트</h2>
      <div className="input-box">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={fetchData}>조회</button>
      </div>

      <div className="summary-box">
        <p><strong>매출:</strong> {summary.totalRevenue.toLocaleString()}원</p>
        <p><strong>인건비:</strong> {summary.totalLabor.toLocaleString()}원</p>
        <p><strong>식자재비:</strong> {summary.totalIngredient.toLocaleString()}원</p>
        <p><strong>고정비:</strong> {summary.totalFixed.toLocaleString()}원</p>
        <p><strong>순이익:</strong> {summary.profit.toLocaleString()}원</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(v) => `${v.toLocaleString()}원`} />
          <Legend />
          <Line type="monotone" dataKey="매출" stroke="#4caf50" />
          <Line type="monotone" dataKey="인건비" stroke="#f44336" />
          <Line type="monotone" dataKey="식자재비" stroke="#2196f3" />
          <Line type="monotone" dataKey="고정비" stroke="#ff9800" />
          <Line type="monotone" dataKey="순이익" stroke="#9c27b0" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyReportPage;
