import verifyToken from "../api/AuthVerify"
import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const getAllNations = async () => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get(actionType.GET_NATIONS)
    return response.data
} 