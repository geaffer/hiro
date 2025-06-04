// src/service/otherExpenseService.js
import axios from 'axios';

const API = '/api/other-expenses';

export const fetchOtherExpenses = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createOtherExpense = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const deleteOtherExpense = async (id) => {
  await axios.delete(`${API}/${id}`);
};
