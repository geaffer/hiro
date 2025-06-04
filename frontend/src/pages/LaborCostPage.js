import React, { useEffect, useState } from 'react';
import { fetchLaborCosts, createLaborCost, deleteLaborCost } from '../service/laborCostService';
import LaborCostForm from '../components/LaborCostForm';
import LaborCostTable from '../components/LaborCostTable';
import './LaborCostPage.css';

const LaborCostPage = () => {
  const [groupedData, setGroupedData] = useState({});

  const loadData = async () => {
    const result = await fetchLaborCosts();

    const sorted = [...result].sort((a, b) => {
      const nameCompare = a.name.localeCompare(b.name);
      if (nameCompare !== 0) return nameCompare;
      return new Date(a.date) - new Date(b.date);
    });

    const grouped = sorted.reduce((acc, curr) => {
      if (!acc[curr.name]) acc[curr.name] = [];
      acc[curr.name].push(curr);
      return acc;
    }, {});

    setGroupedData(grouped);
  };

  const handleCreate = async (item) => {
    await createLaborCost(item);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteLaborCost(id);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="labor-container">
      <h2>인건비 관리</h2>
      <LaborCostForm onCreate={handleCreate} />
      <LaborCostTable groupedData={groupedData} onDelete={handleDelete} />
    </div>
  );
};

export default LaborCostPage;
