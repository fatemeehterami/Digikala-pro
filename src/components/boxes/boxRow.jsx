
import React from 'react';

import { useNavigate } from "react-router-dom";
export default function BoxRow({ title, img ,id}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`product/details/${id}`);
  };
  return (
    <div
      id={id}
      onClick={handleClick}
      className="flex justify-start items-center
       gap-2 cursor-pointer h-auto p-2 w-fit 
           transition-transform duration-200"
    >
      <div className="w-28 h-28">
        <img className="w-full h-full object-cover" src={img} alt={title} />
      </div>
      <p
        className="text-black text-sm font-normal max-w-40 pr-5 
              overflow-hidden line-clamp-2 w-full"
      >
        {title}
      </p>
    </div>
  );
}