import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    accept: "application/json",
    "one-api-token": "830023:6839ebf3bbf07",
  },
});
export const fetchProductDetails = async (id) => {
  try {
    const response = await api.get(`product/?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
export const fetchSpecifications = async (id) => {
  try {
    const response = await api.get(`product/specifications/?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};