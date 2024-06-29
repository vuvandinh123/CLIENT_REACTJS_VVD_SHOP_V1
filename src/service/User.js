import verifyToken from "../api/AuthVerify"
import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const getUserByEdit = async () => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get(actionType.GET_USER)
    return response.data
}
export const updateUser = async (data) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.put(actionType.GET_USER, data)
    return response.data
}
export const changePasswordByUser = async (data) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.patch("/user/change-password", data)
    return response.data
}