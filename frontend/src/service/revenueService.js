import axios from 'axios';

const BASE_URL = '/api/revenues';

export const fetchRevenues = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createRevenue = async (revenue) => {
  const res = await axios.post(BASE_URL, revenue);
  return res.data;
};

export const deleteRevenue = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
