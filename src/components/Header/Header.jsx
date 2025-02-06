import React,{useEffect, useState} from 'react'
import styles from './Header.module.scss'
import { Link , NavLink} from 'react-router-dom'
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ACTIVE_USER,REMOVE_ACTIVE_USER, ADMIN_LOGIN, ADMIN_LOGOUT, selectisAdminLoggedin } from '../../redux/slice/authSlice'
import ShowOnLogin, { ShowOnLogout } from '../hiddenLinks/Hiddenlinks'




const logo = (
<div className={styles.logo}>
      <Link to="/">
      <h2>e<span>Shop</span>.</h2>
      </Link>
    </div>
)
const cart=(
<span className={styles.cart}>
        <Link to='/cart'>
        <FaShoppingCart size={20} />
        <p>0</p>
        </Link>
      </span>
)

const activelink=(({isActive})=>(isActive ? `${styles.active}`:""))


function Header() {
  const navigate=useNavigate()
  const [showMenu,setshowMenu]=useState(false);
  const [username,setusername]=useState("");
  const dispatch=useDispatch()
  //const a =useSelector(selectisAdminLoggedin)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      //console.log(a);
      
      if (user) {
        if(user.displayName===null){
          const u1 = user.email.slice(0, 8);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setusername(uName);
        }
        else{
        setusername(user.displayName)
        }
        dispatch(SET_ACTIVE_USER({
          email:user.email,
          username:user.displayName ? user.displayName : username,
          userId:user.uid, 
        }))
        try{
          if((user.email === 'keerthanpoojary221@gmail.com'))
          dispatch(ADMIN_LOGIN())
        }catch(e){
          console.log(e);  
        }

      } else {
        setusername("")
        dispatch(REMOVE_ACTIVE_USER());
        dispatch(ADMIN_LOGOUT());
      }
    });
  },[dispatch,username])


  const toggleMenu=()=>{
    setshowMenu(!showMenu);
  }

  const hideMenu=()=>{
    setshowMenu(false);
  }
  
  const logoutuser=()=>{
    
    signOut(auth).then(() => {
     toast.success("logged out successfully")
      navigate('/')
    }).catch((error) => {
      toast.error(error.message)
    });
  }


  return (
    <>
  <header>
    <div className={styles.header}>
    {logo}

    <nav className={showMenu ? `${styles["show-nav"]}`:`${styles["hide-nav"]}`}>

      <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`:`${styles["nav-wrapper"]}`} onClick={hideMenu}>
      </div>
      <ul onClick={hideMenu}>
        <li className={styles["logo-mobile"]}>
          {logo}
          <FaTimes size={22} color='#fff' onClick={hideMenu}/>
        </li>
        <li><NavLink to='/' className={activelink}>Home</NavLink></li>
        <li><NavLink to='/contact' className={activelink}>Contact Us</NavLink></li>
      </ul>
      <div className={styles["header-right"]} onClick={hideMenu}>
      <span className={styles.links}>
      <ShowOnLogout>
        <NavLink to='/login' className={activelink}>Login</NavLink>
        <NavLink to='/register'className={activelink}>Register</NavLink>
        </ShowOnLogout>
       
        <ShowOnLogin>
        <a href="#home" style={{color:"#ff7722"}}>
          <FaUserCircle size={16}/>
          Hi, {username}
        </a>
        <NavLink to='/order-history'className={activelink}>My orders</NavLink>
        <NavLink to='/' onClick={logoutuser}>Logout</NavLink>
        </ShowOnLogin>
      </span>
        {cart}
      </div>

     
    </nav>

    <div className={styles["menu-icon"]}>
    {cart}
    <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>

    </div>

    </div>
  </header>
  </>
  )
}

export default Header