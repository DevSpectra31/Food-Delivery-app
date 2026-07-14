/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/StoreContext";

const Order = ({ url }) => {
  const { token } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${url}api/v1/order/list`,
        {
          headers: {
            token: token,
          },
        }
      );

      console.log("Orders Response:", response.data);

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${url}api/v1/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message || "Status updated successfully");
        await fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Orders</h3>

      <div className="order-list">
        {orders.map((order) => {
          console.log("Order:", order);
          console.log("First Item:", order.items[0]);
          console.log("Image:", order.items[0]?.image);
          console.log(
            "Image URL:",
            `${url}images/${order.items[0]?.image}`
          );

          return (
            <div key={order._id} className="order-item">
              <img
                className="order-item-image"
                src={`${url}images/${order.items[0]?.image}`}
                alt={order.items[0]?.name}
              />

              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index !== order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>

                <p>
                  {order.address.firstName} {order.address.lastName}
                </p>

                <p>
                  {order.address.street}, {order.address.city}
                </p>

                <p>{order.address.phone}</p>
              </div>

              <p>₹{order.amount}</p>

              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;