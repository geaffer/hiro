import React, { useState } from 'react';
import './LaborCostTable.css';

const LaborCostTable = ({ groupedData, onDelete }) => {
  const [openName, setOpenName] = useState(null);

  const toggleOpen = (name) => {
    setOpenName(prev => (prev === name ? null : name));
  };

  return (
    <div>
      {Object.entries(groupedData).map(([name, entries]) => (
        <div key={name} className="labor-group">
          <button className="accordion-btn" onClick={() => toggleOpen(name)}>
            {name} ▾
          </button>

          {openName === name && (
            <div className="accordion-content">
              <table>
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>타입</th>
                    <th>지급액</th>
                    <th>메모</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.type}</td>
                      <td>
                        {item.type === '알바'
                          ? `${(item.hours * item.hourlyWage).toLocaleString()}원`
                          : `${item.monthlySalary?.toLocaleString() || 0}원`}
                      </td>
                      <td>{item.memo || '-'}</td>
                      <td>
                        <button className="delete-btn" onClick={() => onDelete(item.id)}>삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LaborCostTable;
