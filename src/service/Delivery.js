import verifyToken from "../api/AuthVerify"
import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const getDelivery = async () => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get(actionType.GET_DELIVERY)
    return response.data
} 