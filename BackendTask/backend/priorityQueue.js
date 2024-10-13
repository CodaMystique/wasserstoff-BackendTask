import express from "express";
import { PriorityQueue } from "./queueManager.js"; // Import the priority queue manager

const app = express(); // Initialize an Express application
const port = 3000; // Set the server port

// Create a new instance of the PriorityQueue to manage incoming requests based on priority
const queue = new PriorityQueue();

// Middleware to parse JSON request bodies
app.use(express.json()); // Automatically parse incoming JSON data in requests

/**
 * Endpoint to handle incoming requests.
 * Requests must include data and a priority level in the request body.
 */
app.post("/request", (req, res) => {
  const { data, priority } = req.body; // Extract data and priority from the request body

  // Validate that the priority is a number
  if (typeof priority !== "number") {
    return res.status(400).json({ error: "Priority must be a number." });
  }

  // Add the incoming request to the priority queue
  queue.enqueue({ data, priority });
  console.log(`Request with priority ${priority} added to the queue.`);

  // Respond to the client that the request has been accepted for processing
  res.status(202).json({ message: "Request accepted for processing." });
});

/**
 * Function to process requests from the priority queue.
 * It dequeues the highest priority request and simulates processing it.
 */
const processRequests = () => {
  if (!queue.isEmpty()) {
    // Dequeue the highest priority request from the queue
    const { data, priority } = queue.dequeue();
    console.log(`Processing request with priority ${priority}:`, data);

    // Simulate processing time for the request (2 seconds delay)
    setTimeout(() => {
      console.log(`Finished processing request with priority ${priority}`);
    }, 2000);
  }
};

// Set up an interval to process requests every 3 seconds
setInterval(processRequests, 3000);

/**
 * Start the Express server on the specified port.
 * The server listens for incoming requests.
 */
app.listen(port, () => {
  console.log(`Load balancer listening at http://localhost:${port}`);
});
