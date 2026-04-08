import api from '../../services/api';

export const fetchCardsAPI = async (boardId) => {
  const res = await api.get(`/boards/${boardId}/cards`);
  return res.data;
};

export const createCardAPI = (cardData) =>
  api.post('/cards', cardData);

export const reorderCardAPI = (data) =>
  api.post('/cards/reorder', data);

export const updateCardAPI = async (id, data) => {
  const res = await api.put(`/cards/${id}`, data);
  return res.data;
};