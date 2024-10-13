import express from "express"; // Import the Express framework

const app = express(); // Create a new Express application
const PORT = 3001; // Set the port for process 1 (this will represent one of the worker processes)

// Middleware to parse JSON request bodies
app.use(express.json()); // Automatically parse incoming request JSON data

/**
 * POST endpoint to handle order assignments.
 * It receives order details and the assigned delivery partner from the request body.
 */
app.post("/assign-order", (req, res) => {
  const { orderDetails, assignedPartner } = req.body; // Extract order details and assigned delivery partner from the request

  // Log the order details and the assigned delivery partner to the console
  console.log(`Order received on server ${PORT}:`, orderDetails);
  console.log(`Assigned delivery partner: ${assignedPartner.name}`);

  // Send a JSON response back to the client, indicating which server processed the request
  res.json({
    message: `Order processed by server ${PORT} and assigned to ${assignedPartner.name}`,
  });
});

// Start the Express backend server and listen on the specified port (3001)
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`); // Log that the server is up and running
});
