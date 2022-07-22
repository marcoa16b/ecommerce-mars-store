import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Navbar from '../../components/home/Navbar';
import Loading from '../../components/Loading';
import { getCategories, getCategoryById } from '../../utils/operationsDB';
import { db } from "../../lib/firebase"
import { collection, getDocs } from "firebase/firestore";

const Categories = ({ dataCategory, products }) => {

  const [loading, setLoading] = React.useState(true);

  React.useEffect(()=> {
    //getAllProducts();
    setLoading(false);
    console.log("List of products => ", products);
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <div className=''>
        <header>
          <Navbar />
        </header>
  
        <main>
          <section className='min-h-[calc(100vh-80px)] bg-clareBg w-full flex items-center justify-center'>
            <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-center'>{dataCategory.title}</h1>
          </section>
  
          <section className='w-full flex flex-col items-center'>
            <h2 className='text-3xl font-bold py-10'>Products</h2>
            <div className='w-28 h-2 rounded mb-5 bg-marsDark'></div>
          </section>

          <section className='min-h-[300px] w-full flex flex-col items-center'>
            <div className='flex flex-wrap w-full justify-center'>
              {
                products.map((p, i) => (
                  <div key={i} className='w-[300px] min-h-[450px] shadow-xl m-3 p-3 bg-White rounded-xl flex flex-col justify-between'>
                    <figure> 
                      <Image 
                        src={p.image}
                        alt='Image of product'
                        width='300'
                        height='300'
                      />
                    </figure>
                    <h2 className='text-lg font-bold'>{p.name}</h2>
                    <div className='flex justify-between'>
                      <p className='text-xl'>{`$${p.price} USD`}</p> 
                      <Link href={`/products/${p.id}`}>
                        <a className='px-3 py-2 rounded-xl h-full bg-RoseClare'>See product</a>
                      </Link>
                    </div>
                  </div>
                ))
              }
            </div>
          </section>
        </main>
      </div>
    );
  } 
};

export async function getStaticProps({ ...ctx }) {
  const { id } = ctx.params;
  const dataCategory = await getCategoryById(id);
  const productsList = dataCategory.products;
  const allProducts = [];
  const products = [];

  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    allProducts.push(doc.data());
    // console.log(`${doc.id} => ${doc.data()}`);
  });
  allProducts.forEach(prod => {
    productsList.forEach(pcid => {
      if (prod.id == pcid){
        // console.log(prod.id, " => ", pcid);
        products.push(prod);
      }
    })
  })
  //console.log(products);
  return {
    props: { 
      dataCategory,
      products
    }
  }
}

export async function getStaticPaths() {
  const catgs = await getCategories();
  const arrCatgs = [];
  catgs.forEach((catg) => {
    const data = catg.data();
    arrCatgs.push(catg.data()); 
  })
  const paths = arrCatgs.map(category => ({
    params: {
      id: category.id.toString(),
    }
  }))
  return {
      paths,
      fallback: false,
  }
}

export default Categories;