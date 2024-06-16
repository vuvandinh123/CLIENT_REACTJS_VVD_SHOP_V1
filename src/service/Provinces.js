import verifyToken from "../api/AuthVerify"
import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const getAllProvinces = async (id) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get(actionType.GET_PROVINCES + "/" + id)
    return response.data
} 

export const getProvinceByProducts = async (id) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get(actionType.GET_PROVINCES + "/filter/" + id)
    return response.data
} 