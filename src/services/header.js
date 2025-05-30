import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'accept': 'application/json',
    'one-api-token': '830023:66fd1e0e1b97f'
  },
});
export const fetchMenuItem = async () => {
  try {
    const response = await api.get("categories/");
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};