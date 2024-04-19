import { EUserType } from '../enums';

export interface IUser {
  id: number;
  phone: string;
  name: string;
  email: string;
  userType: EUserType;
}

export interface IPagination {
  page?: number;
  limit?: number;
}
