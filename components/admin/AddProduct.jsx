import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image';
import Link from 'next/link';


const AddProduct = (props) => {
  const data = props.data;

  return ( 
    <div className='w-full z-10'>
      {
        data.result.map((product) => (
          <div key={product.id}>
            <div className='w-3/4 mx-auto flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='w-100 h-100 z-20'>
                  <Image alt='icon' width='100' height='100' src={product.thumbnail_url} />
                </div>
                <div className='ml-6 text-xl'>
                  <p>{product.name}</p>
                </div>
              </div>
              
                <Link href={`/dev/product/${product.id}`}>
                  <a 
                    className='w-14 h-14 rounded-full duration-300 flex items-center justify-center hover:bg-ClareOrange'
                  >
                    <EditIcon className='w-8 h-8 hover:scale-125 duration-300' />
                  </a>
                </Link>
              
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default AddProduct;