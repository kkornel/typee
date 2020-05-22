function errorHandler(error, req, res, next) {
  // const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // console.log('ErrorHandler:\n', error);

  const errorResponse = {
    success: false,
    message: error.message,
    // stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  };

  error.status ? (errorResponse.status = error.status) : error.status;

  error.details ? (errorResponse.details = error.details) : error.details;

  // console.log('ErrorHandler:\n', error, errorResponse);

  res.status(error.statusCode || 500).json(errorResponse);
  // res.status(statusCode).json({
  //   status: statusCode,
  //   message: error.message,
  //   stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  // });
}

module.exports = errorHandler;
