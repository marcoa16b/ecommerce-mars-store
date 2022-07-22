import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import Image from 'next/image';
import { useRouter } from 'next/router';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: theme.palette.text.secondary,
}));

const Products = ({ data, changeURL, setProductToEdit }) => {
  const router = useRouter();
  const products = data.result;

  // React.useEffect(() =>{
  //   console.log(data);
  // }, []);

  return (
    <div>
      <div className='w-full h-20 flex items-center pl-5 bg-White'>
        <h1 className='text-2xl font-bold'>Products</h1>
      </div>
      <div className='p-8'>
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            {
              products.map((product, index) => (
                <Item key={index}>
                  <div className='flex items-center'>
                    <Image 
                      src={product.thumbnail_url} 
                      alt='image of product' 
                      width='100'
                      height='100'
                    />
                    <p className=' text-lg'>{product.name}</p>
                  </div>
                  <IconButton onClick={()=>
                    {
                      changeURL('edit');
                      setProductToEdit(product.id);
                    }
                  } aria-label="edit" size="large">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </Item>
              ))
            }
          </Stack>
        </Box>
      </div>
    </div>
  );
};

export default Products;