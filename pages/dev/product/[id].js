import React, { useState, useEffect } from 'react';
import { getProductById } from '../../../utils/operationsPrintful';
import { db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const Product = ({ data }) => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
    price: 0.0,
    variants: [],
  });
  
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

  async function handleSubmit(event){
    event.preventDefault();
    let myId = product.result.sync_product.id;
    let myCategories = values.categoriesStr.split(",");
    let myVariants = product.result.sync_variants;
    

    if(values.name !== ""){
      if (values.description !== ""){
        if (values.categoriesStr !== ""){
          if (values.collection !== ""){
            const myData = {
              name: values.name,
              id: myId,
              description: values.description,
              categories: myCategories,
              collection: values.collection,
              materialInfo: values.materialInfo,
              features: values.features,
              product: product.result.sync_product, 
              price: values.price,
              variants: myVariants,
            }
            saveProductDB(myData);
            //console.log(myData);
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

  useEffect(() =>{
    const cookie = getCookie("AdmUsAccs");
    if (cookie){
      var url = window.location;
      const arr = url.pathname.split("/")
      compareIDs(arr[arr.length - 1])
    } else {
      router.push('/');
    }
  }, []);

  return (
    loading
    ?
    <div>Loading...</div>
    :
    <div 
      className='flex items-center justify-center h-screen sm:px-4 sm:px-6 lg:px-8'
      style={{background: "linear-gradient(to bottom right,  #8636dd, #24d6ee)"}}
    >
      <div className='w-full sm:w-11/12 md:w-10/12 xl:w-9/12 h-4/5'>
        <form onSubmit={handleSubmit} className='overflow-y-auto scrollbar-thin scrollbar-thumb-ClarePurple  py-5 w-full h-full px-8 space-y-6 flex flex-col items-center border-2 border-blue-900 rounded-l-2xl bg-White'>
          <h1 className='font-bold text-3xl'>Agregar producto</h1>
          <div className='flex flex-col w-full'>
            <label className='py-1 w-full flex flex-col justify-between'>
              Nombre:
              <input 
                id="name"
                type="text" 
                name="name"  
                value={values.name}
                onChange={handleChange}
                className='border-2 border-slate-500 w-full rounded-md h-8 px-3'     
              />
            </label>
            <label className='py-1 w-full flex flex-col justify-between'>
              Descripción:
              <textarea 
                id="description"
                type="text" 
                name="description"  
                value={values.description}
                onChange={handleChange}
                className='border-2 border-slate-500 w-full rounded-md h-60 px-3'     
              />
            </label>
            <label className='py-1 w-full flex flex-col justify-between'>
              {`Categorías (separadas por coma):`}
              <input 
                id="categoriesStr"
                type="text" 
                name="categoriesStr"  
                value={values.categoriesStr}
                onChange={handleChange}
                className='border-2 border-slate-500 w-full rounded-md h-8 px-3'     
              />
            </label>
            <label className='py-1 w-full flex flex-col justify-between'>
              {`Colección a la que pertenece la obra:`}
              <input 
                id="collection"
                type="text" 
                name="collection"  
                value={values.collection}
                onChange={handleChange}
                className='border-2 border-slate-500 w-full rounded-md h-8 px-3'     
              />
            </label>
            <label className='py-1 w-full flex flex-col justify-between'>
              {`Información sobre el material:`}
              <textarea 
                id="materialInfo"
                type="text" 
                name="materialInfo"  
                value={values.materialInfo}
                onChange={handleChange}
                className='border-2 h-40 border-slate-500 w-full rounded-md h-8 px-3'     
              />
            </label>
            <p>Caracteristicas:</p>
            <div>
              {values.features.map((feature, i) => (
                <p key={i} className='ml-3'><span className='font-bold'>{`${feature.title}: `}</span>{`${feature.description}`}</p>
              ))}
            </div>
            <label className='py-1 w-full flex flex-col justify-between'>
              {`Titulo:`}
              <input 
                id="titleFeature"
                type="text" 
                name="titleFeature"  
                value={values.titleFeature}
                onChange={handleChange}
                className='border-2 border-slate-500 w-full rounded-md h-8 px-3'     
              />
            </label>
            <label className='py-1 w-full flex flex-col justify-between'>
              {`Descripcion:`}
              <input 
                id="descFeature"
                type="text" 
                name="descFeature"  
                value={values.descFeature}
                onChange={handleChange}
                className='border-2 border-slate-500 w-full rounded-md h-8 px-3'     
              />
            </label>
            <div>
              <p className='flex font-bold items-center justify-center w-32 h-8 text-center cursor-pointer bg-marsDark text-White rounded-xl' onClick={addFeature}>Add feature</p>
            </div>
            <label className='py-1 w-full flex flex-col justify-between'>
              {`Precio:`}
              <input 
                id="price"
                type="number" 
                name="price"  
                value={values.price}
                onChange={handleChange}
                className='border-2 border-slate-500 w-full rounded-md h-8 px-3'     
              />
            </label>
            
            
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