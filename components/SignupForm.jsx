import React from 'react';
import bcrypt from 'bcryptjs';
import { createUser } from '../utils/operationsDB';
import { setCookies } from 'cookies-next';
import Link from 'next/link';
import initFirebase from '../lib/firebase';

export const SignupForm = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
  });


  async function handleSubmit(event){
    event.preventDefault();

    //const password = values.password;
    //const pwdHash = await bcrypt.hash(password, 10);
    // console.log(pwdHash)

    //const compare = await bcrypt.compare(values.password, pwdHash)

    // alert(`hash: ${pwdHash}`)
    // console.log(compare)
    //const data = await createUser(values.name, values.email, pwdHash);
    //console.log(data.user._id);
    //setCookies('uid', data.user._id, {maxAge: 60 * 60 * 24 * 7});
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

  return (
    <div 
      className='flex items-center justify-center h-screen px-4 sm:px-6 lg:px-8'
      style={{background: "linear-gradient(to bottom right,  #8636dd, #24d6ee)"}}
    >
      <div className='max-w-md w-full space-y-8'>
        <form onSubmit={handleSubmit} className='my-8 py-5 px-8 space-y-6 flex flex-col items-center justify-center border-2 border-blue-900 rounded-2xl bg-slate-50'>
          <h1 className='font-bold text-3xl m-'>Crea tu cuenta</h1>
          <div className='flex flex-col w-full'>
            <label className='py-1 w-full flex flex-col justify-between'>
              Name:
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
          </div>
          
          <input 
            type="submit" 
            value="Crear" 
            className='rounded-md px-4 text-xl w-full h-12 bg-indigo-500 hover:bg-indigo-600 cursor-pointer'
            style={{transition: ".5s"}}
          />
          <p>
            ¿Ya tienes una cuenta?
            <Link href="#">
              <a className='ml-2 text-blue-900'>Inicia sesión</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}