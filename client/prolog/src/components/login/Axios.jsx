import axios from "axios";
import { setCookie, getCookie, removeCookie } from "../../cookie/cookie";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://i10b112.p.ssafy.io",
});

// 요청 인터셉터 : 모든 요청에 JWT 토큰을 포함
api.interceptors.request.use(
  (config) => {
    // localStorage에서 accessToken을 불러오기
    // const accessToken = localStorage.getItem("accessToken");
    const accessToken = getCookie("access_token");
    console.log("토큰", accessToken);

    config.headers["Authorization"] = `Bearer ${accessToken || ""}`;
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    console.log("에러 1");
    return Promise.reject(error);
  }
);

// 응답 인터셉터 : 401 에러 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 반복 요청 방지
      // refreshToken을 사용하여 accessToken 재발급 로직

      try {
        const refreshToken = getCookie("refresh_token");

        // refreshToken으로 새로운 accessToken 요청
        const response = await axios.get(`${baseURL}/api/user/token/refresh`, {
          // refreshToken: refreshToken,
          header: {
            Authorization: refreshToken || "",
          },
        });
        originalRequest.headers["Authorization"] = `Bearer ${refreshToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("리프레시 토큰 만료", refreshError);
        alert("로그인이 만료되었습니다.");
        const navigate = useNavigate();
        navigate("/login");

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
