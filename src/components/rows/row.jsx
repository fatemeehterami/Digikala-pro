import React from 'react';
import RowSection from './rowSection';

export default function HomeRowSections({ sections }) {
  return (
    <div className="py-2 border border-gray-200 rounded-lg max-w-screen-xl my-8
       flex mx-auto p-3.5 w-full gap-3 divide-x divide-gray-200">
      {sections.map(section => (
        <div key={section.code} className="flex-1">
          <RowSection title={section.title} data={section.products} />
        </div>
      ))}
    </div>
  );
}
