
import React from 'react';
export default function CardItem({ title, img, alt, id, score,stock,price }) {
  return (
    <div
      role="button"
      id={id}
      className="flex flex-col justify-start items-start gap-3 cursor-pointer rounded-xl h-auto p-2 w-fit 
           transition-transform duration-200"
    >
      {/* <div class="flex items-center justify-start mb-1">
        فروش ویژه
      </div> */}
      <img className="w-44 h-60  rounded-xl object-cover" src={img} alt={alt} />
      <p
        className="text-main-txt-menu text-sm font-normal max-w-40 pr-5 whitespace-nowrap
           text-ellipsis overflow-hidden w-full"
      >
        {title}
      </p>
      <div className='flex justify-between items-center w-full'>
        <p>{stock}</p>
        <p className='flex justify-center items-center gap-2'>
          {score}
          <svg className='w-3 h-3 text-yellow-400'>
            <use href="#starFill"></use>
            </svg>
        </p>
      </div>
      <div className='w-full'>
      <p className='flex justify-end items-center gap-2'>
          {price}
          <svg className='w-4 h-4 text-black'>
            <use href="#toman"></use>
            </svg>
        </p>
      </div>
    </div>
  );
}