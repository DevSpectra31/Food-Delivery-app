import React ,{useState} from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
function LoginPopup() {
    const [currState, setcurrState] = useState('Sign Up')
  return (
    <div className="login-popup">
        <form  className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img src={assets.cross_icon}/>
            </div>
        </form>
    </div>
  )
}

export default LoginPopup