export interface IResponse {
  data?: any;
  success: boolean;
  code: number;
  message: string;
  errors?: string | string[];
}

export interface IPaginationRes<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
