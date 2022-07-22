import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { getProductById } from '../../utils/operationsPrintful';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddIcon from '@mui/icons-material/Add';

import { saveCategory, saveCollection, getMyCollections } from '../../utils/operationsDB';

import { db } from "../../lib/firebase"
import { collection, getDocs, addDoc } from "firebase/firestore";


let collections = ["mars", "summer"]
let productStatus = ["Active", "Draft", "Inactive"]

const EditProduct = ({ productToEdit }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [collectionsArr] = useState([]);
  const [categoriesArr] = useState([]);
  const [dataText, setDataText] = useState("");
  const [textValue, setTextValue] = useState("");
  const [dialogCollection, setDialogCollections] = useState(false);
  const [dialogCategories, setDialogCategories] = useState(false);
  const [values, setValues] = useState({
    // ===== PRODUCT ===== //
    productName: '',
    productDescription: '',
    pType: '',
    collection: '',
    status: '',
    pid: 0,
    catg: '',
    categories: [],
    // ===== COLLECTIONS ===== //
    collTitle: '',
    collDescription: '',
    collParent: '',
    collSeoTitle: '',
    collSeoDescription: '',
    collSeoSlug: '',
    // ===== CATEGORIES ===== //
    catTitle: '',
    catDescription: '',
    catParent: '',
    catSeoTitle: '',
    catSeoDescription: '',
    catSeoSlug: '',
  });
  const changeHandler = e => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSaveProduct = async () => {
    if (
      values.productName !== '' && 
      values.productDescription !== '' &&
      values.collection !== '' &&
      values.status !== '' &&
      values.pType !== '' &&
      values.categories !== []
    ) {
      const data = {
        name: values.productName,
        description: values.productDescription,
        type: values.pType,
        pid: product.sync_product.id,
        collection: values.collection,
        status: values.status,
        categories: values.categories,
        thumbnail: product.sync_product.thumbnail_url,
        price: product.sync_variants[0].retail_price,
      }
      let productFound = false;
      try {
        const response = await getDocs(collection(db, 'products'));
        response.forEach((doc) => {
          if (doc.data().pid === product.sync_product.id) {
            console.log("Product found");
            productFound = true;
          }
        })
        if (!productFound) {
          console.log("To Save");
          try {
            const docRef = await addDoc(collection(db, 'products'), data);
            console.log(docRef);
            alert('Producto guardado')
          } catch (e) {
            alert('Error in save product')
          }
        }
      } catch (e) {
        alert('Error in getProducts')
      }
    } else {
      alert("Falta información")
    }
  }

  const handleOpenDialogColl = () => setDialogCollections(true);
  const handleCloseDialogColl = () => setDialogCollections(false);
  const handleSaveColl = async () => {
    const data = {
      title: values.collTitle,
      description: values.collDescription,
      parent: values.collParent,
      seo: {
        title: values.collSeoTitle,
        description: values.collSeoDescription,
        slug: values.collSeoSlug,
      },
    }
    const res = await saveCollection(data);
    if (res.code === "200"){
      alert("Coleccion agregada")
    } else {
      alert("Error, no se ha podido guardar la coleccion")
    }
  };
  const handleOpenDialogCat = () => setDialogCategories(true);
  const handleCloseDialogCat = () => setDialogCategories(false);
  const handleSaveCat = async () => {
    const data = {
      title: values.catTitle,
      description: values.catDescription,
      parent: values.catParent,
      seo: {
        title: values.catSeoTitle,
        description: values.catSeoDescription,
        slug: values.catSeoSlug,
      },
    }
    const res = await saveCategory(data);
    if (res.code === "200"){
      alert("Categoria agregada")
    } else {
      alert("Error, no se ha podido guardar la coleccion")
    }
  };

  const handleAddCategory = () => {
    const myCategory = values.catg;
    let found = false;
    values.categories.forEach(cat => {
      if (myCategory === cat) {
        found = true
      }
    })
    if (!found){
      values.categories.push(myCategory);
    }
    console.log(values.categories)
  }
  const handleReset = () => setTextValue("");


  

  useEffect(()=>{ 
    const getProduct = async () => {
      const myProduct = await getProductById(productToEdit);
      setProduct(myProduct.result);
      //console.log(product);
      try {
        const response = await getDocs(collection(db, 'collections'));
        response.forEach((doc) => {
          let found = false;
          collectionsArr.forEach(coll=>{
            if (coll.title === doc.data().title){
              found = true;
            }
          })
          if (!found){
            collectionsArr.push(doc.data()) 
          }
        })
      } catch (e) {
        alert('Error with get collections')
      }
      try {
        const response = await getDocs(collection(db, 'categs'));
        response.forEach((doc) => {
          let found = false;
          categoriesArr.forEach(cat=>{
            if (cat.title === doc.data().title){
              found = true;
            }
          })
          if (!found){
            categoriesArr.push(doc.data()) 
          }
        })
      } catch (e) {
        alert('Error with get categories')
      }
      setLoading(false); 
    } 
    getProduct();
    const printProduct = () => console.log(product);
    printProduct();
  }, [setProduct, product, productToEdit, collectionsArr, categoriesArr]);

  return (
    loading
    ?
    <Loading />
    :
    <div className='p-5'>
      <div>
        <Box
          sx={{
            '& > :not(style)': { width: '100%' },
            backgroundColor: "#fff",
            borderRadius: "15px",
            padding: "10px"
          }}
          noValidate
          autoComplete="off"
        >
          <div className='rounded-md'>
            {/* <MyEditor dataText={dataText} setDataText={setDataText} /> */}
            <div className='flex flex-col items-center w-full'>
              <h2>Product info</h2>
              <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
                <TextField 
                  fullWidth
                  id="productName" 
                  label="Product Name" 
                  variant="outlined" 
                  name='productName'
                  onChange={changeHandler}
                  value={values.productName}
                />
                <TextField
                  fullWidth
                  id="productDescription"
                  label="Product description"
                  multiline
                  rows={8}
                  onChange={changeHandler}
                  value={values.productDescription}
                  name='productDescription'
                />
                <TextField
                  fullWidth
                  id="pType"
                  label="Product type"
                  rows={8}
                  onChange={changeHandler}
                  value={values.pType}
                  name='pType'
                />

                <FormControl fullWidth>
                  <InputLabel id="product-collection">Collection</InputLabel>
                  <Select
                    id="Collection"
                    value={values.collection}
                    label="Collection"
                    name='collection'
                    onChange={changeHandler}
                  >
                    {
                      collectionsArr.map((coll, i) => (
                          <MenuItem 
                            key={i} 
                            value={coll.title}
                          >
                            {coll.title}
                          </MenuItem>
                        ))
                    }
                  </Select>
                </FormControl>
                <Button variant="outlined" onClick={handleOpenDialogColl}>
                  Add new collection
                </Button>
                <FormControl fullWidth>
                  <InputLabel id="product-status">Product Status</InputLabel>
                  <Select
                    id="demo-simple-select"
                    value={values.status}
                    label="status"
                    name='status'
                    onChange={changeHandler}
                  >
                    {
                      productStatus.map((stat, i) => (
                          <MenuItem 
                            key={i} 
                            value={stat}
                          >
                            {stat}
                          </MenuItem>
                        ))
                    }
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="product-status">Select category</InputLabel>
                  <Select
                    id="categories"
                    value={values.catg}
                    label="Categories"
                    name='catg'
                    onChange={changeHandler}
                  >
                    {
                      categoriesArr.map((cat, i) => (
                          <MenuItem 
                            key={i} 
                            value={cat.title}
                          >
                            {cat.title}
                          </MenuItem>
                        ))
                    }
                  </Select>
                </FormControl>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                  <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenDialogCat}>
                    Create new category
                  </Button>
                  <Button variant="outlined" endIcon={<PlaylistAddIcon />} onClick={handleAddCategory}>
                    Add caregory
                  </Button>
                </Stack>

                <Button sx={{ width: "150px" }} variant="outlined" onClick={handleSaveProduct}>Save product</Button>
              </Stack>

            </div>
          </div>

        </Box>
      </div>
      <div>
        <Dialog open={dialogCollection} onClose={handleCloseDialogColl}>
          <DialogTitle>Add new collection</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ width: '100%', padding: "8px" }}>
              <TextField 
                fullWidth
                id="collTitle" 
                label="Title" 
                variant="outlined" 
                name='collTitle'
                onChange={changeHandler}
                value={values.collTitle}
              />
              <TextField 
                fullWidth
                id="collDescription" 
                label="Description" 
                variant="outlined" 
                name='collDescription'
                onChange={changeHandler}
                value={values.collDescription}
              />
              <FormControl fullWidth>
                <InputLabel id="product-collection">Parent collection</InputLabel>
                <Select
                  id="collParent"
                  value={values.collParent}
                  label="Parent Collection"
                  name='collParent'
                  onChange={changeHandler}
                >
                  {collectionsArr.map((coll, i) => (
                      <MenuItem key={i} value={coll.title}>{coll.title}</MenuItem>
                    ))}
                </Select>
              </FormControl>
              <h1 className='text-2xl'>Search Engine Optimization Options</h1>
              <TextField 
                fullWidth
                id="collSeoTitle" 
                label="Title" 
                variant="outlined" 
                name='collSeoTitle'
                onChange={changeHandler}
                value={values.collSeoTitle}
              />
              <TextField 
                fullWidth
                id="collSeoDescription" 
                label="Description" 
                variant="outlined" 
                name='collSeoDescription'
                onChange={changeHandler}
                value={values.collSeoDescription}
              />
              <TextField 
                fullWidth
                id="collSeoSlug" 
                label="Path" 
                variant="outlined" 
                name='collSeoSlug'
                onChange={changeHandler}
                value={values.collSeoSlug}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogColl}>Cancel</Button>
            <Button onClick={handleSaveColl}>Save</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={dialogCategories} onClose={handleCloseDialogCat}>
          <DialogTitle>Add new category</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ width: '100%', padding: "8px" }}>
              <TextField 
                fullWidth
                id="catTitle" 
                label="Title" 
                variant="outlined" 
                name='catTitle'
                onChange={changeHandler}
                value={values.catTitle}
              />
              <TextField 
                fullWidth
                id="catDescription" 
                label="Description" 
                variant="outlined" 
                name='catDescription'
                onChange={changeHandler}
                value={values.catDescription}
              />
              <FormControl fullWidth>
                <InputLabel id="product-category">Parent category</InputLabel>
                <Select
                  id="catParent"
                  value={values.catParent}
                  label="Parent category"
                  name='catParent'
                  onChange={changeHandler}
                >
                  {categoriesArr.map((cat, i) => (
                      <MenuItem key={i} value={cat.title}>{cat.title}</MenuItem>
                    ))}
                </Select>
              </FormControl>
              <h1 className='text-2xl'>Search Engine Optimization Options</h1>
              <TextField 
                fullWidth
                id="catSeoTitle" 
                label="Title" 
                variant="outlined" 
                name='catSeoTitle'
                onChange={changeHandler}
                value={values.catSeoTitle}
              />
              <TextField 
                fullWidth
                id="catSeoDescription" 
                label="Description" 
                variant="outlined" 
                name='catSeoDescription'
                onChange={changeHandler}
                value={values.catSeoDescription}
              />
              <TextField 
                fullWidth
                id="catSeoSlug" 
                label="Path" 
                variant="outlined" 
                name='catSeoSlug'
                onChange={changeHandler}
                value={values.catSeoSlug}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogCat}>Cancel</Button>
            <Button onClick={handleSaveCat}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};



export default EditProduct;