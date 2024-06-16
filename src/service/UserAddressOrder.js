import verifyToken from "../api/AuthVerify"
import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const getAllUserAddressOrder = async () => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get(actionType.GET_ALL_USER_ADDRESS_ORDER)
    return response.data
}
export const createUserAddressOrder = async (data) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.post(actionType.GET_ALL_USER_ADDRESS_ORDER, data)
    return response.data
} 