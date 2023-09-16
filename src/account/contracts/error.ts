import { HttpStatus } from '@nestjs/common';

export const CommonErrors = {
  EMAIL_IS_EXIST: {
    error: 'EMAIL_IS_EXIST',
    httpStatus: HttpStatus.BAD_REQUEST,
    message: 'Email is already exists',
  },
  CANNOT_CREATE_NEW_SHOP: {
    error: 'CANNOT_CREATE_NEW_SHOP',
    httpStatus: HttpStatus.BAD_REQUEST,
    message: 'Email is already exists',
  },
  WRONG_LOGIN: {
    error: 'WRONG_LOGIN',
    httpStatus: HttpStatus.BAD_REQUEST,
    message: 'Incorrect email address or password',
  },
  AUTHENTICATION: {
    error: 'AUTHENTICATION',
    httpStatus: HttpStatus.FORBIDDEN,
    message: 'Authentication required',
  },
  OBJECT_NOT_FOUND: {
    error: 'OBJECT_NOT_FOUND',
    httpStatus: HttpStatus.FORBIDDEN,
    message: 'Object not  found',
  },
};
