import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DisplayItem() {
  const [Inventory, setInventory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const result = await axios.get("http://localhost:8080/inventory");
    setInventory(result.data);
  };

  return (
    <div>
      <h1>Inventory Item</h1>

      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Quantity</th>
            <th>Item Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.itemId}</td>

              <td>
                <img
                  src={`http://localhost:8080/uploads/${item.itemImage}`}
                  alt={item.itemName}
                  width="50"
                  height="50"
                />
              </td>

              <td>{item.itemName}</td>
              <td>{item.itemCategory}</td>
              <td>{item.itemQuantity}</td>
              <td>{item.itemDetails}</td>
            </tr>
          ))}
        </tbody>
        private String itemId; private String itemImage; private String
        itemName; private String itemCategory; private String itemQuantity;
        private String itemDetails;
      </table>
    </div>
  );
}

export default DisplayItem;
