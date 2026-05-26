import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'
const ExploreMenu=({category,setcategory})=>{
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore the menu</h1>
        <p>Choose from a diverse menu featuring a detectable array of dishes . Our mission to satisfy your cravings and elevate your dining experiences , one delicious meal of a time.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setcategory(prev=>prev === item.menu_name ?"ALL" : item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image}  />
                        <p >{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu