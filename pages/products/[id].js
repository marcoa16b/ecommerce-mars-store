/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../../components/home/Navbar';
import Loading from '../../components/Loading';
import VariantPicker from '../../components/VariantPicker';
import { db } from "../../lib/firebase"
import { collection, getDocs } from "firebase/firestore";

const Product = ({ data, product }) => {
  const syncProduct = data.result.sync_product;
  const variants = data.result.sync_variants;
  const name = syncProduct.name.split("-")[0];
  const [firstVariant] = variants;
  const oneStyle = variants.length === 1;

  const [activeVariantExternalId, setActiveVariantExternalId] = useState(
    firstVariant.external_id
  );

  const activeVariant = variants.find(
    (v) => v.external_id === activeVariantExternalId
  );

  const activeVariantFile = activeVariant.files.find(
    ({ type }) => type === "preview"
  );

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: activeVariant.currency,
  }).format(activeVariant.retail_price);
  

  useEffect(() => {
    console.log("data", data);
    console.log("product", product);
  }, []);
  
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='w-full flex flex-col items-center'>
        <div className='flex flex-col w-full justify-around p-5 md:flex-row'>
          {/* This is for the images */}
          <div className='w-full sm:w-2/3 md:w-2/5 shadow-xl'>
            {activeVariantFile && (
              <Image
                className='rounded-2xl shadow-xl'
                src={activeVariantFile.preview_url}
                width={250}
                height={250}
                layout='responsive'
                alt={`${activeVariant.name}`}
                title={`${activeVariant.name}`}
              />
            )}
          </div>
          {/* This is for the Info of products */}
          <div className='w-full sm:w-2/3 md:w-2/5 '>
            <div className="flex-1 pt-0">
              <div className="pt-10">
                <p className="mb-2 text-3xl font-bold">{name}</p>
                <p className="text-2xl text-marsDark">{formattedPrice} USD</p>
                <p className="my-1 text-lg">{product.description}</p>
              </div>
              <div className="py-3 flex flex-col justify-center">
                <div className='mb-3 w-20 h-1 bg-marsClare rounded-lg'></div>
                <p>Select a color and size:</p>
                <VariantPicker
                  value={activeVariantExternalId}
                  onChange={({ target: { value } }) =>
                    setActiveVariantExternalId(value)
                  }
                  variants={variants}
                  disabled={oneStyle}
                />
                <p className='mb-5'>If you don't know what your size is, you can visit this page</p>
                <button
                  className="w-full transition py-2 px-4 border border-DarkColor hover:border-transparent shadow-sm text-sm font-medium bg-ClareOrange text-DarkColor focus:text-white hover:bg-marsClare hover:text-White focus:bg-marsClare focus:outline-none rounded-lg"
                  data-item-id={activeVariantExternalId}
                  data-item-price={activeVariant.retail_price}
                  // data-item-url={`/api/products/${activeVariantExternalId}`}
                  data-item-description={activeVariant.name}
                  data-item-image={activeVariantFile.preview_url}
                  data-item-name={name}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          
        </div>
        {/* This is for the Extra Info */}
        <div className='w-5/6 mb-10'>
          <h1 className='text-3xl font-bold mt-10 text-center'>More details</h1>
          <h2 className='text-2xl text-DarkColor font-bold mt-10'>Features of this product</h2>
          <div className='text-lg'>
            {
              product.features.map((feature, i) => (
                <div key={i}>
                  <p><spam className='font-bold'>{feature.title}:</spam> {feature.description}</p>
                </div>
              ))
            }
          </div>
          <h2 className='text-2xl text-DarkColor font-bold mt-10'>More information about the product</h2>
          <p className='text-lg'>{product.generalProductInfo}</p>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps({ ...ctx }) {
  const { id } = ctx.params;
  const res = await fetch(`https://api.printful.com/sync/products/${id}`, {
    mode: 'no-cors',
    headers: {
      'authorization': 'Bearer ' + process.env.API_KEY_PRINTFUL,
    }
  });
  let data = await res.json();
  const allProducts = [];
  let product = null;
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    allProducts.push(doc.data());
  });
  allProducts.forEach(prod => {
    if (prod.id == id){
      product = prod;
    }
  });

  return {
    props: { 
      data,
      product 
    }
  }
}

export async function getStaticPaths() {
  const res = await fetch('https://api.printful.com/sync/products', {
    mode: 'no-cors',
    headers: {
      'authorization': 'Bearer ' + process.env.API_KEY_PRINTFUL,
    }
  });
  let data = await res.json();

  const paths = data.result.map(product => ({
    params: {
      id: product.id.toString(),
    }
  }))
  
  return {
      paths,
      fallback: false,
  }
}

export default Product;