import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalAddProduct(props) {
  const product = props.product;
  const listProducts = props.allProducts;
  let myProduct = null;
  
  const [values, setValues] = React.useState({
    name: "",
    description: "",
    categories: "",
    collection: "",
    price: 0,
  });

  async function handleSubmit(event){
    event.preventDefault();
  }

  function handleChange(event){
    const { target } = event;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  }

  //console.log(product);

  return (
    props.open ?
    <div className='fixed top-0 left-0 duration-300 translate-x-0 w-screen h-screen bg-White flex flex-col items-center z-50'>
      <div className='absolute mt-3 mr-3 top-0 right-0' onClick={props.handleClose}><CloseIcon className='w-10 h-10' /></div>
      <h1 className='text-xl my-4 font-bold'>Add Product</h1>
      <form className='flex flex-col items-center w-full'>
        <label className='py-1 w-4/5 md:w-3/4 xl:w-3/5 flex flex-col justify-between'>
          Name:
          <input 
            id="name"
            type="text" 
            name="name"
            value={values.name}
            onChange={handleChange}
            className='border-2 border-slate-500 w-full rounded-md h-8 px-3'
          />
        </label>
        <label className='py-1 w-4/5 md:w-3/4 xl:w-3/5 flex flex-col justify-between'>
          Description:
          <textarea 
            id="description"
            type="text" 
            name="description" 
            value={values.description}
            onChange={handleChange}
            className='border-2 h-32 border-slate-500 w-full rounded-md h-8 px-3'
          />
        </label>
        <label className='py-1 w-4/5 md:w-3/4 xl:w-3/5 flex flex-col justify-between'>
          Categories:
          <input 
            id="categories"
            type="text" 
            name="categories" 
            value={values.categories}
            onChange={handleChange}
            className='border-2 border-slate-500 w-full rounded-md h-8 px-3'
          />
        </label>
        <label className='py-1 w-4/5 md:w-3/4 xl:w-3/5 flex flex-col justify-between'>
          Collection:
          <input 
            id="collection"
            type="text" 
            name="collection" 
            value={values.collection}
            onChange={handleChange}
            className='border-2 border-slate-500 w-full rounded-md h-8 px-3'
          />
        </label>
      </form>
    </div>
    :
    <div className='fixed top-0 left-0 duration-300 translate-x-full w-screen h-screen bg-White z-50'></div>
  );
}