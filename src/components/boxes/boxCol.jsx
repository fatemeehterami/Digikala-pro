
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function BoxRow({ title, img, price ,id , discount,priceDiscount}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`product/details/${id}`);
  };
  return (
    <div
      id={id}
      onClick={handleClick}
      className="flex flex-col justify-start items-center
       gap-2 cursor-pointer h-auto p-2 w-fit 
           transition-transform duration-200"
    >
      <div className="w-40 h-40">
        <img className="w-full h-full object-cover" src={img} alt={title} />
      </div>
      <div
        className={`flex ${
          discount ? "justify-between" : "justify-end"
        } items-center w-full`}
      >
        {discount ? (
          <>
            <div className="bg-[#d32f2f] text-white font-bold  text-sm py-0.5 px-2 rounded-full">
              {discount.toLocaleString("fa-IR")}٪
            </div>
            <div className="flex flex-col justify-end items-center gap-2 ">
              <p className="flex justify-center items-center flex-row-reverse gap-2 text-lg">
                <svg className="w-4 h-4 text-black">
                  <use href="#toman"></use>
                </svg>
                {(priceDiscount/10).toLocaleString("fa-IR")}
              </p>
              <p className="text-sm text-gray-500 line-through">
                {(price/10).toLocaleString("fa-IR")}
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-end items-center gap-2 ">
            <p className="flex justify-center items-center flex-row-reverse gap-2 text-lg">
              <svg className="w-4 h-4 text-black">
                <use href="#toman"></use>
              </svg>
              {(price/10).toLocaleString("fa-IR")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}