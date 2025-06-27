import axios from "axios";

// import { getAccessToken, getRefreshToken } from '@/utils/functions'

const controller = new AbortController();
// const accessToken = getAccessToken()
// const refreshToken = getRefreshToken()

const AxiosLib = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  signal: controller.signal,
});

// AxiosLib.interceptors.request.use(
// (config) => {
// const accessToken = getAccessToken();
// if (accessToken) {
// config.headers['Authorization'] = `Bearer ${accessToken}`
// config.headers['refreshtoken'] = getRefreshToken()
// config.headers['time-zone'] = Intl.DateTimeFormat().resolvedOptions().timeZone
// config.headers['event-time'] = new Date().toISOString()
//config.headers['ngrok-skip-browser-warning'] = true
// }
//   return config;
// },
// (error) => Promise.reject(error)
// );

AxiosLib.interceptors.response.use(
  (response) => {
    // Edit response config if needed
    return response;
  },
  (error) => {
    if (error?.response?.data?.message.includes("'exp' claim expired")) {
      // Logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    if (error.response && error.response.status === 401) {
      // Unauthorized error, log out the user
    }
    return Promise.reject(error);
  }
);

export default AxiosLib;
