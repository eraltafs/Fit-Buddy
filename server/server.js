const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Default route
app.get("/", (req, res) => {
  res.send({ msg: "Base API" });
});

// User-related routes
app.use("/user", userRouter);

// Start the server
app.listen(8000, () => {
  // Establish a database connection
  connection();
  console.log("Server is listening on port 8000");
});
