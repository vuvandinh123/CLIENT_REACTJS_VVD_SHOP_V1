import verifyToken from "../api/AuthVerify"
import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const getFavourite = async () => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get(actionType.GET_FAVOURITE)
    return response.data
}
export const addToFavourite = async (data) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.post(actionType.GET_FAVOURITE, data)
    return response.data
}
export const removeFavouriteItem = async (id) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.delete(`${actionType.GET_FAVOURITE}/${id}`)
    return response.data
}
