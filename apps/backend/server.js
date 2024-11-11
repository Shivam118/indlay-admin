// server.js
const express = require("express");
const cors = require("cors");
const userController = require("./controllers/UserController");
const propertyController = require("./controllers/PropertyController");
const amenityController = require("./controllers/AmenityController");
const { verifyToken, isAdmin } = require("./middleware/auth");
const { PORT } = require("./utils/env");
const dotenv = require("dotenv");
dotenv.config();
require("./db/connection");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
// User routes
app.post("/api/user/register", userController.registerUser); // Register User
app.post("/api/user/login", userController.loginUser); // Login User
app.get("/api/user/users", verifyToken, isAdmin, userController.getAllUsers); // Only admins can access

// Property routes
app.post("/api/property/add", verifyToken, propertyController.createProperty); // Add Property

// Amenity routes
app.post("/api/amenity/add", verifyToken, isAdmin, amenityController.createAmenity); // Add Amenity

// app.post("/api/property/login", propertyController.loginUser);
// app.get(
//   "/api/property/users",
//   verifyToken,
//   isAdmin,
//   propertyController.getAllUsers
// ); // Only admins can access

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
