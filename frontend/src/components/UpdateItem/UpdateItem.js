import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateItem() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    itemCategory: "",
    itemQuantity: "",
    itemDetails: "",
    itemImage: null,
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/inventory/${id}`);
        const itemData = response.data;

        setFormData((prev) => ({
          ...prev,
          itemId: itemData.itemId || "",
          itemName: itemData.itemName || "",
          itemCategory: itemData.itemCategory || "",
          itemQuantity: itemData.itemQuantity ?? "",
          itemDetails: itemData.itemDetails || "",
          itemImage: null, // keep null unless user selects a new file
        }));
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    if (id) fetchItem();
  }, [id]);

  const onInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // If your backend expects JSON part named "itemDetails"
    data.append(
      "itemDetails",
      JSON.stringify({
        itemId: formData.itemId,
        itemName: formData.itemName,
        itemCategory: formData.itemCategory,
        itemQuantity: formData.itemQuantity,
        itemDetails: formData.itemDetails,
      })
    );

    // If user selected a new image, send it
    if (formData.itemImage) {
      data.append("file", formData.itemImage);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/inventory/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Item updated:", response.data);
      alert("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item!");
    }
  };

  return (
    <div>
      <h1>Update Inventory Item</h1>

      <form id="itemForm" onSubmit={onSubmit}>
        <label htmlFor="itemId">Item ID:</label>
        <br />
        <input
          type="text"
          id="itemId"
          name="itemId"
          value={formData.itemId}
          onChange={onInputChange}
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
          value={formData.itemName}
          onChange={onInputChange}
          required
        />
        <br />
        <br />

        <label htmlFor="itemCategory">Item Category:</label>
        <br />
        <select
          id="itemCategory"
          name="itemCategory"
          value={formData.itemCategory}
          onChange={onInputChange}
          required
        >
          <option value="" disabled>
            Select Item Category
          </option>
          <option value="Apparel & Fashion">Apparel & Fashion</option>
          <option value="Electronics & Gadgets">Electronics & Gadgets</option>
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
          value={formData.itemQuantity}
          onChange={onInputChange}
          required
        />
        <br />
        <br />

        <label htmlFor="itemDetails">Item Details:</label>
        <br />
        <input
          type="text"
          id="itemDetails"
          name="itemDetails"
          value={formData.itemDetails}
          onChange={onInputChange}
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
        />
        <br />
        <br />

        <button type="submit" className="fom_btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateItem;
