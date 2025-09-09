import axios, { AxiosInstance } from "axios";

// 定義 API 回應格式的型別
export interface ApiResponse<T = unknown> {
    data: T;
    message: string;
    success: boolean;
    code?: number;
}

// 定義錯誤回應的型別
export interface ApiError {
    message: string;
    code?: number;
    errors?: Record<string, string[]>;
}

// Axios 基礎呼叫建設
export const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});