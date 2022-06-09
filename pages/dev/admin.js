import React from 'react';
import { getCookie } from 'cookies-next';
import { IoMenu } from "react-icons/io5";
import Loader from '../../components/Loading';
import Navbar from '../../components/admin/Navbar';
import Dashboard from '../../components/admin/Dashboard';
import AddProduct from '../../components/admin/AddProduct';

import { getAllProducts, getProductById } from '../../utils/operationsPrintful';


import { useStateContext } from '../../context/ContextProvider';

const Admin = () => {
  const [loading, setLoading] = React.useState(true);
  const [section, setSection] = React.useState('dashboard');
  const [userAccess, setUserAccess] = React.useState(false);
  const [productsData, setproductsData] = React.useState([]);
  const [allProducts, setAllProducts] = React.useState([]);
  
  const { adminMenu, setAdminMenu, user } = useStateContext();

  const getPrintfulProducts = async () => {
    const listOfProducts = []
    const newData = await getAllProducts();
    if (newData) {
      for (let i in newData.result){
        const product = await getProductById(newData.result[i].id);
        listOfProducts.push(product)
      }
      setproductsData(newData);
      setAllProducts(listOfProducts);
      setLoading(false);
    } else {
      alert("We were unable to retrieve the information.")
    }
  }

  React.useEffect(() => {
    //verifyAdminLogin();
    const cookie = getCookie("AdmUsAccs");
    if (cookie){
      setUserAccess(true);
      getPrintfulProducts();
    } else {
      getPrintfulProducts();
    }
    
    
  }, []);

  return (
    loading ? 
    <Loader />
    :
    <div className='flex bg-slate-100 w-full h-screen'>
      <div 
        onClick={()=>{
          adminMenu ? setAdminMenu(false) : setAdminMenu(true)
        }}
        className='fixed w-10 h-10 rounded-full flex items-center justify-center bg-White border-2 border-slate-100 left-3 top-3 text-2xl hover:text-3xl duration-150 hover:shadow-md cursor-pointer sm:w-14 sm:h-14 sm:text-4xl sm:hover:text-5xl'
      >
        <IoMenu />
      </div>
      {
        adminMenu 
        ?
        <div className='w-full duration-300 fixed sm:w-72 sm:relative z-20'>
          <Navbar setAdminMenu={setAdminMenu} setSection={setSection} />
        </div>  
        :
        <div className='w-full duration-300 -translate-x-full fixed sm:w-72 sm:-translate-x-72'>
          <Navbar setAdminMenu={setAdminMenu} setSection={setSection} />
        </div>
      }
      {
        userAccess
        ?
        <div 
          className='ml-0 p-5 mt-12 w-full sm:ml-14 sm:mt-0 z-10'
        >
          {
            (section === "dashboard") ?
            <div id='dashboard'>
              <Dashboard />
            </div>
            : (section === "addproduct") ?
            <div id='addproduct' className='w-full'>
              <AddProduct data={productsData} products={allProducts} />
            </div>
            :
            <div id='editProduct'>This is edit Products</div>
          }
        </div>
        :
        <div className='ml-0 p-5 mt-12 w-full sm:ml-14 sm:mt-0 z-10'>
          <h1 className='text-4xl'>You do not have access to view this page</h1>
        </div>
      }
      
      
      
    </div>
  );
};


export default Admin;