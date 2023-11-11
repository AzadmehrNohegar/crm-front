/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "@/store/auth";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";

export interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  id?: string;
  slug?: string;
  body?: unknown;
}

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooMunknownRequests = 429,
  ValidationError = 406,
  InternalServerError = 500,
  ServerDown = 502,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

const injectToken = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  try {
    const token = useAuthStore.getState().access;
    if (token != "") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

export class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: import.meta.env.VITE_BASEURL,
      headers,
    });

    http.interceptors.request.use(injectToken, (error) => {
      return Promise.reject(error);
    });

    http.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        return this.handleError(error);
      }
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private handleUnauthorized = async (error: AxiosError) => {
    const { config } = error;
    if (useAuthStore.getState().refresh) {
      await useAuthStore.getState().refreshUser(
        () => {
          this.http.request(config as AxiosRequestConfig);
        },
        () => {
          toast("لطفا دوباره وارد شوید.", {
            type: "info",
          });
          useAuthStore.getState().logoutUser();
        }
      );
    }
  };

  private handleError(error: AxiosError) {
    const { response } = error;

    switch (response?.status) {
      case StatusCode.ServerDown: {
        toast("خطا در اتصال به سرور.", {
          type: "error",
        });
        break;
      }
      case StatusCode.NotFound: {
        toast("محتوای مورد نظر یافت نشد.", {
          type: "error",
        });
        break;
      }
      case StatusCode.InternalServerError: {
        toast("خطا در اتصال به سرور.", {
          type: "error",
        });
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.ValidationError: {
        toast("اعتبار کیف پول کافی نمی‌باشد.", {
          type: "error",
        });
        break;
      }
      case StatusCode.Unauthorized: {
        this.handleUnauthorized(error);
        break;
      }
      case StatusCode.TooMunknownRequests: {
        // Handle TooMunknownRequests
        break;
      }
    }

    return Promise.reject(error);
  }
}

export const http = new Http();
