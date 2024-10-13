import cluster from "cluster";
import os from "os";

// Get the number of CPU cores available on the system
const numCPUs = os.cpus().length;

// Check if the current process is the master process
if (cluster.isMaster) {
  console.log(`Master process is running with PID: ${process.pid}`);

  // Fork a worker process for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // Create a new worker process
  }

  /**
   * Event listener for when a worker process exits.
   * Automatically restart the worker process if it dies.
   */
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new worker...`);
    cluster.fork(); // Start a new worker to replace the one that exited
  });
} else {
  // If the process is a worker, import and run the server code
  import("./server.js"); // This loads and runs the actual server logic in the worker
}
