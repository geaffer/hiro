import React from 'react';

const FixedCostTable = ({ data, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>날짜</th>
          <th>금액</th>
          <th>메모</th>
          <th>반복</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>{item.amount.toLocaleString()}원</td>
            <td>{item.memo || '-'}</td>
            <td>{item.recurring ? '✅' : ''}</td>
            <td><button onClick={() => onDelete(item.id)}>삭제</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FixedCostTable;
