import React, { useContext } from 'react'
import "./Fooddisplay.css"
import { StoreContext } from '../../Context/StoreContext'
const Fooddisplay=() =>{
    const {food_list} = useContext(StoreContext)
  return (
    <div>
    <div className='food-display' id  ='food-display'>Fooddisplay</div>
    <h2>Top dishes near you</h2>
    <div className="food-display-list">
        {food_list.map((item,index)=>{
            return 
        })}
    </div>
    </div>
  )
}

export default Fooddisplay