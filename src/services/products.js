import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'accept': 'application/json',
    'one-api-token': '830023:6839ebf3bbf07'
  },
});

const categoryMap = {
  cordlessscrewdriver: 1,
  face: 2,
  laptop: 3,
};

const resolveCategoryId = async (slug) => {
  return categoryMap[slug] || null;
};

/**
 * 
 * @param {string} slug 
 * @param {number} page 
 */
export const fetchProductBySlug = async (slug, page = 1) => {
  const id = await resolveCategoryId(slug);
  if (!id) {
    throw new Error(`Invalid category slug: ${slug}`);
  }

  try {
    const response = await api.get(`category/?id=${id}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error("API fetch error", error);
    throw error;
  }
};
