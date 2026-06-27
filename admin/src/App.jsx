import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes , Route } from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Login from './Components/Login/Login'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Order from './Pages/Order/Order'
function App() {
  const url = "http://localhost:5000/"
  return (
    <div>
      <Navbar/>
      <hr/>
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path="/add" element ={<Add/>}/>
          <Route path="/list" element ={<List/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/order' element={<Order url={url}/>}/>
        </Routes>
      </div>
       <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />
    </div>
  )
}

export default App