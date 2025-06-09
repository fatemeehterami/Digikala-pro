import React from 'react';
import BoxRow from './boxRow';
import BoxCol from './boxCol';

export default function Box({ title, icon, data, direction }) {
  return (
    <div className='py-2 border border-gray-200 rounded-lg max-w-screen-xl my-8
     flex flex-wrap items-center justify-between mx-auto p-3.5 w-full gap-3'>
        <div className='flex justify-center items-center gap-2 w-full my-2 text-xl'>
          <svg className="w-5 h-5 ">
              <use href={`#${icon}`}></use>
          </svg>
          <p>{title}</p>
        </div>

        <div className={`grid ${direction === "col" ?'grid-cols-6':'grid-cols-4'} gap-2 w-full divide-y divide-gray-200`}>
          {Array.isArray(data) && data.length > 0 &&
            data.map((item, index) => (
              direction === "col" ? (
                <BoxCol
                  key={index}
                  id={item.id}
                  title={item.title_fa}
                  img={item.images.main}
                  price={item.price.selling_price}
                  discount={item.price.discount_percent}
                  priceDiscount={item.price.rrp_price}
                />
              ) : (
                <BoxRow
                  key={index}
                  id={item.id}
                  title={item.title_fa}
                  img={item.images.main}
                />
              )
            ))}
        </div>
    </div>
  );
}
