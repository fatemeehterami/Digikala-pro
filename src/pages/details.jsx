import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../services/details";
import Image from "../components/details/Image";
import "../components/details/detail.css";
import UrlPage from "../components/url/urlPage";

export default function DetailPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProductDetails(id);
        if (response?.result?.product) {
          setData(response.result.product);
          console.log(response.result.product);
        } else {
          throw new Error("Invalid API response structure.");
        }
      } catch (err) {
        setError("Failed to load product details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  if (error) return <div className="text-center text-red-600 p-6">{error}</div>;

  return (
    <div className="max-w-screen-xl my-2 flex flex-col mx-auto w-full">
      <UrlPage titleFa={data.breadcrumb} categoryTitle={data.category_title} />
      <div className="grid grid-cols-3 w-full">
        <div>
        {data.price.badge && 
          <div className="flex gap-3 items-center justify-between text-h5 px-5 py-3 rounded-lg bg-red-100">
            <div className="flex items-center justify-center text-red-600">
              <div>فروش ویژه</div>
            </div>
            <div className="flex items-center justify-end grow"></div>
          </div>}
          <Image images={data.images} />
        </div>
      </div>
    </div>
  );
}
