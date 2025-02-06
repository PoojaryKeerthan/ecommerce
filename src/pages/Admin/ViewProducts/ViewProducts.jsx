import React, { useEffect, useState } from 'react'
import { db, getData } from '../../../firebase/config'
import { collection, getDocs } from 'firebase/firestore';
import { deleteProduct } from '../../../firebase/config';
import { useNavigate } from 'react-router-dom';

//internal functions
import './ViewProducts.scss'
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../../components/loader/Loader';

function ViewProducts() {
  const navigate = useNavigate();  // Hook to navigate to different routes
  const [products, setProducts] = useState([]);  
  const [isLoading,setisLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const productList = [];
        
        for (let i = 0; i < querySnapshot.docs.length; i++) {
          const doc = querySnapshot.docs[i];
          const productData = doc.data();
          productList.push(productData);
        }

        // Update the products state
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, []);  // Only run this once when the component mounts

  const DeleteItem=async(productnames,imageurl)=>{
    try{
      setisLoading(true);
      const result = await deleteProduct(productnames,imageurl);
      if(result  == "Succesfull"){
      setisLoading(false);
      toast.success("Product deleted Successfully!");
       window.location.reload();
      }  // Reload the page to reflect the changes in the database
    }
    catch(error){
      setisLoading(false);
      toast.error(error.message)
    }
      
  }

  return (
    <>
    <ToastContainer />
    {isLoading && <Loader/>}
    <div className="product-list">
      <h1>Products</h1>
      <div className="card-container">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <img src={product.ProductImageURLl} alt={product.ProductName} className="card-img" />
              </div>
              <div className="card-body">
                <h2 className="card-title">{product.ProductName}</h2>
                <p className="card-category">Category: {product.Category}</p>
                <p className="card-price">Price: ₹{product.ProductPrice}</p>
                <p className="card-description">{product.ProductDescription}</p>
                <p className="card-company">Company: {product.ProductCompany}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={()=>{navigate(`/admin/editproducts/${product.ProductName}`)}}>Edit</button>
                <button className="btn btn-primary" onClick={()=>DeleteItem(product.ProductName,product.ProductImageURLl)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
    </>
  )
}

export default ViewProducts