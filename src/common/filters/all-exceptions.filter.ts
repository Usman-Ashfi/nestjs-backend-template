// src/common/filters/all-exceptions.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object =
      "Something went wrong. Please try again later.";

    // ----------------------Handle standard NestJS HTTP Exceptions (like from ValidationPipe)-----------------------//
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    // ---------------------Handle specific database driver errors----------------------------------//
    else if (exception.code) {
      switch (exception.code) {
        //! Unique violation (handles single and composite keys)
        case "23505":
          status = HttpStatus.CONFLICT; // ?409

          const detail = exception.detail as string;
          const fieldMatch = detail.match(/\((.*?)\)/);

          if (fieldMatch && fieldMatch[1]) {
            const field = fieldMatch[1];

            // *Check if it's a composite key
            if (field.includes(",")) {
              const fields = field.replace(/, /g, " and ");
              message = `The combination of values for the ${fields} fields must be unique.`;
            } else {
              const capitalizedField =
                field.charAt(0).toUpperCase() + field.slice(1);
              message = `${capitalizedField} is already taken. Please choose another.`;
            }
          } else {
            message = "This item already exists.";
          }
          break;


        //! Not-null violation (a required field was not sent)
        case "23502":
          status = HttpStatus.BAD_REQUEST; //? 400
          const columnName = exception.column as string;
          message = `The '${columnName}' field is required and cannot be empty.`;
          break;


        //! Foreign key violation (e.g., trying to delete a user that has posts)
        case "23503":
          status = HttpStatus.CONFLICT; //? 409
          message =
            "This action cannot be completed because this item is in use elsewhere.";
          break;

        //! Invalid format (e.g., sending text where a number is expected)
        case "22P02":
          status = HttpStatus.BAD_REQUEST; //? 400
          message =
            "One or more fields has an invalid format. Please check your input.";
          break;

        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = "A server error occurred. Please try again later.";
      }
    }

    const responseBody = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: typeof message === "object" ? (message as any).message : message,
    };

    response.status(status).json(responseBody);
  }
}
