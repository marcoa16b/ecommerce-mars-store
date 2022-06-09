import React from 'react';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';
import { getUsers } from '../../utils/operationsDB';
import Link from 'next/link';
import { getCookie, setCookies } from 'cookies-next';

const Adminlogin = () => {
  const router = useRouter()
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    privateKey: "",
  });

  const MoveToPage = (route) => {
    router.push(route)
  }

  async function handleSubmit(event){
    event.preventDefault();

    const data = await getUsers();
    let myUser = null;
    if (data) {
      console.log(data.users);
      data.users.map(user => {
        if (user.email === values.email) {
          myUser = user;
        }
      })
    }
    
    const compare = await bcrypt.compare(values.password, myUser ? myUser.password : '');
    //console.log(compare);
    const myHash = '$2a$10$4Fj6r2nOOLG53t3cfMKj.O5qO/52TqwNk1yeEmWxubY9CfSkY7ozu';
    const compareKey = await bcrypt.compare(values.privateKey, myHash);

    if (myUser) {
      if(compare) {
        if (compareKey) {
          // console.log('La clave es correcta');
          const UIDHash = await bcrypt.hash(myUser._id, 10);
          // console.log(myUser._id + " => " + UIDHash)
          setCookies('Admin', UIDHash, {maxAge: 60 * 60 * 24 * 7});
          setCookies('AdminUser', myUser.email, {maxAge: 60 * 60 * 24 * 7});
          MoveToPage('/dev/admin');
        } else {
            alert('Clave Secreta Incorrecta');
          }
      } else {
        alert('Contraseña Incorrecta');
      }
    } else {
      console.log('El usuario NO fue encontrado');
      alert('No hemos encontrado el usuario');
    }
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

  if (getCookie('Admin')){
    MoveToPage('/dev/admin');
  }

  return (
    <div 
      className='flex items-center justify-center h-screen px-4 sm:px-6 lg:px-8'
      style={{background: "linear-gradient(to bottom right,  #8636dd, #24d6ee)"}}
    >
      <div className='max-w-md w-full space-y-8'>
        <form onSubmit={handleSubmit} className='my-8 py-5 px-8 space-y-6 flex flex-col items-center justify-center border-2 border-blue-900 rounded-2xl bg-slate-50'>
          <h1 className='font-bold text-3xl text-center'>Welcome to the admin page</h1>
          <div className='flex flex-col w-full'>
            
            <label className='py-1 w-full flex flex-col justify-between'>
              Email:
              <input 
                id="email"
                type="email" 
                name="email" 
                value={values.email}
                onChange={handleChange}
                className='border-2 border-slate-500 w-full rounded-md h-8 px-3'
              />
            </label>
            <label className='py-1 w-full flex flex-col justify-between'>
              Password:
              <input 
                id="password"
                type="password" 
                name="password" 
                value={values.password}
                onChange={handleChange}
                className='border-2 border-slate-500 w-full rounded-md h-8 px-3'
              />
            </label>
            <label className='py-1 w-full flex flex-col justify-between'>
              Private key:
              <input 
                id="privateKey"
                type="password" 
                name="privateKey" 
                value={values.privateKey}
                onChange={handleChange}
                className='border-2 border-slate-500 w-full rounded-md h-8 px-3'
              />
            </label>
          </div>
          
          <input 
            type="submit" 
            value="Login" 
            className='rounded-md px-4 text-xl w-full h-12 bg-indigo-500 hover:bg-indigo-600 cursor-pointer'
            style={{transition: ".5s"}}
          />
          <p>
            ¿Estas perdido?
            <Link href="/">
              <a className='ml-2 text-blue-900'>Ve al inicio</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Adminlogin;