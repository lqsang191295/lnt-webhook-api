export class ApiResponse<T> {
  private status: 'success' | 'error';
  private message: string;
  private data?: T;
  private error?: {
    code: number;
    details: string;
  };
  private pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
  };

  constructor(
    status: 'success' | 'error',
    message: string,
    data?: T,
    error?: { code: number; details: string },
    pagination?: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      perPage: number;
    },
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
    this.pagination = pagination;
  }

  static success<T>(
    message: string,
    data?: T,
    pagination?: ApiResponse<T>['pagination'],
  ): ApiResponse<T> {
    return new ApiResponse<T>('success', message, data, undefined, pagination);
  }

  static error<T>(
    message: string,
    code: number,
    details: string,
  ): ApiResponse<T> {
    return new ApiResponse<T>('error', message, undefined, { code, details });
  }
}
