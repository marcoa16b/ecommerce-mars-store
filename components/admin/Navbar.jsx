import React from 'react';
import Link from 'next/link';
import { useStateContext } from '../../context/ContextProvider';
import { IoClose } from "react-icons/io5";

import { FiShoppingBag, FiLogIn, FiLogOut } from 'react-icons/fi';
import { BiEditAlt } from 'react-icons/bi';
import { IoMdAddCircleOutline } from 'react-icons/io';

const Navbar = (props) => {
  const { adminMenu, setAdminMenu, user, logout, login } = useStateContext();

  const changeURL = (id) => {
    props.setSection(id)
  }

  const closeMenu = () => {
    var windowWidth = window.innerWidth;
    if (windowWidth < 640){
      props.setAdminMenu(false);
    }
  }
  return (
    <div className='flex flex-col justify-between w-full p-5 bg-White h-screen shadow-xl z-50'>
      <div className='flex flex-col w-full'>
        <div className='flex justify-between z-50'>
          <h1 className='font-bold text-2xl'>MarsElit</h1>
          <div 
            onClick={()=>{
              adminMenu ? setAdminMenu(false) : setAdminMenu(true);
            }}
            className='text-4xl flex items-center justify-center w-9 h-9'
          >
            <IoClose />
          </div>
        </div>

        <h2 className='text-gray-300 pt-5'>Dashboard</h2>

        <div 
          className='flex items-center my-2 cursor-pointer'
          onClick={()=>{
            changeURL('dashboard');
            closeMenu();
          }}
        >
          <div className='w-10 h-10 text-2xl flex items-center justify-center'>
            <FiShoppingBag />
          </div>
          <p className='text-xl'>Ecommerce</p>
        </div>

        <h2 className='text-gray-300 pt-5'>Products</h2>

        <div 
          className='flex items-center my-2 cursor-pointer'
          onClick={()=>{
            changeURL('addproduct');
            closeMenu();
          }}
        >
          <div className='w-10 h-10 text-2xl flex items-center justify-center'>
            <IoMdAddCircleOutline />
          </div>
          <p className='text-xl'>Add Products</p>
        </div>

        <div 
          className='flex items-center my-2 cursor-pointer'
          onClick={()=>{
            changeURL('editProduct');
            closeMenu();
          }}
        >
          <div className='w-10 h-10 text-2xl flex items-center justify-center'>
            <BiEditAlt />
          </div>
          <p className='text-xl'>Edit Products</p>
        </div>
      </div>

      <div>
        <h2 className='text-gray-300 pt-5'>User</h2>
        {
          user 
          ?
          <div 
            className='flex items-center my-2 cursor-pointer'
            onClick={()=>{
              logout();
            }}
          >
            <div className='w-10 h-10 text-2xl flex items-center justify-center'>
              <FiLogOut />
            </div>
            <p className='text-xl'>Log out</p>
          </div>
            :
            <div 
            className='flex items-center my-2 cursor-pointer'
            onClick={()=>{
              login();
            }}
          >
            <div className='w-10 h-10 text-2xl flex items-center justify-center'>
              <FiLogIn />
            </div>
            <p className='text-xl'>Log in</p>
          </div>
        }
      </div>

      
      
    </div>
  );
};

export default Navbar;