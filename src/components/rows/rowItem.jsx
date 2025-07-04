
import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function RowItem({ img ,id}) {
  const navigate = useNavigate()

  const handleClick = ()=>{
    navigate(`product/details/${id}`);
  }
  return (
    <div
      id={id}
      onClick={handleClick}
      className="gird grid-cols-2 cursor-pointer ">
      <div className='lg:w-28 lg:h-28 md:h-64 md:w-64 w-48 h-48'>
        <img className="w-full h-full object-cover" src={img}  />
      </div>
    </div>
  );
}