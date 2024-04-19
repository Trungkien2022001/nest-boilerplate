export const APPLICATION = {
  CURRENT_PASS_NOT_MATCH: 'lang.APPLICATION.CURRENT_PASS_NOT_MATCH',
  TOKEN_NULL: 'You must submit a request to change your password !',
  PASS_NOT_MATCH: 'Incorrect password. Please re-enter the information !',
  PASSWORD_NOT_MATCH: 'The repeat password and password must match',
  PHONE_EXIST: 'The phone number already exist. Please try again !',
  PHONE_NOT_EXIST: 'This phone number does not exist !',
  EMAIL_NOT_EXIST: 'lang.APPLICATION.EMAIL_NOT_EXIST',
  HASH_IS_NOT_CORRECT: 'lang.APPLICATION.HASH_IS_NOT_CORRECT',
  VERIFY_FAIL: 'lang.APPLICATION.VERIFY_FAIL',
  HASH_NO_VERIFIED: 'lang.APPLICATION.HASH_NO_VERIFIED',
  HASH_EXPIRED: 'lang.APPLICATION.HASH_EXPIRED',
  HASH_EMPTY: 'lang.APPLICATION.HASH_EMPTY',
  UNAUTHORIZED: 'lang.APPLICATION.UNAUTHORIZED',
  SUCCESSFULLY: 'lang.APPLICATION.SUCCESSFULLY',
  ERROR_STREAMING_FILE: 'Error when streaming file',
  TOO_MANY_REQUEST: 'lang.APPLICATION.TOO_MANY_REQUEST',
};

export const EMAIL = {
  EMAIL_EXISTED: 'lang.EMAIL.EMAIL_EXISTED',
  EMAIL_NOT_EXIST: 'This email does not exist !',
  EMAIL_NOT_CHANGE: 'This is your current email, can not change',
  NOT_CONFIRM_CHANGE_EMAIL: 'Your email have requested change but does not verify, let check your email !',
  EMAIL_FORMAT_INCORRECT: 'lang.EMAIL.EMAIL_FORMAT_INCORRECT',
  EMAIL_NOT_EMPTY: 'lang.EMAIL.EMAIL_NOT_EMPTY',
  EMAIL_INCORRECT: 'lang.EMAIL.EMAIL_INCORRECT',
  EMAIL_MAX_LENGTH: 'lang.EMAIL.EMAIL_INCORRECT',
};

export const OTP = {
  OTP_TIMEOUT: 'lang.OTP.OTP_TIMEOUT',
  OTP_INVALID: 'lang.OTP.OTP_INVALID',
  WRONG_OTP_CODE: 'lang.OTP.WRONG_OTP_CODE',
  OVERTIME_SCAN_OTP: 'lang.OTP.OVERTIME_SCAN_OTP',
};

export const SYSTEM = {
  BAD_REQUEST: 'lang.SYSTEM.BAD_REQUEST',
  SOMETHING_WENT_WRONG: 'lang.SYSTEM.SOMETHING_WENT_WRONG',
};

export const AUTH_MESSAGES = {
  TOKEN_IS_INVALID: 'lang.AUTH.TOKEN_IS_INVALID',
  USER_HAS_BEEN_LOGGED_OUT: 'lang.AUTH_MESSAGES.USER_HAS_BEEN_LOGGED_OUT',
  USER_NOT_FOUND: 'lang.AUTH_MESSAGES.USER_NOT_FOUND',
  USER_IS_INACTIVE: 'lang.AUTH_MESSAGES.USER_IS_INACTIVE',
  SAME_PASSWORD: 'lang.AUTH.SAME_PASSWORD',
  INVALID_EMAIL_FORMAT: 'lang.AUTH.INVALID_EMAIL_FORMAT',
};

export const VALIDATION = {
  IS_NOT_EMPTY: (field: string): string => `${field} is required`,
  IS_ENUM: (field: string, enumObject: object): string =>
    `${field} need to be in [${Object.values(enumObject).join(', ')}]`,
  MAX_LENGTH: (field: string, maxLength: number): string =>
    `Max length of ${field} is ${maxLength}`,
  SPECIFIC_LENGTH: (field: string, length: number): string =>
    `Length of ${field} must be ${length}`,
  MIN: (field: string, min: number): string =>
    `Min value of ${field} is ${min}`,
  MAX: (field: string, max: number): string =>
    `Max value of ${field} is ${max}`,
  BETWEEN: (field: string, min: number, max: number): string =>
    `Value of ${field} must be between ${min} and ${max}`,
  INTEGER: (field: string): string => `${field} must be an integer`,
  GREAT_THAN_ZERO: (field: string): string => `${field} must be greater than 0`,
  CAN_NOT_BE_USED_TOGETHER: (field1: string, field2: string): string =>
    `[${field1}] and [${field2}] can not be used together`,
  IS_NUMBER: (field: string): string => `${field} must be a number`,
  IS_PHONE_NUMBER: (field: string): string => `${field} must be a valid phone number`,
  IS_STRING: (field: string): string => `${field} must be a string`,
  IS_STRING_AND_SPACE_ONLY: (field: string): string =>
    `${field} must be a string and space only`,
  IS_EMAIL: (field: string): string => `${field} must be a valid email`,
};