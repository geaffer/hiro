import axios from 'axios';

const BASE_URL = '/api/ingredients';

export const fetchIngredients = async () => {
  // storeId는 더 이상 사용하지 않지만, 백엔드는 /{storeId}를 요구함
  const dummyStoreId = 1;
  const res = await axios.get(`${BASE_URL}/${dummyStoreId}`);
  return res.data;
};

export const createIngredient = async (ingredient) => {
  const res = await axios.post(BASE_URL, ingredient);
  return res.data;
};

export const deleteIngredient = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
