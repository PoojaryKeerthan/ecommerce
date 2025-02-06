import React from 'react'
import styles from './Loader.module.scss'
import Loadergif from '../../assets/loader.gif'
import ReactDOM from 'react-dom'

function Loader() {
  return ReactDOM.createPortal (
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={Loadergif} alt="Loading.." />
        </div>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader