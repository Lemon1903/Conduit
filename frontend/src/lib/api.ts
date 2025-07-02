import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
let accessToken = "";
let refreshTokenPromise: Promise<string> | null = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log("Access Token: ", accessToken || "None");
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.error(error);

    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;

    if (!originalRequest) {
      console.log("No original request found.");
      return Promise.reject(error);
    }

    if (error.message === "Network Error") {
      toast.error("Network error: Please try again.");
    }

    // Handle 401 Unauthorized errors and token refresh logic (Silent Login)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If a refresh token promise is already in progress, wait for it to resolve.
      // This prevents multiple refresh requests from being sent at the same time.
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshAccessToken();
      }

      try {
        const newAccessToken = await refreshTokenPromise;
        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        toast.error("Session expired. Please log in again.");
        clearAccessToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        // Need to reset the promise to allow new refresh requests
        // after the current one is resolved or rejected.
        // otherwise, it will keep the same promise and 
        // will still use the old token which could be expired already.
        refreshTokenPromise = null;
      }
    }

    return Promise.reject(error);
  },
);

function setAccessToken(token: string) {
  accessToken = token;
}

function clearAccessToken() {
  accessToken = "";
  refreshTokenPromise = null;
  localStorage.removeItem("logged-user");
}

async function refreshAccessToken() {
  console.log("Refreshing token...");
  const response = await api.post("/users/refresh-token/");
  const newAccessToken = response.data.access_token;
  console.log("Token refreshed successfully.");
  return newAccessToken;
}

export { api, clearAccessToken, setAccessToken };

