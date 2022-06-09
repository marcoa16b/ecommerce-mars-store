import React from 'react';
import { useStateContext } from '../../context/ContextProvider';

const CartPopper = () => {
  const { cart } = useStateContext();

  return (
    <div>
      <p>Cart is empty</p>
    </div>
  );
};

export default CartPopper;