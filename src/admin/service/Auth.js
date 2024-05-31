import verifyToken from "../../api/AuthVerify"
import { axiosInstance } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"

export const LoginAdmin = async (data) => {
    const response = await axiosInstance.post(actionType.POST_LOGIN_ADMIN, data)
    return response.data
}
export const Logout = async () => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.post(actionType.POST_LOGOUT_ADMIN)
    return response.data
}