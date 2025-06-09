import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductBySlug } from '../services/products';

const ProductsPage = () => {
  const { categoryUrl } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const response = await fetchProductBySlug(categoryUrl);
        setData(response);
      } catch (err) {
        console.error(err);
      }
    };
    getCategoryData();
  }, [categoryUrl]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">محصولات دسته {categoryUrl}</h1>
      {data ? (
        <ul>
          {data.result.products.map((item) => (
            <li key={item.id}>{item.title_fa}</li>
          ))}
        </ul>
      ) : (
        <p>در حال بارگذاری...</p>
      )}
    </div>
  );
};

export default ProductsPage;
