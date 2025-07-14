import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    accept: "application/json",
    "one-api-token": "830023:6839ebf3bbf07",
  },
});
export const searchDigikala = async (query, page = 1) => {
    try {
      const response = await api.get("search/", {
        params: {
          q: query,
          page: page,
        },
      });
      const data = response.data;
  
      return {
        products: data?.result?.products || [],
        totalPages: data?.result?.pager?.total_pages || 1,
        totalItems: data?.result?.pager?.total_items || 0,
      };
    } catch (error) {
      console.error("error:", error);
      throw error;
    }
  };
