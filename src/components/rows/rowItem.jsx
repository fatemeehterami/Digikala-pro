
import React from 'react';
export default function RowItem({ img ,id}) {
  return (
    <div
      id={id}
      className="gird grid-cols-2">
      <div className='w-28 h-028'>
        <img className="w-full h-full object-cover" src={img}  />
      </div>
    </div>
  );
}