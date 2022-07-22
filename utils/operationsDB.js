import { db } from "../lib/firebase"
import { collection, doc, setDoc, getDocs, getDoc, updateDoc, addDoc } from "firebase/firestore";

//==================> CATEGORIES
export async function addCategory(category){
  const ref = doc(db, 'categories', `${category}`);
  const res = await setDoc(ref, {ids: []});
  console.log(res);
}
export async function getCategories(){
  const querySnapshot = await getDocs(collection(db, "categories"));
  return querySnapshot;
}
export async function getCategoryById(id){
  //const querySnapshot = await getDocs(collection(db, "categories"));
  const docRef = doc(db, "categories", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}
export async function addProductToCategoty(categoryId, pid){
  try {
    const ref = doc(db, 'categories', `${categoryId}`);
    const dataCat = await getCategories();
    dataCat.forEach(async (doc) => {
      const data = doc.data();
      const id = doc.id;
      let found = false;
      // console.log("category id => ", id, "categorySelected => ", categoryId.toString());
      if(id === categoryId.toString()){
        data.products.forEach((p) => {
          if (p == pid){
            found = true;
          }
        })
        if (!found){
          data.products.push(pid);
          const resp = await updateDoc(ref, { products: data.products });
          return resp;
        }
      }
    });
  } catch (error) {
    return error;
  }
}

export async function saveAllCategoriesOfPrintful(array){
  array.forEach(async (item) => {
    const ref = doc(db, 'categories', `${item.id}`);
    const res = await setDoc(ref, {
      id: item.id,
      title: item.title,
      image: item.image_url,
      products: [],
    });
    console.log(res);
  })
} 

//==================> NEW CATEGORIES
export async function saveCategory(newCategory) {
  try {
    const docRef = await addDoc(collection(db, 'categs'), newCategory);
    return {code: "200", res: docRef};
  } catch (e) {
    return {code: "999", error: e};
  }
}


//==================> NEW COLLECTIONS
export async function saveCollection(newCollection) {
  try {
    const docRef = await addDoc(collection(db, 'collections'), newCollection);
    return {code: "200", res: docRef};
  } catch (e) {
    return {code: "999", error: e};
  }
}
export async function getMyCollections() {
  try {
    const response = await getDocs(collection(db, 'collections'));
    const array = [];
    response.forEach((doc) => {
      array.push(doc.data())
    })
    return {code: "200", res: array};
  } catch (e) {
    return {code: "999", error: e.message};
  }
}

//==================> NEW Products
export async function saveProduct(newProduct) {
  try {
    const docRef = await addDoc(collection(db, 'products'), newProduct);
    return {code: "200", res: docRef};
  } catch (e) {
    return {code: "999", error: e};
  }
}

//==================> COLLECTIONS
export async function addCollection(collection){
  const ref = doc(db, 'collections', `${collection}`);
  const res = await setDoc(ref, {ids: []});
  console.log(res);
}
export async function getCollections(){
  const querySnapshot = await getDocs(collection(db, "collections"));
  return querySnapshot;
}
export async function getCollectionById(id){
  const docRef = doc(db, "collections", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap;
  } else {
    return null;
  }
}
export async function addProductToCollection(collection, pid){
  const dataColl = await getCollections();
  dataColl.forEach(async (docm) => {
    const data = docm.data();
    const title = data.title;
    if(title === collection){
      data.products.push(pid);
      const ref = doc(db, 'collections', `${docm.id}`);
      await updateDoc(ref, { products: data.products});
    }
  });
}

//==================> PRODUCTS
export async function addProduct(data){
  const ref = doc(db, 'products', `${data.id}`);
  const res = await setDoc(ref, data);
  console.log(res);
}
export async function getProducts(){
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot;
}
export async function getProductByIdFromDb(id){
  try {
    const docRef = doc(db, "products", id.toString());
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data();
    } 
  } catch (error) {
    console.log(error);
  }
}










