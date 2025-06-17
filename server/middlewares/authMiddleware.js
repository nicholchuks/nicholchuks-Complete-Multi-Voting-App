const jwt = require("jsonwebtoken");
const HttpError = require("../models/ErrorModel");

const authMiddleware = (req, res, next) => {
  const Authorization = req.headers.Authorization || req.headers.authorization;
  // Check if Authorization header is present and starts with "Bearer"
  if (Authorization && Authorization.startsWith("Bearer")) {
    const token = Authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
      if (err) {
        return next(new HttpError("Unauthorized, Invalid token", 403));
      }
      req.user = info;
      next();
    });
  } else {
    return next(new HttpError("Unauthorized, no token", 403));
  }
};

module.exports = authMiddleware;
