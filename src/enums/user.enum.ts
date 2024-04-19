export enum EUserType {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  PUBLIC = 'PUBLIC',
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