
import React from 'react';
export default function RowItem({ img ,id}) {
  return (
    <div
      id={id}
      className="gird grid-cols-2">
      <div className='w-28 h-28'>
        <a href="#" className='decoration-0'>
        <img className="w-full h-full object-cover" src={img}  />
        </a>
      </div>
    </div>
  );
}