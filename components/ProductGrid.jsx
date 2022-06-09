import React from 'react';
import Product from './Product';

const ProductGrid = ({ products, setCartLength }) => {
  if(!products || products.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Product key={product.id} setCartLength={setCartLength} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;