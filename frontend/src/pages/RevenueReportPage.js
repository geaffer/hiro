import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import axios from 'axios';
import { fetchRevenues } from '../service/revenueService';
import './RevenueReportPage.css';

const RevenueReportPage = () => {
  const [revenues, setRevenues] = useState([]);
  const [summary, setSummary] = useState({ total: 0, average: 0, max: 0, min: 0 });
  const [weekdayStats, setWeekdayStats] = useState([]);
  const [monthlyAverage, setMonthlyAverage] = useState([]);
  const monthlyTarget = 10000000;

  useEffect(() => {
    const loadData = async () => {
      try {
        const revenueData = await fetchRevenues();

        const parsed = revenueData
          .filter(r => r.date && r.revenue != null)
          .map(r => ({
            ...r,
            revenue: Number(r.revenue) || 0,
            weekday: new Date(r.date).getDay(),
            month: r.date.slice(0, 7),
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setRevenues(parsed);

        const total = parsed.reduce((sum, r) => sum + r.revenue, 0);
        const average = parsed.length ? (total / parsed.length).toFixed(0) : 0;
        const max = parsed.length ? Math.max(...parsed.map(r => r.revenue)) : 0;
        const min = parsed.length ? Math.min(...parsed.map(r => r.revenue)) : 0;
        setSummary({ total, average, max, min });

        const weekdayMap = {};
        parsed.forEach(r => {
          const k = r.weekday;
          weekdayMap[k] = weekdayMap[k] || [];
          weekdayMap[k].push(r.revenue);
        });
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        const weekdayData = Object.entries(weekdayMap).map(([k, values]) => ({
          day: weekdays[k],
          average: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
        }));
        setWeekdayStats(weekdayData);

        const monthlyMap = {};
        parsed.forEach(r => {
          monthlyMap[r.month] = monthlyMap[r.month] || [];
          monthlyMap[r.month].push(r.revenue);
        });

        const allMonths = Object.keys(monthlyMap).sort();
        if (allMonths.length === 0) {
          const now = new Date();
          const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
          allMonths.push(ym);
        }

        const costPromises = allMonths.map(async (month) => {
          const [y, m] = month.split('-');
          try {
            const [labor, ingredient, fixed, other] = await Promise.all([
              axios.get(`/api/labor-costs/month?year=${y}&month=${m}`),
              axios.get(`/api/ingredients/month?year=${y}&month=${m}`),
              axios.get(`/api/fixed-costs/month?year=${y}&month=${m}`),
              axios.get(`/api/other-expenses/month?year=${y}&month=${m}`),
            ]);

            // ✅ 콘솔 디버깅 출력
            console.log(`🟢 [${month}] 인건비 응답`, labor.data);
            console.log(`🟢 [${month}] 식자재비 응답`, ingredient.data);
            console.log(`🟢 [${month}] 고정비 응답`, fixed.data);

            const laborCost = labor.data.reduce((sum, r) => {
              const monthlySalary = Number(r.monthlySalary) || 0;
              const hourlyWage = Number(r.hourlyWage) || 0;
              const hours = Number(r.hours) || 0;
              return sum + (monthlySalary || (hourlyWage * hours));
            }, 0);

            const ingredientCost = ingredient.data.reduce((sum, r) => {
              return sum + (Number(r.totalPrice) || 0);
            }, 0);

            const fixedCost = fixed.data.reduce((sum, r) => {
              return sum + (Number(r.amount) || 0);
            }, 0);

            const otherCost = other.data.reduce((sum, r) => {
              return sum + (Number(r.amount) || 0);
            }, 0);

            return { month, laborCost, ingredientCost, fixedCost, otherCost };
          } catch (error) {
            console.error(`❌ [${month}] 비용 API 로딩 실패`, error);
            return { month, laborCost: 0, ingredientCost: 0, fixedCost: 0, otherCost: 0 };
          }
        });

        const costResults = await Promise.all(costPromises);

        const monthAvg = allMonths.map(month => {
          const values = monthlyMap[month] || [];
          const total = values.reduce((a, b) => a + b, 0);
          const avg = values.length ? Math.round(total / values.length) : 0;

          const cost = costResults.find(c => c.month === month) || {};
          const labor = cost.laborCost || 0;
          const ingredient = cost.ingredientCost || 0;
          const fixed = cost.fixedCost || 0;
          const other = cost.otherCost || 0;
          const expense = labor + ingredient + fixed + other;

          return {
            month,
            average: avg,
            total,
            labor,
            ingredient,
            fixed,
            other,
            net: total - expense,
          };
        });

        setMonthlyAverage(monthAvg);
      } catch (error) {
        console.error('데이터 로딩 중 오류:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="report-container">
      <h2>📈 월별 매출 및 비용 리포트</h2>

      <div className="summary">
        <p><strong>총합:</strong> {summary.total.toLocaleString()}원</p>
        <p><strong>평균:</strong> {Number(summary.average).toLocaleString()}원</p>
        <p><strong>최고 매출:</strong> {summary.max.toLocaleString()}원</p>
        <p><strong>최저 매출:</strong> {summary.min.toLocaleString()}원</p>
      </div>

      <h3>📊 매출 & 순이익</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyAverage}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(v) => `${v.toLocaleString()}원`} />
          <Legend />
          <Line type="monotone" dataKey="average" stroke="#4caf50" name="매출 평균" />
          <Line type="monotone" dataKey="net" stroke="#9c27b0" name="순이익" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: '40px' }}>💸 비용 항목별 추이</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={monthlyAverage}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(v) => `${v.toLocaleString()}원`} />
          <Legend />
          <Line type="monotone" dataKey="labor" stroke="#f44336" name="인건비" />
          <Line type="monotone" dataKey="ingredient" stroke="#2196f3" name="식자재비" />
          <Line type="monotone" dataKey="fixed" stroke="#ff9800" name="고정비" />
          <Line type="monotone" dataKey="other" stroke="#795548" name="기타비용" />
        </LineChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: '40px' }}>📅 요일별 평균 매출</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={weekdayStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(v) => `${v.toLocaleString()}원`} />
          <Bar dataKey="average" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: '40px' }}>🎯 이번 달 매출 목표</h3>
      <div className="target-box">
        <p><strong>목표:</strong> {monthlyTarget.toLocaleString()}원</p>
        <p><strong>이번 달 매출:</strong> {
          (() => {
            const currentMonth = new Date().toISOString().slice(0, 7);
            const current = monthlyAverage.find(m => m.month === currentMonth);
            return current ? current.total.toLocaleString() + '원' : '0원';
          })()
        }</p>
        <p><strong>달성률:</strong> {
          (() => {
            const currentMonth = new Date().toISOString().slice(0, 7);
            const current = monthlyAverage.find(m => m.month === currentMonth);
            const percent = current ? Math.round((current.total / monthlyTarget) * 100) : 0;
            return `${percent}%`;
          })()
        }</p>
      </div>
    </div>
  );
};

export default RevenueReportPage;
