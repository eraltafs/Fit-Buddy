const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to authenticate user requests
const authentication = (req, res, next) => {
  // Check if the token is present in headers or cookies
  const token =
    req.headers?.authorization?.split(" ")[1] || req.cookies?.token;

  if (token) {
    // Verify the token using the secret key from .env
    jwt.verify(token, process.env.jwtsec, function (err, decoded) {
      if (decoded) {
        // If token is valid, add user information to the request object
        req.body._id = decoded?._id;
        req.body.email = decoded?.email;
        next(); // Continue processing the request
      }
      if (err) {
        console.log(err);
        res.status(401).send({ msg: "Please login again", err: err.message });
      }
    });
  } else {
    // If no token is provided, send a response indicating the user needs to log in
    res.status(401).send({ msg: "Please login again" });
  }
};

module.exports = { authentication };
