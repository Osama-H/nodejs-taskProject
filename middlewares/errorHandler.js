const { AppError } = require("../errors/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.code).json({
      error: err.msg,
    });
  }
  res.status(500).json({
    error: err.message,
  });
};

module.exports = errorHandler;
