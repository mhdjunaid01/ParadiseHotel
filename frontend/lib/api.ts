import axios, { AxiosError, AxiosResponse } from 'axios';
import { Booking, BookingFormData, PaginatedResponse, ApiResponse } from '@/types/booking';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export interface ApiError {
  message: string;
  errors?: Array<{ path: string; message: string }>;
  statusCode?: number;
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const { data, status } = error.response;
      const apiError: ApiError = {
        message: data?.message || 'An error occurred',
        errors: data?.errors,
        statusCode: status,
      };
      return Promise.reject(apiError);
    }
    
    if (error.request) {
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        statusCode: 0,
      } as ApiError);
    }
    
    return Promise.reject({
      message: error.message || 'An unexpected error occurred',
      statusCode: 500,
    } as ApiError);
  }
);

export const bookingApi = {
  createBooking: async (data: BookingFormData): Promise<ApiResponse<Booking>> => {
    const response = await api.post<ApiResponse<Booking>>('/bookings', data);
    return response.data;
  },

  getBookings: async (page: number = 1, limit: number = 10): Promise<ApiResponse<PaginatedResponse<Booking>>> => {
    const response = await api.get<ApiResponse<PaginatedResponse<Booking>>>('/bookings', {
      params: { page, limit },
    });
    return response.data;
  },
};

export default api;
