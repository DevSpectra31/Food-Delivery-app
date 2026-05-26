import React from 'react'
import { useState } from 'react'
import "./Home.css"
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import Fooddisplay from '../../Components/Fooddisplay/Fooddisplay'
function Home() {
  const [category, setcategory] = useState('all')
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setcategory={setcategory}/>
      <Fooddisplay category={category} setcategory={setcategory}/>
    </div>
  )
}

export default Home