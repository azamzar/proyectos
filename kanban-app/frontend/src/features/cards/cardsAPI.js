import api from '../../services/api';

export const fetchCardsAPI = () => api.get('/cards');

export const createCardAPI = (cardData) =>
  api.post('/cards', cardData);

export const reorderCardAPI = (data) =>
  api.post('/cards/reorder', data);

export const updateCardAPI = async (id, data) => {
  const res = await api.put(`/cards/${id}`, data);
  return res.data;
};