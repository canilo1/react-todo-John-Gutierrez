const errorControl = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((item) => item.message);

    return res.status(400).json({
      message: "Validation failed",
      errors
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format"
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate value entered"
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token"
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expired"
    });
  }

  return res.status(err.status || 500).json({
    message: err.message || "Something went wrong on the server"
  });
};

export default errorControl;