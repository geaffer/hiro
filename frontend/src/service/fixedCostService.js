import axios from 'axios';

const API = '/api/fixed-costs';

export const fetchFixedCosts = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createFixedCost = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const deleteFixedCost = async (id) => {
  await axios.delete(`${API}/${id}`);
};
