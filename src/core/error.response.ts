
const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
};

const ReasonStatusCode = {
  FORBIDDEN: "Bad request error",
  CONFLICT: "Conflict error",
  UNAUTHORIZED: "Unauthorized error",
  NOT_FOUND: "Not found error",
  BAD_REQUEST: "Bad request error",
};

export class ErrorResponse extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.BAD_REQUEST,
    statusCode = StatusCode.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

export class AuthFailureError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.UNAUTHORIZED,
    statusCode = StatusCode.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.NOT_FOUND,
    statusCode = StatusCode.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.FORBIDDEN,
    statusCode = StatusCode.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}