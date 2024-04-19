export enum EUserType {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  PUBLIC = 'PUBLIC',
}

export enum ERoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum EUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  FROZEN = 'FROZEN',
}

export type IAuthReflexPermission = {
  specs: EUserType[];
  isOnly?: boolean;
};