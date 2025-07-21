import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { searchDigikala } from '../services/search';
import CardItem from '../components/card/cardItem';
import Loading from '../components/loading/loading';

const ProductsPage = () => {
  const { categoryUrl, query } = useParams();
  const searchTerm = query || categoryUrl;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async (pageToFetch) => {
    if (!searchTerm) return;
    setLoading(true);
    setError(null);

    try {
      const data = await searchDigikala(decodeURIComponent(searchTerm), pageToFetch);
      setResults(prev => pageToFetch === 1 ? data.products : [...prev, ...data.products]);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData(page);
  }, [fetchData, page]);

  useEffect(() => {
    setResults([]);
    setPage(1);
    setTotalPages(1);
  }, [searchTerm]);

  useEffect(() => {
    const onScroll = () => {
      if (loading || page >= totalPages) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 400;

      if (scrollPosition >= threshold) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading, page, totalPages]);

  return (
    <div className="max-w-screen-xl my-2 flex mx-auto flex-col px-5">
      <h1 className="text-xl py-6 text-gray-600">
        فروشگاه دیجیکالا / {decodeURIComponent(searchTerm).replace(/-/g, " ")}
      </h1>

      {results.length === 0 && !loading && (
        <p className="text-xl"> نتیجه‌ای یافت نشد.</p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 w-full ">
        {results.map((item,index) => (
          <div key={index} className="w-full h-full">
            <CardItem
              img={item.images.main}
              title={item.title_fa}
              alt={item.title_fa}
              id={item.id}
              price={item.price}
              status={item.status}
              score={item.default_variant?.statistics?.satisfied?.rate_count}
            />
          </div>
        ))}
      </div>

      {loading && (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
