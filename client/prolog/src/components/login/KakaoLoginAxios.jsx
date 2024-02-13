import axios from "axios";

const kakaoApi = axios.create({
  baseURL: "http://localhost:8080",
});

// 요청 인터셉터 : 모든 요청에 JWT 토큰을 포함
kakaoApi.interceptors.request.use(
  (config) => {
    // localStorage에서 accessToken을 불러오기
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 : 401 에러 처리
kakaoApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 반복 요청 방지
      // refreshToken을 사용하여 accessToken 재발급 로직

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        // refreshToken으로 새로운 accessToken 요청
        const response = await axios.post(`${kakaoApi.defaults.baseURL}/refresh`, {
          refreshToken: refreshToken,
        });
        const { accessToken: newAccessToken } = response.data;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return kakaoApi(originalRequest);
      } catch (refreshError) {
        console.log("리프레시 토큰 만료", refreshError);
        window.location.href = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=${window.location.href}&mode=login`;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default kakaoApi;
