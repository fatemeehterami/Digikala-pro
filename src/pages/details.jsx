import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../services/details";
import Image from "../components/details/Image";
import "../components/details/detail.css";
import UrlPage from "../components/url/urlPage";
import Loading from "../components/loading/loading";
import UrlProduct from "../components/url/urlProduct";
import ScoreRow from "../components/details/scoreRow";
import ColorsPrice from "../components/details/colorPrice";
import Features from "../components/details/features";

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

  if (loading) return <div className="text-center p-6"><Loading/></div>;

  if (error) return <div className="text-center text-red-600 p-6">{error}</div>;

  return (
    <div className="max-w-screen-xl my-2 flex flex-col mx-auto w-full">
      <UrlPage titleFa={data.breadcrumb} categoryTitle={data.category_title} />
      <div className="grid grid-cols-3 gap-3 w-full">
        <div className="col-span-1">
        {data.price?.badge && 
          <div className="flex gap-3 items-center justify-between text-h5 px-5 py-3 rounded-lg bg-red-100">
            <div className="flex items-center justify-center text-red-600">
              <div>فروش ویژه</div>
            </div>
            <div className="flex items-center justify-end grow"></div>
          </div>}
          <Image images={data.images} />
        </div>
        <div className="col-span-2 flex flex-col justify-start">
          <UrlProduct brand={data.brand?.title_fa} categoryTitle={data.category_title}/>
          <p className="text-black text-xl font-semibold my-2">{data.title_fa}</p>
          <hr className="text-gray-200" />
          <p className="text-gray-400 text-xs my-2">{data.title_en}</p>
          <ScoreRow comments={data.comments?.count} questions={data.questions?.count} score={data.variants?.seller?.stars}/>
          <ColorsPrice variants={data.variants} parameters={data.parameters} discountPrice={data.price?.discount_percent}/>
          <Features attributes={data.review?.attributes}/>
          {data.category?.return_reason_alert &&
          <div className="w-3/4 flex justify-center items-start gap-2">
            <svg className="w-8 h-8 text-gray-500">
                <use href="#infoFill"></use>
              </svg>
            <p className="text-justify text-xs text-gray-600 leading-5">
              {data.category?.return_reason_alert}
            </p>
          </div>}
        </div>
      </div>
    </div>
  );
}
