import React, { useState, useEffect } from 'react'
import styles from './auth.module.scss';
import Loginimg from '..//../assets/login.png';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Card from '../../components/card/Card';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, getuserRole } from '../../firebase/config';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';




function Login() {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const loginuser = async (e) => {
    e.preventDefault();
    setisLoading(true)
    signInWithEmailAndPassword(auth, Email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setisLoading(false)
        const role = await getuserRole(user);

        if (role === 'user') {
          toast.success("Login Successful...")
          navigate('/')
        }
        else {
          toast.success("Login Successful...")
          navigate('/admin')
        }

      })
      .catch((error) => {
        toast.error(error.message)
        console.log(error.message);

        setisLoading(false)
      });
  }


  const provider = new GoogleAuthProvider();
  const signinwithgoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Login successfully..")
        navigate('/')
      }).catch((error) => {
        toast.error(error.message)
      });
  }

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={` container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={Loginimg} alt="Login" width="400px" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginuser}>
              <input type="Email" placeholder='Email' required
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
              />
              <input type="password" placeholder='password' required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button onClick={signinwithgoogle} className='--btn --btn-danger --btn-block'><FaGoogle color='#fff' />Login with Google</button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to='/register'>Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  )
}

export default Login