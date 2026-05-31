import React ,{useState} from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
const  LoginPopup = ({setshowLogin})=>{
    const [currState, setcurrState] = useState('Sign Up')
  return (
    <div className="login-popup">
        <form  className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img  src={assets.cross_icon} onClick={()=>setshowLogin(false)} alit=""/>
            </div>
                 <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setcurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setcurrState("Login")}>Login here</span>
          </p>
        )}
        </form>
    </div>
  )
}

export default LoginPopup