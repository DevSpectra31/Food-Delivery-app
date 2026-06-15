import React ,{useState}from 'react'
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import { Routes ,Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
function App() {
  const [showLogin, setshowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setshowLogin={setshowLogin}/>:<></>}
    <div className='app'>
      <Navbar setshowLogin={setshowLogin}/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/order' element={<PlaceOrder/>}/>
            <Route path='/login' element={<LoginPopup/>}/>
        </Routes>
    </div>
    <br></br>
    <br></br>
    <Footer/>
    </>
  )
}

export default App