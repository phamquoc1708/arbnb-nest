import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AppException, ErrorResponse } from './app.exception';
import * as _ from 'lodash';

@Catch()
export class AppExceptionFilter extends BaseExceptionFilter {
  private appLogger: LoggerService;
  constructor() {
    super();
    this.appLogger = new Logger();
  }

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>() as any;
    const { error, httpStatus, message, data } = this._parseError(exception);

    response.status(httpStatus).json({
      statusCode: httpStatus,
      error,
      message,
      data,
    });
  }

  private _parseError(exception: unknown): ErrorResponse {
    let error = '';
    let message = '';
    let data = {};
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    // Handle AppException
    if (exception instanceof AppException) {
      error = exception.error;
      httpStatus = exception.httpStatus;
      message = exception.message;
      data = exception.data;
    }

    // Handle HttpException
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const responseData = exception.getResponse();
      if (typeof responseData === 'string') {
        message = responseData;
      } else {
        message = 'internal error';
        if (typeof _.get(responseData, 'message') === 'string') {
          message = _.get(responseData, 'message');
        }
        if (typeof _.get(responseData, 'error') === 'string') {
          error = _.get(responseData, 'error');
        }
        data = responseData;
      }
    }

    // Handle general error
    if (message === '') {
      const error = exception as Error;
      message = error.message;
    }

    return {
      error,
      httpStatus,
      message,
      data,
    };
  }
}
