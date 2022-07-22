import React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Dashboard = () => {
  const [firValue, setFirValue] = React.useState(new Date());
  const [secValue, setSecValue] = React.useState(new Date());

  return (
    <div>
      <div className='w-full h-20 flex items-center pl-5 bg-White'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
      </div>
      <div className='p-3'>
        <p className='text-center'>Selecciona un rango de fecha para filtrar los datos</p>
        <div className='p-3 flex flex-col items-center md:flex-row md:justify-center'>
          <div className='m-3'>
            <DatePicker
              disableFuture
              label="Desde"
              openTo="year"
              views={['year', 'month', 'day']}
              value={firValue}
              onChange={(newValue) => {
                setFirValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className='m-3'>
            <DatePicker
              disableFuture
              label="Hasta"
              openTo="year"
              views={['year', 'month', 'day']}
              value={secValue}
              onChange={(newValue) => {
                setSecValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-wrap justify-center'>
        <div className='max-w-[350px] w-[350px] m-3 p-3 flex flex-col items-center h-40 bg-White shadow-lg'>
          <h2 className='text-xl mt-2'>Total de ventas netas</h2>
          <h1 className='text-2xl mt-4 font-bold'>$0.00</h1>
        </div>
        <div className='max-w-[350px] w-[350px] m-3 p-3 flex flex-col items-center h-40 bg-White shadow-lg'>
          <h2 className='text-xl mt-2'>Total de pedidos</h2>
          <h1 className='text-2xl mt-4 font-bold'>0</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;