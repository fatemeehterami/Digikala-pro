import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../services/details";
import Image from "../components/details/Image";

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
    <div>
      <div className="grid grid-cols-3">
        <Image images={data.images} />
      </div>
    </div>
  );
}
