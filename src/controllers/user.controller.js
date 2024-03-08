import asyncHandler from '../utils/asyncHandler.js'
// if we do not use asyncHadler, we will have to use try catch block in every controller function
// asyncHandler is a middleware that takes a function and returns a new function that takes the same parameters
// and calls the original function. It then wraps the call to the original function in a try/catch block and calls next with any error that occurs.
// If the original function returns a promise, it will call next with any error that occurs, otherwise it will call next with no arguments.
// This allows you to write async route handlers and middleware in a synchronous style, without having to catch any errors or call next yourself.
// It also allows you to use the same error handling logic for synchronous route handlers and middleware.
// It is a good practice to use asyncHandler in every controller function
// asyncHandler will catch any error that occurs in the controller function and pass it to the next middleware
// if the controller function returns a promise, asyncHandler will catch any error that occurs in the promise and pass it to the next middleware
// if the controller function does not return a promise, asyncHandler will pass the control to the next middleware
// asyncHandler will catch any error that occurs in the controller function and pass it to the next middleware

const registeredUser = asyncHandler(async (req, res) => {
  // your code here
  res.status(200).json({ message: "User Registered" });
});

export { registeredUser};