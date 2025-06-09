
import React from 'react';
export default function BoxRow({ title, img ,id}) {
  return (
    <a
      href='#'
      id={id}
      className="flex justify-start items-center
       gap-2 cursor-pointer h-auto p-2 w-fit 
           transition-transform duration-200"
    >
      <div className='w-40 h-40'>
        <img className="w-full h-full object-cover" src={img} alt={title} />
      </div>
        <p
            className="text-black text-sm font-normal max-w-40 pr-5 
              overflow-hidden line-clamp-2 w-full"
        >
            {title}
        </p>
    </a>
  );
}