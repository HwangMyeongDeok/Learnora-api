export class ErrorHandler extends Error {
    statusCode: number;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number = 500, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default ErrorHandler;  