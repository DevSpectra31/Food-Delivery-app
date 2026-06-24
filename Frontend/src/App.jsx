import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Verify from './Pages/Verify/Verify'

function App() {
  const [showLogin, setshowLogin] = useState(false)

  return (
    <>
      {showLogin && <LoginPopup setshowLogin={setshowLogin} />}

      <div className='app'>
        <Navbar setshowLogin={setshowLogin} />

        <Routes>

          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path='/cart'
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path='/order'
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />

          <Route path='/login' element={<LoginPopup />} />
           <Route
            path='/verify'
            element={
              <ProtectedRoute>
                <Verify/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App