import React, { useContext } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart,  removeFromCart, } = useContext(StoreContext)
<<<<<<< HEAD
  console.log("CartItems : ",cartItems)
=======

>>>>>>> 45c5b1d5ed66d1ee0f86477feba51868c1f1f236
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className="food-item-image" src={`http://localhost:5000/images/${image}`} alt={name} />
        {!cartItems[id]
          ? <img
              className='add'
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt="add"
            />
          : <div className="food-item-counter">
              <img
                onClick={() =>  removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="remove"
              />
              <p>{cartItems[id]}</p>  {/* ✅ Fixed */}
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="add"
              />
            </div>
        }
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem;