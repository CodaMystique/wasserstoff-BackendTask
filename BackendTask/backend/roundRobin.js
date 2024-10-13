import express from "express";
import axios from "axios";
import cors from "cors";
import path from "path"; // Import path for static file serving
import { fileURLToPath } from "url"; // Import fileURLToPath for getting directory name

const __filename = fileURLToPath(import.meta.url); // Get the current file name
const __dirname = path.dirname(__filename); // Get the directory name from the file name

const app = express();
const PORT = 3000; // Port for the load balancer

// Middleware to enable CORS and parse JSON bodies
app.use(cors());
app.use(express.json());

// Serve static files from the frontend distribution folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// List of backend servers to which requests will be forwarded
const backendServers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];

// Delivery partners available in the system
const deliveryPartners = [
  { id: 1, name: "Delivery Partner A", status: "available" },
  { id: 2, name: "Delivery Partner B", status: "available" },
  { id: 3, name: "Delivery Partner C", status: "available" },
];

// Indices for round-robin load balancing
let currentServerIndex = 0; // To track the current backend server
let currentPartnerIndex = 0; // To track the current delivery partner

// Load balancer route to distribute requests and assign delivery partners
app.post("/assign-order", async (req, res) => {
  const orderDetails = req.body; // Extract order details from request body

  // Select the next backend server using round-robin
  const targetServer = backendServers[currentServerIndex];

  // Select the next available delivery partner using round-robin
  const assignedPartner = deliveryPartners[currentPartnerIndex];

  console.log(
    `Forwarding order to ${targetServer}. Current server index: ${currentServerIndex}`
  );

  // Check if the selected delivery partner is available
  if (assignedPartner.status === "available") {
    try {
      // Forward the order to the selected backend server
      const response = await axios.post(`${targetServer}/assign-order`, {
        orderDetails,
        assignedPartner,
      });

      // Mark the partner as busy after assignment
      assignedPartner.status = "busy";

      // Simulate delivery completion and make the partner available after some time
      setTimeout(() => {
        assignedPartner.status = "available"; // Set partner status back to available
        console.log(`${assignedPartner.name} is now available again`);
      }, 5000); // Simulate a 5-second delivery time

      // Send the response back to the client
      res.json({
        message: `Order assigned to ${assignedPartner.name}`,
        server: targetServer,
        partner: assignedPartner,
        serverResponse: response.data, // Include the response from the backend server
      });
    } catch (error) {
      console.error("Error forwarding request to backend:", error.message);
      res.status(500).json({ message: "Error assigning order" }); // Handle errors during request forwarding
    }
  } else {
    res.status(500).json({ message: "No available delivery partners" }); // Handle case where no partners are available
  }

  // Move to the next backend server and delivery partner for the next request
  currentServerIndex = (currentServerIndex + 1) % backendServers.length; // Increment server index for round-robin
  currentPartnerIndex = (currentPartnerIndex + 1) % deliveryPartners.length; // Increment partner index for round-robin
});

// Start the load balancer
app.listen(PORT, () => {
  console.log(`Load balancer running on http://localhost:${PORT}`); // Log the running status
});
