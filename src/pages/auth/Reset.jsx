import styles from './auth.module.scss';
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import resetImg from '..//..//assets/forgot.png';
import React,{useState} from 'react';


import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';

function Reset() {
  const[Email,setEmail]=useState("");
  const[isLoading,setisLoading]=useState(false);

  const resetpassword=(e)=>{
      e.preventDefault()
      setisLoading(true);
      sendPasswordResetEmail(auth, Email)
      .then(() => {
       setisLoading(false)
       toast.success("Check email for Passwod recover link")
      })
      .catch((error) => {
        setisLoading(false)
        toast.error(error.message)
      })
  }


  return (
    <>
    <ToastContainer/>
    {isLoading && <Loader/>}
    <div><section className={` container ${styles.auth}`}>
    <div className={styles.img}>
        <img src={resetImg} alt="reset-password" width="400px"/>
    </div>
    <Card>
    <div className={styles.form}>
        <h2>Reset Password</h2>
        
        <form onSubmit={resetpassword}>
    <input type="Email" placeholder='Email' required
    onChange={(e)=>setEmail(e.target.value)}
    value={Email}
    />
    <button type="Submit" className='--btn --btn-primary --btn-block'>Reset Password</button>
    <div className={styles.links}>
            <p> <Link to="/login">- Login</Link></p>
            <p> <Link to="/register">- Register</Link></p>
            </div>
        </form>
    </div>
    </Card>
</section></div>
</>
  )
}

export default Reset