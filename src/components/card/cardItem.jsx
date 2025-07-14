
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CardItem({ title, img, alt, id, score,price }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/details/${id}`);
  };
  return (
    <div
      role="button"
      id={id}
      onClick={handleClick}
      className="flex flex-col justify-start items-center gap-3 cursor-pointer
       h-full px-5 py-6 w-full transition-transform duration-200 border border-gray-100 hover:shadow-xl"

    >
      <img className="w-44 h-60  rounded-xl object-cover" src={img} alt={alt} />
      <p
        className="text-main-txt-menu text-sm font-normal  whitespace-nowrap
           text-ellipsis overflow-hidden w-full"
      >
        {title}
      </p>
      <div className='flex justify-end items-center w-full'>
      {score ? (
        <p className='flex justify-center items-center gap-2'>
        {score?.toLocaleString("fa-IR")}
          <svg className='w-3 h-3 text-yellow-400'>
            <use href="#starFill"></use>
            </svg>
        </p>):null}
      </div>
      <div
        className={`flex ${
          price?.discount_percent ? "justify-between" : "justify-end"
        } items-center w-full`}
      >
        {price?.discount_percent ? (
          <>
            <div className="bg-[#d32f2f] text-white font-bold  text-sm py-0.5 px-2 rounded-full">
              {price?.discount_percent.toLocaleString("fa-IR")}٪
            </div>
            <div className="flex flex-col justify-end items-center gap-2 ">
              <p className="flex justify-center items-center flex-row-reverse gap-2 text-lg">
                <svg className="w-4 h-4 text-black">
                  <use href="#toman"></use>
                </svg>
                {(price?.selling_price / 10).toLocaleString("fa-IR")}
              </p>
              <p className="text-sm text-gray-500 line-through">
                {(price?.rrp_price / 10).toLocaleString("fa-IR")}
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-end items-center gap-2 ">
            <p className="flex justify-center items-center flex-row-reverse gap-2 text-lg">
              <svg className="w-4 h-4 text-black">
                <use href="#toman"></use>
              </svg>
              {(price?.rrp_price / 10).toLocaleString("fa-IR")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}