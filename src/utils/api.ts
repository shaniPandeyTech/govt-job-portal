import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const successResponse = <T>(
  data: T,
  message?: string,
  statusCode: number = 200
): NextResponse => {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };

  if (message) {
    response.message = message;
  }

  return NextResponse.json(response, { status: statusCode });
};

export const errorResponse = (
  message: string,
  statusCode: number = 500,
  error?: any
): NextResponse => {
  const response: ApiResponse = {
    success: false,
    error: message,
  };

  if (process.env.NODE_ENV === 'development' && error) {
    console.error('API Error:', error);
  }

  return NextResponse.json(response, { status: statusCode });
};

export const paginatedResponse = <T>(
  data: T[],
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  },
  message?: string
): NextResponse => {
  const response: ApiResponse<T[]> = {
    success: true,
    data,
    pagination,
  };

  if (message) {
    response.message = message;
  }

  return NextResponse.json(response);
};

export const handleApiError = (error: any): NextResponse => {
  if (error instanceof ApiError) {
    return errorResponse(error.message, error.statusCode);
  }

  if (error.name === 'ValidationError') {
    return errorResponse('Validation error', 400, error);
  }

  if (error.name === 'CastError') {
    return errorResponse('Invalid ID format', 400, error);
  }

  if (error.code === 11000) {
    return errorResponse('Duplicate entry', 409, error);
  }

  console.error('Unhandled API Error:', error);
  return errorResponse('Internal server error', 500, error);
}; 