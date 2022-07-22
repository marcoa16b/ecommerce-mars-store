import React, { useState, useEffect } from 'react';
import { getProductById } from '../../../utils/operationsPrintful';
import { db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import Dropdown from '../../../components/Dropdown';

import { 
  getCategories,
  addProduct, 
  addProductToCategoty,
  getCollections,
  addProductToCollection,
} from '../../../utils/operationsDB';

const Product = ({ data }) => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const [values, setValues] = useState({
    name: "",
    id: 0,
    description: "",
    categories: [],
    categoriesStr: "",
    collection: "",
    materialInfo: "",
    features: [],
    actFeature: "",
    titleFeature: "",
    descFeature: "",
    selected: null,
    price: 0.0,
    variants: [],
  });

  const onClickAddCategory = () => {
    if(selected !== null){
      let found = false;
      values.categories.forEach(item => {
        if (item.id === selected.id){
          found = true;
        }
      })
      if (!found) {
        values.categories.push(selected);
      }
    }
    console.log(values.categories);
  }
  const onClickAddCollection = () => {
    if(values.collection !== selectedCollection.title){
      const newValues = {
        ...values,
        collection: selectedCollection.title,
      };
      setValues(newValues);
      // setValues.collection(selectedCollection.title);
    }
    //console.log(values.collection);
  }
  
  const compareIDs = async (id) => {
    data.result.map(async (prod) => {
      if (prod.id == id) {
        const myProduct = await getProductById(id);
        setProduct(myProduct);
        setLoading(false);
        console.log(myProduct);
      };
    })
  }

  async function saveProductDB(dt){
    try {
      const docRef = await addDoc(collection(db, "products"), dt);
      console.log("Producto agregado");
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  }

  async function addProductToAllCategories(array, pid){
    array.forEach(async (item) => {
      const res = await addProductToCategoty(item.id, pid);
    });
  }

  async function addProductToDbCollection(id){
    const res = await addProductToCollection(values.collection, id);
  }

  async function handleSubmit(event){
    event.preventDefault();
    let myId = product.result.sync_product.id;

    if(values.name !== ""){
      if (values.description !== ""){
        if (values.categories !== []){
          if (values.collection !== ""){
            const myData = {
              name: values.name,
              id: myId,
              image: product.result.sync_product.thumbnail_url,
              description: values.description,
              collection: values.collection,
              generalProductInfo: values.materialInfo,
              features: values.features, 
              price: values.price,
            }
            console.log(myData);
            addProductToAllCategories(values.categories, myId);
            addProductToDbCollection(myId);
            addProduct(myData);
          } else {
            alert('Es requerido agregar la coleccion a la que pertenece el producto')
          }
        } else {
          alert('Agrega al menos una categoria')
        }
      } else {
        alert('La descripción es requerida')
      }
    } else {
      alert('El nombre es requerido')
    }
  }

  const addFeature = () => {
    const myFeatures = values.features;
    const myTitleFeature = values.titleFeature;
    const myDescFeature = values.descFeature;
    const finalFeature = {
      title: myTitleFeature,
      description: myDescFeature
    }
    myFeatures.push(finalFeature);
    setValues({
      ...values,
      titleFeature: "",
      descFeature: "",
    })
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

  async function getCategoriesData(){
    const arrCatgs = []
    const dbCatgs = await getCategories();
    dbCatgs.forEach((catg) => {
      arrCatgs.push(catg.data()); 
    });
    setCategories(arrCatgs);
    var url = window.location;
    const arr = url.pathname.split("/");
    compareIDs(arr[arr.length - 1]); 
  }
  async function getCollectionsData(){
    const arrColls = []
    const dbColls = await getCollections();
    dbColls.forEach((coll) => {
      arrColls.push(coll.data()); 
    });
    setCollections(arrColls);
    //console.log(collections);
    getCategoriesData();
  }

  useEffect(() =>{
    const cookie = getCookie("AdmUsAccs");
    if (cookie){
      getCollectionsData();
    } else {
      //getCollectionsData();
      router.push('/');
    }
  }, []);

  return (
    loading
    ?
    <div>Loading...</div>
    :
    <div 
      className='flex items-center justify-center h-screen sm:px-4 md:px-6 lg:px-8'
      style={{background: "linear-gradient(to bottom right,  #8636dd, #24d6ee)"}}
    >
      <div className='w-full sm:w-11/12 md:w-10/12 xl:w-9/12 h-4/5'>
        <form onSubmit={handleSubmit} className='overflow-y-auto scrollbar-thin scrollbar-thumb-ClarePurple  py-5 w-full h-full px-8 space-y-6 flex flex-col items-center border-2 border-blue-900 rounded-l-2xl bg-White'>
          <h1 className='font-bold text-3xl'>Agregar producto</h1>
          <div className='w-full'>
            <label 
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Product name
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={values.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Black t'shirt" 
              required 
            />
          </div>
          <div className='w-full'>
            <label  
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Product description
            </label>
            <textarea 
              id="description"
              type="text" 
              name="description"
              rows="4" 
              value={values.description}
              onChange={handleChange}
              className="block p-2.5 w-full h-60 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Description..."
            ></textarea>
          </div>
          {/* <div className='w-full'>
            <label 
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Collection
            </label>
            <input 
              type="text" 
              id="collection" 
              name="collection"  
              value={values.collection}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="summer" 
              required 
            />
          </div> */}
          <p>Collection:</p>
          <div className='flex flex-col items-center md:flex-row md:items-start w-full'>
            <div className='flex my-6 flex-col items-center w-[300px]'>
              <Dropdown 
                title="Select a collection" 
                data={collections} 
                setSelected={setSelectedCollection}
              />

              <div 
                className='flex my-6 font-bold items-center justify-center w-32 h-8 text-center cursor-pointer bg-marsDark text-White rounded-xl'
                onClick={()=>{onClickAddCollection()}}
              >
                Add collection
              </div>
            </div>
            <div>
              {
                (values.collection === "") 
                ?
                <p>Select a collection</p>
                :
                <div className='text-4xl my-6 font-bold'>
                  {values.collection}
                </div>
              }
            </div>
          </div>
          <div className='w-full'>
            <label  
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Product information
            </label>
            <textarea 
              id="materialInfo"
              type="text" 
              name="materialInfo"  
              value={values.materialInfo}
              onChange={handleChange}
              rows="4" 
              className="block p-2.5 w-full h-60 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Description..."
            ></textarea>
          </div>

          <p>Features:</p>
          <div>
            {values.features.map((feature, i) => (
              <p key={i} className='ml-3'><span className='font-bold'>{`${feature.title}: `}</span>{`${feature.description}`}</p>
            ))}
          </div>
          <div className='w-full'>
            <label 
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Titulo
            </label>
            <input 
              id="titleFeature"
              type="text" 
              name="titleFeature"  
              value={values.titleFeature}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Title" 
            />
          </div>
          <div className='w-full'>
            <label 
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Description
            </label>
            <input 
              id="descFeature"
              type="text" 
              name="descFeature"  
              value={values.descFeature}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Description" 
            />
          </div>
          <div>
            <p className='flex font-bold items-center justify-center w-32 h-8 text-center cursor-pointer bg-marsDark text-White rounded-xl' onClick={addFeature}>Add feature</p>
          </div>
          <div className='w-full'>
            <label 
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Price
            </label>
            <input 
              id="price"
              type="number" 
              name="price"  
              value={values.price}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="0.00" 
              required 
            />
          </div>

          <p>Categories:</p>
          <div className='flex flex-col items-center md:flex-row md:items-start min-h-[310px] w-full'>
            <div className='flex flex-col items-center w-[300px]'>
              <Dropdown 
                title="Select a category" 
                data={categories} 
                setSelected={setSelected}
              />

              <div 
                className='flex my-10 font-bold items-center justify-center w-32 h-8 text-center cursor-pointer bg-marsDark text-White rounded-xl'
                onClick={()=>{onClickAddCategory()}}
              >
                Add category
              </div>
            </div>
            <div>
              {
                (values.categories.length === 0) 
                ?
                <p>Aqui van las categorias agregadas</p>
                :
                <div>
                  {values.categories.map((cat, i) => (
                    <div key={i}>
                      {cat.title}
                    </div>
                  ))}
                </div>
              }
            </div>

          </div>
          
          <input 
            type="submit" 
            value="Add" 
            className='rounded-md px-4 text-xl w-36 h-12 bg-ClareOrange hover:bg-SimpleOrange duration-300 cursor-pointer'
            style={{transition: ".5s"}}
          />
        </form>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch('https://api.printful.com/sync/products', {
    mode: 'no-cors',
    headers: {
      'authorization': 'Bearer ' + process.env.API_KEY_PRINTFUL,
    }
  });
  let data = await res.json();
  return {
    props: { data }
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