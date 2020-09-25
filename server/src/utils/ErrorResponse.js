class ErrorResponse extends Error {
  constructor(statusCode, message, status = null, details = null) {
    super();

    this.statusCode = statusCode;
    this.message = message;
    this.status = status;
    this.details = details;
  }
}

module.exports = ErrorResponse;
