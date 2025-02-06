import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getproductdata, updateproductdata } from '../../../firebase/config';
import Loader from '../../../components/loader/Loader';
import { toast, ToastContainer } from 'react-toastify';


function EditProduct() {
  const [category,setcategory]=useState("");
  const [ProductName,setProductName]=useState("");
  const [ProductPrice,setProductPrice]=useState("");
  const [ProductCompany,SetProductCompany]=useState("");
  const [Description,setDescription]=useState("");
  const [isLoading,setisLoading]=useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
   
        
        const getdata=async()=>{
           const  data = await getproductdata(id);
           setcategory(data.Category);
           setProductName(data.ProductName);
           setProductPrice(data.ProductPrice);
           SetProductCompany(data.ProductCompany);
           setDescription(data.ProductDescription);
        }
      
      useEffect(()=>{
        getdata();
      },[])  
   

    const handlesubmit=async(e)=>{
        e.preventDefault();
        setisLoading(true);
        const result = await updateproductdata(ProductName,ProductPrice,category,ProductCompany,Description);
        setisLoading(false);
        if(result === "Successfull"){
            toast.success("Product Updated Successfully!");
            navigate('/admin/viewproducts');
        }
        else{
            toast.error("Failed to update Product!");
        }
    }
  return (
    <>
    <ToastContainer />
    {isLoading && <Loader/>}
     <div className='form-container'>
        <h1>Add Product</h1>
        <form id="addProductForm" onSubmit={handlesubmit}>
            <label for="productName">Product Name:</label>
            <input type="text" id="productName" name="productName" required 
            value={ProductName}  
            onChange={(e)=>setProductName(e.target.value)}
            />
            <br />
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

            <button type="submit">Update Product</button>
            </form>
        </div>
        </>
  )
}

export default EditProduct