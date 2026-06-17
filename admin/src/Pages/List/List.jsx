/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useId } from "react";
import { useContext } from "react";
import {assets} from "../../assets/assets.js"
import { StoreContext } from "../../Context/StoreContext";
import { data, useNavigate } from "react-router-dom";

const List = ({ url }) => {
  const navigate = useNavigate();
  const { token,admin } = useContext(StoreContext);
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get('http://localhost:5000/api/v1/food/list',{
      headers:{
        token : localStorage.getItem("token")
      }
    });
    console.log(response)
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
      navigate("/login")
    }
  };

  const removeFood = async (foodId) => {
  try {
    console.log("foodId :", foodId);
    console.log("token :", token);

    const response = await axios.delete(
      "http://localhost:5000/api/v1/food/remove",
      {
        data: {
          id: foodId,
        },
        headers: {
          token : localStorage.getItem("token")
        },
      }
    );

    console.log(response.data);

    if (response.data.success) {
      toast.success(response.data.message);
      fetchList();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/login");
    }
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`http://localhost:5000/images/${item.image}`}  alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                <img src={assets.delete_logo} alt="" width='20px' />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;