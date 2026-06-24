/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const url = "http://localhost:5000/";

  const addToCart = async (itemId) => {
    if (!token) {
      toast.error("Please login first");
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
        url + "api/v1/cart/add",
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
        { itemId },
        { headers: { token } }
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
      const response = await axios.get(url + "api/v1/food/list",{
        headers: { token: localStorage.getItem("token") },
      });
      console.log("food data : ",response.data)
      if(!response.data.success){
        toast.error(response.data.message);
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
      }
      if (response.data.success) {
        console.log("food found")
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.log("food not found")
      console.log(error);
    }
  };

<<<<<<< HEAD
  const loadCartData = async (token) => {
    try {
      const response = await axios.get(
        url + "api/v1/cart/list",
        {
          headers: {token: localStorage.getItem("token")},
        }
      );
      if(!response.data.success) {
        toast.error(response.data.message);
        localStorage.removeItem("token"); 
      }
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.log(error);
      setCartItems({});
    }
=======
  const loadCardData = async (token) => {
    const response = await axios.get(
      url + "api/v1/cart/list",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
>>>>>>> 45c5b1d5ed66d1ee0f86477feba51868c1f1f236
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;