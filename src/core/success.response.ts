import { Response } from "express";

enum StatusCode {
  OK = 200,
  CREATED = 201,
}

enum ReasonStatusCode {
  OK = "Success",
  CREATED = "Created",
}

class SuccessResponse {
  message: string;
  status: number;
  metadata: any;
  options: any;

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
    options = {},
  }: {
    message?: string;
    statusCode?: number;
    reasonStatusCode?: string;
    metadata?: any;
    options?: any;
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
    this.options = options;
  }

 send(res: Response, headers: any = {}) { 
    if (Object.keys(headers).length > 0) {
        res.set(headers);
    }
    
    return res.status(this.status).json(this);
  }
}

export class OK extends SuccessResponse {
  constructor({ message, metadata, options = {} }: { message?: string; metadata?: any, options?: any }) {
    super({ message, metadata, options }); 
  }
}

export class CREATED extends SuccessResponse {
  constructor({
    message,
    metadata,
    options = {}, 
  }: {
    message?: string;
    metadata?: any;
    options?: any;
  }) {
    super({
      message,
      statusCode: StatusCode.CREATED,
      reasonStatusCode: ReasonStatusCode.CREATED,
      metadata,
      options, 
    });
  }
}