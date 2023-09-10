const { Router } = require("express");

const { authentication } = require("../middleware/authenticate");

const {userRegister,userLogin,userProfile,userCardioPost,userStrengthPost,userCardioGet,userStrengthGet,userImagePost,userCardioDelete,userStrengthDelete,} = require("../controller/user.controller");


const userRouter = Router();

// Public routes (no authentication required)
userRouter.post("/register", userRegister); // Register a new user
userRouter.post("/login", userLogin); // User login

// Protected routes (authentication required)
userRouter.use(authentication);

// User profile related routes
userRouter.get("/pro", userProfile); // Get user profile data
userRouter.post("/image", userImagePost); // Upload user profile image

// Cardio-related routes
userRouter.post("/cardio", userCardioPost); // Add a new cardio exercise entry
userRouter.get("/cardio", userCardioGet); // Get cardio exercises for the user
userRouter.delete("/cardio/:id", userCardioDelete); // Delete a cardio exercise entry by ID

// Strength-related routes
userRouter.post("/strength", userStrengthPost); // Add a new strength exercise entry
userRouter.get("/strength", userStrengthGet); // Get strength exercises for the user
userRouter.delete("/strength/:id", userStrengthDelete); // Delete a strength exercise entry by ID

module.exports = { userRouter };
