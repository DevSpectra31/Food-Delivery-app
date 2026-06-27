import React ,{useEffect, useState ,useContext} from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import {toast} from "react-toastify"
import { Navigate, useNavigate } from "react-router-dom";
const Add = () => {
    const url = "http://localhost:5000"
    const [image, setimage] = useState(null)
    const {token,admin} = useContext(StoreContext);
    
      const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const navigate=useNavigate()
   const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
    if (!token) {
    return <Navigate to="/login" replace />;
  }
  const onSubmitHandler = async(e)=>{
    e.preventDefault();
       console.log("Token from context:", token);
      // console.log("Admin from context:", admin);
    const formData = new FormData()
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
        const response = await axios.post('http://localhost:5000/api/v1/food/add', formData,{headers:{token}});
        console.log(response.data)
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setimage(false);
      toast.success(response.data.message);
      navigate("/list")
      console.log("food got uploaded")
    } else {
     if (response.data.message === "Not Authorized Login Again") {
    localStorage.removeItem("token");
    navigate("/login");
    return;
     }
      toast.error(response.data.message);
    }
  }
  return (
    <div className="add">
      <form className="add-form">

        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input type="file" id="image"  onChange={(e)=>setimage(e.target.files[0])}   hidden required />
        </div>

        <div className="add-product-name">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description">
          <p>Product Description</p>
          <textarea
          onChange={onChangeHandler}
          value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          />
        </div>

        <div className="add-category-price">

          <div className="add-category">
            <p>Product Category</p>
            <select name="category" 
            onChange={onChangeHandler}
            value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              required
              onChange={onChangeHandler}
              value={data.price}
            />
          </div>

        </div>

        <button onClick={onSubmitHandler} type="submit" className="add-btn">
          ADD
        </button>

      </form>
    </div>
  );
}
export default Add;