import React, { useState } from "react"; // Import necessary hooks from React
import axios from "axios"; // Import axios for making HTTP requests
import "./App.css"; // Import CSS for styling
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

const OrderForm = () => {
  // State to hold order details
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    deliveryAddress: "",
    orderItems: "",
  });

  // State to hold the response message after submission
  const [responseMessage, setResponseMessage] = useState("");

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the input event
    setOrderDetails({
      ...orderDetails, // Retain the current state
      [name]: value, // Update the specific field based on input
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send a POST request to the load balancer endpoint
      const response = await axios.post(
        "http://localhost:3000/assign-order",
        orderDetails
      );

      // Set the response message from the server
      setResponseMessage(response.data.message);
      console.log("Order successfully assigned:", response.data);
    } catch (error) {
      // Show a toast notification if there's an error
      toast.info("Delivery Partner is not available", {
        position: "top-center",
        autoClose: 2000, // Auto-close after 2 seconds
        hideProgressBar: true, // Hide the progress bar
        closeOnClick: true, // Allow closing the notification on click
        pauseOnHover: false, // Disable pause on hover
        draggable: true, // Allow dragging the notification
        progress: undefined, // No progress
        theme: "light", // Light theme for the notification
      });
      setResponseMessage("Failed to assign order."); // Update response message
    }
  };

  return (
    <>
      <div className="order-form-container">
        <h2>Order Assignment Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={orderDetails.customerName}
              onChange={handleInputChange}
              required // Mark field as required
            />
          </div>
          <div className="form-group">
            <label>Delivery Address:</label>
            <input
              type="text"
              name="deliveryAddress"
              value={orderDetails.deliveryAddress}
              onChange={handleInputChange}
              required // Mark field as required
            />
          </div>
          <div className="form-group">
            <label>Order Items:</label>
            <input
              name="orderItems"
              value={orderDetails.orderItems}
              onChange={handleInputChange}
              required // Mark field as required
            />
          </div>
          <button type="submit">Submit Order</button> {/* Submit button */}
        </form>
        {responseMessage && <p>{responseMessage}</p>}{" "}
        {/* Show response message if available */}
      </div>
      <ToastContainer /> {/* Toast notification container */}
    </>
  );
};

export default OrderForm; // Export the component for use in other parts of the application
