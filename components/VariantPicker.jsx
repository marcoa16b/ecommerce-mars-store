import React from 'react';

const VariantPicker = ({ variants, ...props }) => {
  if (variants.length === (0 || 1)) return null;
  
  return (
    <select
      {...props}
      className="appearance-none w-full relative mb-1 flex-grow pl-3 py-2 border border-marsDark focus:border-gray-500 shadow-sm text-gray-500 text-sm focus:outline-none focus:text-gray-900 rounded"
    >
      {variants.map(({ external_id, name }) => {
        const formattName = name.split('-')[1];
        //console.log(formattName)
        return (
          <option key={external_id} value={external_id} className=''>
            {formattName}
          </option>
        )
      })}
    </select>
  );
};

export default VariantPicker;