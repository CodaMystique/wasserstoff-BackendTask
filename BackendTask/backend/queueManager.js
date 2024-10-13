// A class representing a Priority Queue data structure
export class PriorityQueue {
  constructor() {
    // Initialize an empty array to hold the queue items
    this.queue = [];
  }

  /**
   * Adds an item to the priority queue.
   * @param {Object} item - The item to add, expected to have a 'priority' property.
   * The item is inserted in sorted order based on the 'priority' value, with lower values
   * indicating higher priority.
   */
  enqueue(item) {
    // Find the correct index to insert the item based on its priority
    const index = this.queue.findIndex((i) => i.priority > item.priority);

    if (index === -1) {
      // If no higher priority item is found, append the item to the end of the queue
      this.queue.push(item);
    } else {
      // Otherwise, insert the item at the correct position to maintain priority order
      this.queue.splice(index, 0, item);
    }
  }

  /**
   * Removes and returns the item with the highest priority (the one with the lowest 'priority' value).
   * @returns {Object} - The item with the highest priority.
   */
  dequeue() {
    return this.queue.shift(); // Remove and return the first item in the queue
  }

  /**
   * Checks if the priority queue is empty.
   * @returns {boolean} - Returns true if the queue is empty, false otherwise.
   */
  isEmpty() {
    return this.queue.length === 0; // Return true if there are no items in the queue
  }
}
