import axios from "axios";
import Auth from "../service/Auth";
import { getCookieAuth, setCookieAuth } from "../utils";
import toast from "react-hot-toast";
const verifyToken = async (axiosInstance) => {
    // request verify
    axiosInstance.interceptors.request.use(
        (config) => {
            const { userId, accessToken } = getCookieAuth();
            config.headers['x-client-id'] = userId ?? '';
            config.headers['auth'] = accessToken ?? '';
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            console.log(error, "error");
            if (error.response.status === 401 && !originalRequest._retry) {
                console.log("refresh token");
                originalRequest._retry = true;
                // get cookie 
                const { userId, refreshToken } = getCookieAuth();
                try {
                    const response = await Auth.RefreshTokenByUser({ 'x-client-id': userId ?? "", 'x-refresh-token': refreshToken ?? "" })
                    setCookieAuth({
                        userId: response.data.user.id,
                        accessToken: response.data.token.accessToken,
                        refreshToken: response.data.token.refreshToken,
                        remember: true
                    })
                    originalRequest.headers.auth = `${response.data.token.accessToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    console.log(refreshError);
                    //  đẩy người dùng về trang đăng nhập
                    window.location.href = '/auth/login';
                }
            } else if (error.response.status === 500 && !originalRequest._retry) {
                toast.error("Lỗi 500 rồi sửa đi con!!")
            } else if (error.response.status === 404 && !originalRequest._retry) {
                toast.error("Lỗi 404 rồi sửa đi con!!")
            } else {
                toast.error(`Không ổn rồi lỗi ${error.response.status} `)
            }
            return Promise.reject(error);
        }
    )
}
export default verifyToken