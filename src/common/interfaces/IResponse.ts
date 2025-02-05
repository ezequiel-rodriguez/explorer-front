export interface IPagination {
  currentPage: number;
  total: number;
  totalPages: number;
}

export interface INavigation {
  next: number | string | undefined;
  prev: number | string | undefined;
}

export type DataResponse<T> = {
  data: T;
  pagination?: IPagination;
  navigation?: INavigation;
} | null;
