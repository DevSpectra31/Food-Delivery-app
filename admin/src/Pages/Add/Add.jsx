import React ,{useEffect, useState} from "react";
import "./Add.css";
import { assets } from "../../assets/assets";

const Add = () => {
    const [image, setimage] = useState(null)
      const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
   const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  useEffect(()=>{
    console.log(data)
  },[data])
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

        <button type="submit" className="add-btn">
          ADD
        </button>

      </form>
    </div>
  );
};

export default Add;