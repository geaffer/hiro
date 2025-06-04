// src/service/laborCostService.js
import axios from 'axios';

const API = '/api/labor-costs';

export const fetchLaborCosts = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createLaborCost = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const deleteLaborCost = async (id) => {
  await axios.delete(`${API}/${id}`);
};
