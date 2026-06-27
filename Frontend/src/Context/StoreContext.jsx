/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:5000/"
  const addToCart = async (itemId) => {
    if (!token) {
      toast.error("Please login first");
     // navigate("/login")
    // redirect("/login")
      return;
    }

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }

    try {
      const response = await axios.post(
        `${url}api/v1/cart/add`,
        { itemId },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Item Added to Cart");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add item");
      console.log(error);
    }
  };

  const removeFromCart = async (itemId) => {
  setCartItems((prev) => ({
    ...prev,
    [itemId]: prev[itemId] - 1,
  }));

  try {
    const response = await axios.delete(
      url + "api/v1/cart/remove",
      {
        data: { itemId },
        headers: {
          token: token,
        },
      }
    );

    if (response.data.success) {
      toast.success("Item Removed from Cart");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === item
        );

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

const fetchFoodList = async () => {
  try {
    const response = await axios.get(
      url + "api/v1/food/list",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    console.log("Food Response:", response.data);

    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const loadCartData = async (userToken) => {
  try {
    const response = await axios.get(
      url + "api/v1/cart/list",
      {
        headers: {
          token: userToken,
        },
      }
    );

    console.log("Cart Response:", response.data);

    if (response.data.success) {
      setCartItems(response.data.cartData || {});
    } else {
      toast.error(response.data.message);
      setCartItems({});
    }
  } catch (error) {
    console.log(error);
    setCartItems({});
  }
};
const logout = () => {
  localStorage.removeItem("token");
  setToken("");
  setCartItems({});
};
useEffect(() => {
  fetchFoodList();
}, []);
useEffect(() => {
  if (token) {
    localStorage.setItem("token", token);
    loadCartData(token);
  } else {
    localStorage.removeItem("token");
    setCartItems({});
  }
}, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    loadCartData,
    token,
    setToken,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;