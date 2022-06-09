
export async function getAllProducts() {
  const res = await fetch('/api/printful/products/getproducts', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  });
  const data = await res.json();
  return data;
}

export async function getProductById(id) {
  const res = await fetch(`/api/printful/products/getproducts/${id}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ id: id })
  });
  const data = await res.json();
  return data;
}

