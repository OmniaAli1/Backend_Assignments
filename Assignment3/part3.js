// 1. What is the Node.js Event Loop? (0.5 Grade)
// --->The Event Loop is a mechanism that allows Node.js to perform non-blocking asynchronous operations by offloading tasks to the system and executing callbacks when tasks are completed.

// 2. What is Libuv and What Role Does It Play in Node.js? (0.5 Grade)
// --->Libuv is a C library that provides Node.js with asynchronous I/O operations, event loop implementation, thread pool, and handling of OS-level tasks.

// 3. How Does Node.js Handle Asynchronous Operations Under the Hood? (0.5 Grade)
// --->Node.js delegates asynchronous tasks to libuv or the OS. Once the task is completed, the callback is placed in the event queue and executed by the event loop.

// 4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? (0.5 Grade)
// --->Call Stack: Executes synchronous code.
// --->Event Queue: Holds callbacks waiting for execution.
// --->Event Loop: Moves callbacks from the queue to the stack.

// 5. What is the Node.js Thread Pool and How to Set the Thread Pool Size? (0.5 Grade)
// --->Node.js uses a thread pool (default size = 4) for heavy tasks like file system and crypto operations.
//  To change size:
// --->UV_THREADPOOL_SIZE=8 node app.js

// 6. How Does Node.js Handle Blocking and Non-Blocking Code Execution? (0.5 Grade)
// --->Blocking: Stops execution until task finishes.
// --->Non-Blocking: Allows other code to run while task is processing.
