import Image from 'next/image';
import React from 'react';
import { useStateContext } from '../../context/ContextProvider';
import { MdDelete } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';

const CartItem = (props) => {
  const { cart, setCart } = useStateContext();
  const [isDelete, setIsDelete] = React.useState(false);

  function deleteItemCart(prod) {
    //const myCart = cart;
    cart.forEach((product, i) => {
      if (product.sync_product.id === prod.sync_product.id){
        cart.splice(i, i+1);
        setIsDelete(true);
        // break;
      }
    });
    console.log(cart);
  }

  return (
    <div className='relative flex items-center rounded-lg m-3 p-3 bg-textSecondary'>
      <div className='w-12 h-12 mr-3 rounded-xl'>
        <Image 
          className='rounded-full'
          src={props.item.sync_product.thumbnail_url} 
          alt='Image of item from cart'
          layout='responsive'
          width='40'
          height='40'
        />
      </div>
      <p>{props.item.sync_product.name}</p>
      <div 
        className='absolute flex items-center justify-center rounded-full -top-[10px] -right-[10px] w-8 h-8 text-xl bg-SimpleOrange cursor-pointer duration-300 hover:scale-110'
        onClick={() => deleteItemCart(props.item)}
      >
        {
          isDelete
          ?
          <FaCheck />
          :
          <MdDelete />
        }
      </div>
    </div>);
}

const CartPopper = () => {
  const { cart } = useStateContext();
  const [haveItems, setHaveItems] = React.useState(false);

  const len = cart.length;

  React.useEffect(() =>{
    if (len === 0){
      setHaveItems(false);
    } else {
      setHaveItems(true);
    }
  }, []);

  return (
    haveItems
    ?
    <div className='flex flex-col items-center justify-between h-full'>
      <div>
        <h1 className='text-center text-xl my-2 font-bold'>Your cart list:</h1>
        {
          cart.map((item, i) => (
            <CartItem key={i} item={item} />
          ))
        }
      </div>
      <Link href='#'>
        <a className='text-center px-4 py-2 bg-clareBg rounded-xl mb-8'>Go to payment</a>
      </Link>
    </div>
    :
    <div className='text-center pt-8'>
      <p>Cart is empty</p>
    </div>
  );
};

export default CartPopper;