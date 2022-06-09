
export async function createUser(name, email, password) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    }),
  });
  const data = await res.json();
  // console.log(data);
  return data;
}

export async function getUsers() {
  const res = await fetch('/api/auth/signin', {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await res.json();
  return data;
}

export async function addProduct(dataProduct) {
  //console.log(JSON.stringify(dataProduct));
  try {
    const res = await fetch('/api/db/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataProduct),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Ha ocurrido un error => ', error.message);
  }
}