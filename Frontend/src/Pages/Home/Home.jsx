import React from 'react'
import { useState } from 'react'
import "./Home.css"
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import Fooddisplay from '../../Components/Fooddisplay/Fooddisplay'
import AppDownload from '../../Components/AppDownload/AppDownload'
import { StoreContext } from '../../Context/StoreContext'
import { useContext } from 'react'
import ChatBot from '../../Components/Chatbot/Chatbot'
function Home() {
  const [category, setcategory] = useState('All')
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setcategory={setcategory}/>
      <Fooddisplay category={category} setcategory={setcategory}/>
      <AppDownload/>
      {/* <ChatBot/> */}
    </div>
  )
}

export default Home