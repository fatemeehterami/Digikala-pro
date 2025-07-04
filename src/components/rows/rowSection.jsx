import React from 'react';
import RowItem from './rowItem';


export default function RowSection({ title, data }) {
    const limitedData = data.slice(0, 4);
  
    return (
      <div className='flex flex-col py-3 '>
        <div className='flex justify-center items-start gap-3 flex-col mb-4'>
          <p className='font-bold text-xl'>{title}</p>
          <p className='text-sm text-gray-400'>بر اساس سلیقه شما</p>
        </div>
  
        <div className='grid grid-cols-2 gap-4 w-full justify-items-center'>
          {limitedData.map(item => (
            <RowItem
              key={item.id}
              id={item.id}
              img={item.images.main}
            />
          ))}
        </div>
          <a className='text-blue-600 mt-3 flex justify-center gap-2 items-center cursor-pointer decoration-0 text-sm'
          href='#'>
            مشاهده 
            <svg className="w-2 h-2">
              <use href="#left-arrowKey"></use>
            </svg>
            </a>
      </div>
    );
  }
  
