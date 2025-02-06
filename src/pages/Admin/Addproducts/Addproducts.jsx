import React, { useState } from 'react'
import './Addproduct.scss'
import { addproductdata } from '../../../firebase/config';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../../components/loader/Loader';

function Addproducts() {
  const [category,setcategory]=useState("");
  const [ProductName,setProductName]=useState("");
  const [ProductImage,setProductImage]=useState("");
  const [ProductPrice,setProductPrice]=useState("");
  const [ProductCompany,SetProductCompany]=useState("");
  const [Description,setDescription]=useState("");
  const [isLoading,setisLoading]=useState(false);

  const clearfields=()=>{
    setcategory("");
    setProductName("");
    setProductImage("");
    setProductPrice("");
    SetProductCompany("");
    setDescription("");
  }
  
  const AddProduct=async(e)=>{
    e.preventDefault();
    setisLoading(true);
    const result = await addproductdata(ProductName,ProductImage,ProductPrice,category,ProductCompany,Description);
     setisLoading(false);
     if(result == "succesfull"){
     toast.success("Product Added Successfully!");
     clearfields();
    }
    else{
     toast.error("Failed to add Product!");
    }
  }

 
  return (
    <>
    <ToastContainer />
    {isLoading && <Loader/>}
     <div className='form-container'>
        <h1>Add Product</h1>
        <form id="addProductForm" onSubmit={AddProduct}>
            <label for="productName">Product Name:</label>
            <input type="text" id="productName" name="productName" required 
            value={ProductName}  
            onChange={(e)=>setProductName(e.target.value)}
            />

            <label for="productImage">Product Image:</label>
            <input type="file" id="ProductImage" name="ProductImage" required 
            onChange={(e)=>setProductImage(e.target.files[0])}
            />
            <br /><br />
            <label for="productPrice">Product Price:</label>
            <input type="number" id="productPrice" name="productPrice" step="0.0" required
            value={ProductPrice}  
            onChange={(e)=>setProductPrice(e.target.value)}
            />

            <label for="Category" >Category:</label>
            <select id="Category" name="Category" required 
            value={category}  
             onChange={(e)=>setcategory(e.target.value)}>
                <option value="" disabled selected>Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Shoes">Shoes</option>
            </select >

            <label for="brand">Product Company/Brand:</label>
            <input type="text" id="brand" name="brand" required 
            value={ProductCompany}  
            onChange={(e)=>SetProductCompany(e.target.value)}
            />

            <label for="description">Product Description:</label>
            <textarea id="description" name="description" rows="4" required
            value={Description}  
            onChange={(e)=>setDescription(e.target.value)}
            ></textarea>

            <button type="submit">Add Product</button>
            </form>
        </div>
        </>
  )
}

export default Addproducts