import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, redirect, replace, useNavigate } from "react-router-dom";

const LoginPopup = () => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();
  const { setshowLogin } = useContext(StoreContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      let newUrl =
        currentState === "Login"
          ? `${url}api/v1/users/login`
          : `${url}api/v1/users/register`;

      const response = await axios.post(newUrl, data);

      console.log("Response:", response.data);
      console.log("token : ",response.data.token)

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      // ==================== REGISTER ====================
      if (currentState === "Sign Up") {
        toast.success("Account created successfully!");

        setData({
          name: "",
          email: "",
          password: "",
          role: "user",
        });

        setCurrentState("Login");
        return;
      }

      // ==================== LOGIN ====================
      localStorage.setItem("token", response.data.token);

      setToken(response.data.token);

      toast.success("User is logged in ");

      // Close popup
      if (setshowLogin) {
        setshowLogin(false);
      }

      // Redirect
      navigate("/")
      // Optional: refresh the page so Navbar/ProtectedRoute
      // immediately reads the token.
    ///  window.location.reload();

    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>

          <img
            src={assets.cross_icon}
            alt="Close"
            onClick={() => setshowLogin?.(false)}
          />
        </div>

        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          {currentState === "Sign Up" && (
            <select
              name="role"
              value={data.role}
              onChange={onChangeHandler}
              required
            >
              <option value="user">Register as User</option>
              <option value="admin">Register as Admin</option>
            </select>
          )}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit">
          {currentState === "Login" ? "Login" : "Create Account"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the Terms of Use & Privacy Policy.
          </p>
        </div>

        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}
export default LoginPopup;