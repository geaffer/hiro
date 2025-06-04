import React from 'react';

const getWeekday = (dateStr) => {
  const day = new Date(dateStr).getDay();
  return ['일', '월', '화', '수', '목', '금', '토'][day];
};

const RevenueTable = ({ data, onDelete }) => {
  // 날짜 기준 정렬
  const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const total = sorted.reduce((sum, r) => sum + (r.revenue || 0), 0);
  const average = sorted.length ? (total / sorted.length).toFixed(0) : 0;
  const max = sorted.length ? Math.max(...sorted.map(r => r.revenue || 0)) : 0;
  const min = sorted.length ? Math.min(...sorted.map(r => r.revenue || 0)) : 0;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>요일</th>
            <th>매출</th>
            <th>메모</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{getWeekday(r.date)}</td>
              <td>{(r.revenue ?? 0).toLocaleString()}원</td>
              <td>{r.memo || '-'}</td>
              <td>
                <button onClick={() => onDelete(r.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '16px' }}>
        <p>총합: {total.toLocaleString()}원</p>
        <p>평균: {Number(average).toLocaleString()}원</p>
        <p>최고 매출: {max.toLocaleString()}원</p>
        <p>최저 매출: {min.toLocaleString()}원</p>
      </div>
    </div>
  );
};

export default RevenueTable;
