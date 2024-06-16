import verifyToken from "../api/AuthVerify"
import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const addOrderByUser = async (data) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.post(actionType.POST_ORDER, data)
    return response.data
}
export const addOrderWithMomo = async (data) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.post(actionType.POST_ORDER + "/momo", data)
    return response.data
} 
export const getOrderByUser = async (param) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get("/orders/user", { params: param })
    return response.data
} 