import styles from './auth.module.scss';
import Loginimg from '..//../assets/login.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import Card from '../../components/card/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, createUserDocument } from '../../firebase/config';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");
    const [ConfirmPassword,setconfirmPassword]=useState("");
    const [isLoading,setisLoading]=useState(false);
    const navigate=useNavigate();

    const registerUser=async(e)=>{
       
            e.preventDefault();
            if(Password !== ConfirmPassword){
                toast.error("passwords do not match.")
            }
            setisLoading(true)
            createUserWithEmailAndPassword(auth, Email, Password)
             .then(async (userCredential) => {
                     const user = userCredential.user;
                     setisLoading(false);
                     await createUserDocument(user);
                     toast.success("Registration Successful!")
                     navigate('/login')

            })
             .catch((error) => {
                 toast.error(error.message)
                 console.log(error.message);
                 setisLoading(false)
             });

    }


  return (
    <>
     <ToastContainer />
     {isLoading && <Loader/>}
    <div><section className={` container ${styles.auth}`}>
    <div className={styles.img}>
        <img src={Loginimg} alt="Login" width="400px"/>
    </div>
    <Card>
    <div className={styles.form}>
        <h2>Register</h2>
        
        <form onSubmit={registerUser}>
    <input type="text" placeholder='Email' required
    onChange={(e)=>setEmail(e.target.value)}
    value={Email}
    />
    <input type="password" placeholder='password' required
    onChange={(e)=>setPassword(e.target.value)}
    value={Password}
    />
    <input type="password" placeholder='Confirm password' required
    onChange={(e)=>setconfirmPassword(e.target.value)}
    value={ConfirmPassword}
    />
    <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
        </form>
        <span className={styles.register}>
            <p>Already have an Account?</p>
            <Link to='/login'>Login</Link>
        </span>
    </div>
    </Card>
</section></div>
</>
  )
}

export default Register