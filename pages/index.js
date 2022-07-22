import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/home/Navbar';
// import ProductGrid from '../components/ProductGrid';
import { useStateContext } from '../context/ContextProvider';
import Loading from '../components/Loading';
// import { collection, getDocs } from "firebase/firestore";
// import { db } from '../lib/firebase';
import Image from 'next/image';
// import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import Link from 'next/link';
import ImagePresentation from '../public/images/PresentationStoreImg.png';
import ImageEcommerce from '../public/images/ecommerce-image.png';
import { useRouter } from 'next/router';

import { 
  getCategories, 
  getCollections, 
  addCategory, 
  addProductToCategoty,
  saveAllCategoriesOfPrintful,
} from '../utils/operationsDB';
import { 
  getAllProducts, 
  getProductById, 
  getPrintfulCategories 
} from '../utils/operationsPrintful';

function Home() {
  const router = useRouter();
  const { cart, wishlist, setWishlist } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoriesPrintfulList, setCategoriesPrintfulList] = useState([]);
  const [collectionsList, setCollectionsList] = useState([]);

  const [selectedItem, setSelectedItem] = useState({
    item: null,
    idx: null
  });
  const [state, setState] = useState(false);

  const handleSearch = (e) => {
    const menuEls = document.querySelectorAll('.menu-el-js')
    const searchVal = e.target.value.toLocaleLowerCase()

    menuEls.forEach(el => {
        el.classList.remove("hidden")
        if (!el.textContent.toLocaleLowerCase().includes(searchVal)) {
            el.classList.add("hidden")
        }
    })
  }

  const getCategoriesData = async () => {
    const catgs = await getPrintfulCategories();
    const arrCatgs = []
    const dbCatgs = await getCategories();
    dbCatgs.forEach((catg) => {
      // const data = catg.data();
      // arrCatgs.push(catg.data().products); 
      if (catg.data().products.length !== 0){
        arrCatgs.push(catg.data()); 
        //console.log("null")
      }
    })
    //console.log(arrCatgs);
    setCategoriesPrintfulList(arrCatgs);


    const arr = []
    const categories = await getCategories();
    categories.forEach(category => {
      arr.push(category.id);
    })
    return arr;
  }
  const getCollectionsData = async () => {
    const arr = []
    const collections = await getCollections();
    collections.forEach(collection => {
      arr.push(collection.id);
    })
    return arr;
  }

  async function getDataFromDB(){
    const categories = await getCategoriesData();
    const collections = await getCollectionsData();

    //console.log("categories => ", categories);
    //console.log("collections => ", collections);

    setCategoriesList(categories);
    setCollectionsList(collections);
    setLoading(false);
  }

  React.useEffect(() => {
    // getProductsPrintful();
    getDataFromDB();
    // const getCatgs = async () => {
    //   const catgs = await getPrintfulCategories();
    //   //setCategoriesPrintfulList(catgs.result.categories);
    //   if (catgs.error){
    //     alert("Ha ocurrido un error con nuestros servidores")
    //     // console.log("Ha ocurrido un error con nuestros servidores")
    //   } else {
    //     console.log(catgs);
    //   }
    // }
    // getCatgs();
  }, [])

  return (
    loading
    ?
    <Loading />
    :
    <div>
      <Head>
        <title>Mars Elit - Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='z-50'>
        <Navbar />
      </header>

{/* [calc(100vh-80px)] */}
      <main className='z-10 flex flex-col items-center'> 
        <section id='home-index' className='relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center md:text-xl lg:flex-row-reverse xl:w-3/4'>
          <div className='w-full max-w-[480px] sm:w-1/2 lg:w-1/2 xl:w-2/5'>
            <Image 
              src={ImagePresentation}
              layout='responsive'
              alt='Imagen de presentación de la tienda'
            />
          </div>
          <div className='h-48 sm:w-11/12 md:w-3/4 lg:w-1/2 p-5 text-center flex flex-col items-center'>
            <h1 className='font-bold my-4 text-3xl'>We are a different store</h1>
            <p className=' max-w-[70%] lg:max-w-full'>In this store you can find different products, with original designs and the best brands.</p>
          </div>
        </section>

        

        <section id='products-grid' className='relative px-1 bg-clareBg flex flex-col items-center justify-center  w-full min-h-[400px]'>
          <div className="text-center p-6">
            <h1 className="text-3xl font-bold">
              All categories
            </h1>
          </div>
          <div className="py-10 w-full flex flex-wrap items-center justify-center">
            {
              categoriesPrintfulList.map((catg, i) => (
                <div key={i} className='m-3 h-[170px]'>
                  <div className='w-32 h-32 mx-auto rounded-xl rotate-45 overflow-hidden'>
                    <Image 
                      className='w-full h-full object-cover -rotate-45 mx-auto transition duration-300 hover:scale-[1.1]'
                      src={catg.image}
                      alt='Category image'
                      width='128'
                      height='128'
                      onClick={()=>{router.push(`/categories/${catg.id}`)}}
                    />
                  </div>
                  <div className='text-center'>
                    <div>
                      <h2 className='text-2xl'>{catg.title}</h2>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          {/* <div className='container px-4 py-5 flex flex-wrap items-center justify-center'>
            { collectionsList.map((category, i) => (
                <div key={i}>
                  <Link href="#">
                    <a className='px-3 py-2 m-2 md:text-lg lg:text-2xl bg-RoseClare rounded-lg'>{category}</a>
                  </Link>
                </div>
              ))
            } 
          </div> */}
          {/* <div className='container m-auto px-6 space-y-8'>
            <div className='m-auto text-center lg:w-7/12'>
              <h2 className='text-2xl text-DarkColor font-bold md:text-4xl'>List of the available categories</h2>
            </div>
            <div className='flex flex-wrap w-[90%]'>
              {
                categoriesPrintfulList.map((item, i) => (
                  <div key={i} className='p-4 flex w-[250px]'>
                    <Image src={item.image_url} alt='imagen' width="60" height="60" />
                    <p>{item.title}</p>
                  </div>
                ))
              }
            </div>
          </div> */}
          {/* <div className="relative max-w-xs px-4 mx-auto mt-12 text-[15px]">
            <button className="flex items-center justify-between w-full px-3 py-2 text-gray-500 bg-white border rounded-md shadow-sm cursor-default outline-none focus:border-indigo-600" 
                aria-haspopup="true" 
                aria-expanded="true"
                onClick={() => setState(!state)}
            >
                { selectedItem.item || "Select a category" }
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
            </button>
            {
              state ? (
                <div className="z-10 relative w-full">
                  <ul className="absolute w-full mt-3 bg-White border rounded-md shadow-sm" role="listbox">
                    <div className="shadow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input 
                        type="text" 
                        placeholder="Search"
                        className="p-2 text-gray-500 w-full rounded-md outline-none"
                        onInput={handleSearch}
                      />
                    </div>
                      <div className="max-h-64 mt-2 overflow-y-auto">
                        {
                          categoriesPrintfulList.map((el, idx) => (
                            <li
                              key={idx}
                              onClick={() => {                                                
                                setSelectedItem({
                                  item: el.title,
                                  idx
                                })
                                setState(false)
                              }}
                              //role="option"
                              className={`${selectedItem.idx == idx ? 'text-indigo-600 bg-indigo-50' : ''} menu-el-js flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50`}
                            >
                            { el.title }
                              {
                                selectedItem.idx == idx ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                ) : ''
                              }
                          </li>
                        ))
                      }
                    </div>
                  </ul>
                </div>
              ) : ''
            }
          </div> */}
          {/* <div className="text-center p-6">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
              All categories
            </h1>
          </div>
          <div className='px-4 py-5 flex flex-wrap items-center justify-center'>
            { categoriesList.map((category, i) => (
                <div key={i}>
                  <Link href="#">
                    <a className='px-3 py-2 m-2 md:text-lg lg:text-2xl bg-RoseClare rounded-lg'>{category}</a>
                  </Link>
                </div>
              ))
            } 
          </div> */}
        </section>

        <section id="info" className='min-h-[600px] flex flex-col justify-around text-center items-center p-8 lg:flex-row'>
          <div className='z-0 max-w-[90%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%]'>
            <Image 
              src={ImageEcommerce}
              alt='imagen compromiso con medio ambiente'
              width="695"
              height="455"
            />
          </div>
          <div className='max-w-[90%] md:max-w-[70%] lg:max-w-[40%]'>
            <h1 className='text-3xl font-bold my-2'>About us</h1>
            <p>We are part of an enterprise in which we seek to offer people from anywhere in the world quality garments with our personalized and original designs.</p>
          </div>
        </section>
      </main>

      <footer className=''>  
      </footer>
    </div>
  )
}

// export async function getServerSideProps() {
//   const products = getAllProducts()
//   // const res = await fetch('https://api.printful.com/sync/products', {
//   //   mode: 'no-cors',
//   //   headers: {
//   //     'authorization': 'Bearer ' + process.env.API_KEY_PRINTFUL,
//   //   }
//   // });
//   let data = await res.json();
//   return {
//     props: { data }
//   }
// }

export default Home;


// {
//   productList.map((product, i) => (
//     <div 
//       key={i}
//       className="relative w-[290px] h-[438px] bg-White shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer"
//       // onClick={()=>addToCart(product)}
//     >
//       <div className="overflow-x-hidden rounded-2xl relative">
//         <div className="rounded-2xl w-full object-cover">
//           <Image 
//             src={product.result.sync_product.thumbnail_url}
//             layout='responsive'
//             width='1000'
//             height='1000'
//             alt="Picture of the product"
//           />
//         </div>
//         {/* <p 
//           className="absolute flex items-center justify-center right-2 top-2 bg-White rounded-full w-10 h-10 text-4xl cursor-pointer group"
//           onClick={() => {addProductToWishList(product)}}
//         >
//           {isOnWishList
//           ?
//             <MdFavorite />
//             :
//             <MdFavoriteBorder />
//           }
//         </p> */}
//       </div>
//       <div className="mt-4 px-1 mb-2 flex flex-col justify-between">
//         <div className=''>
//           <p className="text-lg font-semibold text-center text-gray-900 mb-0 h-16">{product.result.sync_product.name}</p>
//         </div> 
//         <div className="flex items-center justify-between h-16 min-w-fit mb-1 mr-4 group cursor-pointer">
//           <p className="text-lg text-gray-800 mt-0">${product.result.sync_variants[0].retail_price} USD</p>
//           <Link href={`/products/${product.result.sync_product.id}`}>
//             <a className='flex items-center justify-center w-32 h-8 rounded-2xl duration-300 bg-SimpleOrange hover:bg-ClareOrange'>
//               <p>See product</p>
//             </a>
//           </Link>
//         </div>
//       </div>
//     </div>
//   ))
// }