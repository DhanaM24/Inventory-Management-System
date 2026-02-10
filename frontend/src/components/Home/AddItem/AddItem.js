import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddItem() {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState({
    itemId: "",
    itemName: "",
    itemCategory: "",
    itemQuantity: "",
    itemDetails: "",
    itemImage: "",
  });

  const {
    itemId,
    itemName,
    itemCategory,
    itemQuantity,
    itemDetails,
    itemImage,
  } = inventory;

  const onInputChange = (e) => {
    if (e.target.name === "itemImage") {
      setInventory({ ...inventory, [e.target.name]: e.target.files[0] });
    } else {
      setInventory({ ...inventory, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", inventory.itemImage);
    let imageName = "";

    try {
      const response = await axios.post(
        "http://localhost:8080/inventory/itemImg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      imageName = response.data;
    } catch (error) {
      alert("Image upload failed");
      return;
    }

    const updatedInventory = { ...inventory, itemImage: imageName };
    await axios.post("http://localhost:8080/inventory", updatedInventory);

    alert("Item added successfully");
    window.location.reload();
    // OR: navigate("/");
  };

  return (
    <div>
      <p className="auth_topic">Add Item</p>

      <div className="from_vontiner">
        <div className="from_sub_coon">
          <form id="itemForm" onSubmit={(e) => onSubmit(e)}>
            <label htmlFor="itemId">Item ID:</label>
            <br />
            <input
              type="text"
              id="itemId"
              name="itemId" 
              value={itemId}
              oncchange={(e)=> onInputChange(e)} 
              required
            />
            <br />
            <br />

            <label htmlFor="itemName">Item Name:</label>
            <br />
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={itemName}
              oncchange={(e)=> onInputChange(e)} 
              required
            />
            <br />
            <br />

            <label htmlFor="itemCategory">Item Category:</label>
            <br />
            <select
              id="itemCategory"
              name="itemCategory"
              value={itemCategory}
              oncchange={(e)=> onInputChange(e)} 
              required
            >
              <option value="" disabled>
                Select Item Category
              </option>
              <option value="Apparel & Fashion">Apparel & Fashion</option>
              <option value="Electronics & Gadgets">
                Electronics & Gadgets
              </option>
              <option value="Health & Beauty">Health & Beauty</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Home & Furniture">Home & Furniture</option>
            </select>

            <br />
            <br />

            <label htmlFor="itemQuantity">Item Quantity:</label>
            <br />
            <input
              type="number"
              id="itemQuantity"
              name="itemQuantity"
              value={itemQuantity}
              oncchange={(e)=> onInputChange(e)} 
              required
            />
            <br />
            <br />

            <label htmlFor="itemDetails">ItemDetails:</label>
            <br />
            <input
              type="text"
              id="itemDetails"
              name="itemDetails"
              value={itemDetails}
              oncchange={(e)=> onInputChange(e)} 
              required
            />
            <br />
            <br />

            <label htmlFor="itemImage">Item Image:</label>
            <br />
            <input
              type="file"
              id="itemImage"
              name="itemImage"
              accept="image/*"
              onChange={onInputChange}
              required
            />
            <br />
            <br />

            <button type="submit" className="fom_btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
