import React from 'react';

const IngredientTable = ({ data, onDelete }) => {
  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>날짜</th>
          <th>품목명</th>
          <th>수량</th>
          <th>단가</th>
          <th>금액</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.date}</td>
            <td>{row.itemName}</td>
            <td>{row.quantity}</td>
            <td>{row.unitPrice.toLocaleString()}</td>
            <td>{row.totalPrice.toLocaleString()}</td>
            <td>
              <button onClick={() => onDelete(row.id)}>삭제</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IngredientTable;
