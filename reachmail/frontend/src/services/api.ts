import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if needed
});

export const fetchEmails = async (query?: string) => {
  const response = await api.get(`/email`, {
    params: query ? { query } : {},
  });
  return response.data;
};