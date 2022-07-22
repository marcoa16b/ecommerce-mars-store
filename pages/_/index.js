import React from 'react';
import PersistentDrawerLeft from '../../components/admin/Drawer';

const Admin = ({ data }) => {
  return (
    <div>
      <PersistentDrawerLeft data={data} />
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(`https://api.printful.com/sync/products`, {
    mode: 'no-cors',
    headers: {
      'authorization': 'Bearer ' + process.env.API_KEY_PRINTFUL,
    }
  });
  let data = await res.json();
 
  return {
    props: { 
      data
    }
  }
}

export default Admin;