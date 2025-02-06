import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';


//components
import {Header,Footer} from './components/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//pages
import {Home,Contact,Login,Register,Reset,Admin} from './pages/index';
import { useSelector } from 'react-redux';
import { selectisAdminLoggedin } from './redux/slice/authSlice';

//adminpages
import Addproducts from './pages/Admin/Addproducts/Addproducts';
import Vieworders from './pages/Admin/ViewOrders/Vieworders';
import ViewProducts from './pages/Admin/ViewProducts/ViewProducts'
import Adminhome from './pages/Admin/AdminHome/Adminhomeome';
import EditProduct from './pages/Admin/EditProducts/EditProduct';

function App() {
  const admin = useSelector(selectisAdminLoggedin);
  
  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
    <Header/>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/contact' element={<Contact/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/register' element={<Register/>}/>
           <Route path='/Reset' element={<Reset/>}/>


          <Route path='/admin' element={admin ? <Admin/> : <Login/>}>
          <Route index element={<Adminhome/>}/>
          <Route path='addproducts' element={<Addproducts/>}/>
          <Route path='vieworders' element={<Vieworders/>}/>
          <Route path='viewproducts' element={<ViewProducts/>}/>
          <Route path='editproducts/:id' element={<EditProduct/>}/>
          </Route>
        </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
