import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaBars, FaShoppingCart } from 'react-icons/fa';
import { CgMenuLeft } from 'react-icons/cg';
import { useStateContext } from '../../context/ContextProvider';
import Badge from '@mui/material/Badge';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import UserPopper from '../poppers/UserPopper';
import CartPopper from '../poppers/CartPopper';

const Navbar = (props) => {
  const [userPopper, setUserPopper] = useState(false);
  const [cartPopper, setCartPopper] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [openNavbar, setOpenNavbar] = useState(false);
  const { user, cart, login, logout } = useStateContext();
  const [isMobile, setIsMobile] = useState(0);

  const handleResize = () => {
    if (window.innerWidth < 1000) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handleCartPopper = () => {
    cartPopper ? setCartPopper(false) : setCartPopper(true);
  }
  const handleUserPopper = () => {
    userPopper ? setUserPopper(false) : setUserPopper(true);
  }
  const handleOpenNavbar = () => {
    openNavbar ? setOpenNavbar(false) : setOpenNavbar(true);
  }

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    isMobile 
    ?
    <div className='relative z-50'>
      <div className='flex items-center h-20 text-DarkColor shadow-md px-6 justify-between'>
        <div 
          className='flex text-4xl cursor-pointer items-center'
          onClick={handleOpenNavbar}
        >
          <CgMenuLeft />
        </div>

        <h1 className='text-2xl font-bold my-8'>Mars Store</h1>

        <div className='relative cursor-pointer flex text-3xl items-center'>
          <div 
            className=''
            onClick={handleUserPopper}
          >
            <AccountCircleOutlinedIcon fontSize="large" />
          </div>
          <div 
            className='mx-5 cursor-pointer' 
            onClick={handleCartPopper}
          >
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingBasketOutlinedIcon fontSize="large" />
            </Badge>
          </div>
        </div>
      </div>

      {/* ################## Navbar ################## */}
      {
        openNavbar 
        ?
        <div className='fixed w-full h-screen duration-300 translate-x-0 flex flex-col items-center bg-White'>
          {/* <h1 className='text-6xl font-bold my-8'>Mars Store</h1> */}
          <div className='text-2xl my-auto pb-28 text-center font-bold'>
            <Link href='#'>
              <p className='my-9 hover:tracking-widest duration-300 cursor-pointer hover:text-DarkColor'>Home</p>
            </Link>
            <Link href='#'>
              <p className='my-9 hover:tracking-widest duration-300 cursor-pointer hover:text-DarkColor'>Collections</p>
            </Link>
            <Link href='#'>
              <p className='my-9 hover:tracking-widest duration-300 cursor-pointer hover:text-DarkColor'>About</p>
            </Link>
            <Link href='#'>
              <p className='my-9 hover:tracking-widest duration-300 cursor-pointer hover:text-DarkColor'>How we work</p>
            </Link>
          </div>
        </div>
        :
        <div className='fixed w-full h-screen duration-300 -translate-x-full flex flex-col items-center bg-White'></div>
      }
      
      
      {/* ################## USER POPPER ################## */}
      <div className='relative w-full h-full'>
        {
          userPopper
          ?
          <div className='fixed translate-x-0 duration-300 right-0 w-2/3 h-screen bg-White'>
            <UserPopper />
          </div>
          :
          <div className='fixed translate-x-full duration-300 right-0 w-2/3 h-screen bg-White'></div>
        }
      </div>

      {/* ################## CART POPPER ################## */}
      {
        cartPopper
        ?
        <div className='fixed translate-x-0 overflow-y-scroll duration-300 right-0 w-2/3 h-[calc(100vh-80px)] bg-White'>
          <CartPopper />
        </div>
        :
        <div className='fixed translate-x-full duration-300 right-0 w-2/3 h-screen bg-White'></div>
      }

    </div>
    :
    // ################## Tablets & PCs ##################
    <div className='relative z-50'>
      <div className='flex px-7 h-20 items-center justify-between'>
        <h1 className='text-4xl font-bold my-8'>Mars Store</h1>
        <div className='text-xl flex items-center text-center font-bold my-8'>
          <Link href='#'>
            <p className='mx-6 hover:tracking-wider duration-300 cursor-pointer hover:text-DarkColor'>Home</p>
          </Link>
          <Link href='#'>
            <p className='mx-6 hover:tracking-wider duration-300 cursor-pointer hover:text-DarkColor'>Collections</p>
          </Link>
          <Link href='#'>
            <p className='mx-6 hover:tracking-wider duration-300 cursor-pointer hover:text-DarkColor'>About</p>
          </Link>
          <Link href='#'>
            <p className='mx-6 hover:tracking-wider duration-300 cursor-pointer hover:text-DarkColor'>How we work</p>
          </Link>
        </div>
        <div className='relative cursor-pointer flex text-3xl items-center'>
          <div 
            className='mx-5'
            onClick={handleUserPopper}
          >
            <AccountCircleOutlinedIcon fontSize="large" />
          </div>
          <div 
            className='mx-5 cursor-pointer' 
            onClick={handleCartPopper}
          >
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingBasketOutlinedIcon fontSize="large" />
            </Badge>
          </div>
        </div>
      </div>

      <div>
        {
          userPopper
          ?
          <div className='fixed translate-x-0 duration-300 right-0 w-2/5 h-screen bg-White'>
            <UserPopper />
          </div>
          :
          <div className='fixed translate-x-full duration-300 right-0 w-2/3 h-screen bg-White'></div>
        }
      </div>

      {/* ################## CART POPPER ################## */}
      {
        cartPopper
        ?
        <div className='fixed translate-x-0 overflow-y-scroll duration-300 right-0 w-2/5 h-screen bg-White'><CartPopper /></div>
        :
        <div className='fixed translate-x-full duration-300 right-0 w-2/3 h-screen bg-White'></div>
      }
    </div>
  );
};

export default Navbar;
