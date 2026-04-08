import api from '../../services/api';

export const fetchColumnsAPI = async (boardId) => {
  const res = await api.get(`/boards/${boardId}/columns`);
  return res.data;
};

export const createColumnAPI = async ({ name, boardId }) => {
  const res = await api.post(`/boards/${boardId}/columns`, { name });
  return res.data;
};

export const updateColumnAPI = async (id, data) => {
  const res = await api.put(`/columns/${id}`, data);
  return res.data;
};