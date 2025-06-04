import React from 'react';

const OtherExpenseTable = ({ items = [], onDelete }) => {
  if (!items || items.length === 0) {
    return <p style={{ padding: '1rem' }}>해당 월의 데이터가 없습니다.</p>;
  }

  return (
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
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.date}</td>
            <td>{item.item}</td>
            <td>{item.amount.toLocaleString()}원</td>
            <td>{item.memo || '-'}</td>
            <td>
              <button className="delete-button" onClick={() => onDelete(item.id)}>삭제</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OtherExpenseTable;
