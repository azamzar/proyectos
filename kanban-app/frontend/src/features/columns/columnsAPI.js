import api from '../../services/api'; // axios configurado con VITE_API_URL  

export const fetchColumnsAPI = async () => {
  const res = await api.get('/columns');
  return res.data;
};

export const createColumnAPI = async (name) => {
  const res = await api.post('/columns', { name });
  return res.data;
};

export const updateColumnAPI = async (id, data) => {
  const res = await api.put(`/columns/${id}`, data);
  return res.data;
};