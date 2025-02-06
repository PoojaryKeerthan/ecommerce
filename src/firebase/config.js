
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,doc,getDoc,setDoc, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
import { getStorage, uploadBytes,ref, getDownloadURL, deleteObject} from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";



const firebaseConfig = {
  apiKey: "AIzaSyDSmm9zk-_XDVE7r1ic1xaOlg79wB0XPJU",
  authDomain: "bookify-844ab.firebaseapp.com",
  projectId: "bookify-844ab",
  storageBucket: "bookify-844ab.appspot.com",
  messagingSenderId: "611791938691",
  appId: "1:611791938691:web:24caad2978cc8fbf58a7b6"
};



const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db=getFirestore(app);
 export const storage=getStorage(app);
 export const imgDB = getStorage(app);
 export default app;



 export const createUserDocument=async(user)=>{
  if (!user) return;
  const userRef = doc(db, "users",`${user.uid}`);
  const snapshot = await getDoc(userRef);
  
  if(snapshot.exists){
    const {email} = user;

    try {
      const userRef = doc(db, "users",user.uid);
      const docref = await setDoc(userRef,{
        email,
        role:"user"
      })
    } catch (error) {
      console.log('error',error);
    }
  }
}

export const addproductdata = async(ProductName,Productimage,ProductPrice,category,productCompany,description)=>{
    try {
      
      const imgs = ref(imgDB,`Imgs${v4()}`)
      const data = await uploadBytes(imgs,Productimage);
      var imgurl = await getDownloadURL(data.ref);
      
      const Prodref = doc(db, "Products",`${ProductName}`);
      const docref = await setDoc(Prodref,{
        Category:category,
        ProductCompany:productCompany,
        ProductDescription:description,
        ProductImageURLl:imgurl,
        ProductImageName:data.metadata.fullPath,
        ProductName:ProductName,
        ProductPrice:ProductPrice
      })
      return "succesfull"
    }
    catch (error) {
      return "error";
    }
    
}


export const deleteProduct = async(productname,imageurl)=>{
  try{
    const imgref  = doc(db,'Products',productname)
    const imgdata = await getDoc(imgref)
    console.log(imgdata.data().ProductImageName );
    await deleteDoc(doc(db, 'Products', `${productname}`));
   const desertRef = ref(storage, imgdata.data().ProductImageName);
    const res = deleteObject(desertRef)
    if(res){return "Succesfull"}
  }catch(e){
   return "Error"
  }
}
export const getproductdata =async(productname)=>{
    const reff = doc(db,'Products',productname)
    const proddata = await getDoc(reff);
    return proddata.data();
}

export const updateproductdata = async(productName,ProductPrice,category,productCompany,description)=>{
    try{const ref = doc(db,'Products',productName);
    const res = await  updateDoc(ref,{
        Category:category,
        ProductCompany:productCompany,
        ProductDescription:description,
        ProductName:productName,
        ProductPrice:ProductPrice
    })
  return "Successfull"
  }catch(err){
    console.log(err);
          return "Error"
          
          
    }
}

export const getuserRole=async(user)=>{
  const userRef = doc(db, "users",user.uid);
  const snapshot = await getDoc(userRef);
  return snapshot.data().role;
}