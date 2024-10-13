import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS for styling notifications
import { ToastContainer } from "react-toastify"; // Import the ToastContainer component for notifications

// Render the application
ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer /> {/* Container for displaying toast notifications */}
  </React.StrictMode>,
  document.getElementById("root")
);
