import axios from "axios";

// API config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'accept': 'application/json',
    'one-api-token': '830023:6839ebf3bbf07'
  },
});

// 👉 دسته‌بندی‌ها و mapping بین slug و ID
const categoryMap = {
  cordlessscrewdriver: 1,
  face: 2,
  laptop: 3,
  // 🟡 اینجا بقیه slugها و idها رو دستی یا داینامیک پر کن
};

/**
 * گرفتن ID با استفاده از slug (url آخر)
 */
const resolveCategoryId = async (slug) => {
  // می‌تونی بعداً این رو از یک API بگیری یا ذخیره‌سازی کنی در localStorage
  return categoryMap[slug] || null;
};

/**
 * گرفتن محصولات یک دسته
 * @param {string} slug - مثلا 'cordlessscrewdriver'
 * @param {number} page - شماره صفحه
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
    console.error("❌ API fetch error", error);
    throw error;
  }
};
