import { useEffect, useState , useRef } from "react";
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
import MoreDetails from "../components/details/moreDetails";

export default function DetailPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const moreDetailsRef = useRef(null);
  const { id } = useParams();

  const handleTabChangeAndScroll = (tabName) => {
    setActiveTab(tabName);
    setTimeout(() => {
      if (moreDetailsRef.current) {
        moreDetailsRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 200);
  };

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProductDetails(id);
        if (response?.result?.product) {
          console.log(response.result.product)
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

  if (loading) return <div><Loading/></div>;

  if (error) return <div className="text-center text-red-600 p-6">{error}</div>;

  return (
    <div className="max-w-screen-xl my-2 flex flex-col mx-auto w-full px-5 h-full">
      <UrlPage titleFa={data.breadcrumb} categoryTitle={data.category_title} />
      <div className="grid lg:grid-cols-3 grid-cols-1  gap-5 w-full">
        <div className="col-span-1">
        {data.price?.badge && 
          <div className="flex gap-3 items-center justify-between mb-2 px-5 py-3 rounded-lg bg-red-100">
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
          <ScoreRow comments={data.comments?.count} questions={data.questions?.count} onTabChange={handleTabChangeAndScroll} score={data.variants?.seller?.stars}/>
          <ColorsPrice orderLimit={data.price.order_limit} variants={data.variants}  price={data.price} id={data.id} discount={data.price?.discount_percent} image={data.images.main}/>
          <Features attributes={data.review?.attributes} onTabChange={handleTabChangeAndScroll}/>
          {data.category?.return_reason_alert &&
          <div className=" w-full flex justify-center items-start gap-2 my-2">
            <svg className="w-8 h-8 text-gray-500">
                <use href="#infoFill"></use>
              </svg>
            <p className="text-justify text-xs text-gray-600 leading-5">
              {data.category?.return_reason_alert}
            </p>
          </div>}
        </div>
      </div>
      <div className="lg:flex hidden justify-between items-center my-3 border-t border-b-4 border-gray-200 text-[#A1A3A8] w-full">
            <div className="flex justify-center items-center gap-3 py-5 ">
              <svg className="w-10 h-10">
                <use href="#express-delivery-icon"></use>
              </svg>
              <p className="text-xs">امکان تحویل اکسپرس</p>
            </div>
            <div className="flex justify-center items-center gap-3 py-5">
              <svg className="w-10 h-10">
                <use href="#support-icon"></use>
              </svg>
              <p className="text-xs">۲۴ ساعته، ۷ روز هفته</p>
            </div>
            <div className="flex justify-center items-center gap-3 py-5">
              <svg className="w-10 h-10">
                <use href="#cash-on-delivery-icon"></use>
              </svg>
              <p className="text-xs">امکان پرداخت در محل</p>
            </div>
            <div className="flex justify-center items-center gap-3 py-5">
              <svg className="w-10 h-10">
                <use href="#days-return-icon"></use>
              </svg>
              <p className="text-xs">هفت روز ضمانت بازگشت کالا</p>
            </div>
            <div className="flex justify-center items-center gap-3 py-5">
              <svg className="w-10 h-10">
                <use href="#original-products-icon"></use>
              </svg>
              <p className="text-xs">ضمانت اصل بودن کالا</p>
            </div>
      </div>    
      <MoreDetails 
       ref={moreDetailsRef}
       description={data?.review?.description}
       comments={data?.comments} 
       questions={data?.questions}
       activeTab={activeTab}
       onTabChange={setActiveTab}/>
    </div>
  );
}
