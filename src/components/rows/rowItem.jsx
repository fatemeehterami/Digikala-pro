
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
      className="gird grid-cols-2 cursor-pointer">
      <div className='w-28 h-28'>
        <img className="w-full h-full object-cover" src={img}  />
      </div>
    </div>
  );
}