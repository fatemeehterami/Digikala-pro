import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductBySlug } from '../services/products';
import Dropdown from '../components/dropdown/dropDown';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'gatsby', label: 'Gatsby' },
  { value: 'remix', label: 'Remix' }
];
const ProductsPage = () => {
  const { categoryUrl } = useParams();
  const [data, setData] = useState(null);
  const [multipleSelected, setMultipleSelected] = useState([]);

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
    <div className="max-w-screen-xl my-2 flex mx-auto flex-col">
      <p className='text-xs text-gray-700'>فروشگاه دیجی کالا / کالای دیجیتال</p>
      <p className='text-black py-5 text-lg'>کیف و کاور گوشی </p>
      <div className='flex justify-between items-center'>
        <div className='w-1/4 border border-gray-300 p-3 rounded-lg'>
        <div>
          <Dropdown
          options={options}
          placeholder="برند"
          onSelect={setMultipleSelected}
          multiple={true}
        />
           <Dropdown
          options={options}
          placeholder="رنگ"
          onSelect={setMultipleSelected}
          multiple={true}
        />
        </div>
        </div>
        <div className='w-3/4'></div>
    </div>
</div>















  );
};

export default ProductsPage;
