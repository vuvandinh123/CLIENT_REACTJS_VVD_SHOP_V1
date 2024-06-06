import verifyToken from "../api/AuthVerify"
import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const getCart = async () => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get(actionType.GET_CART)
    return response.data
} 
export const addToCart = async (data) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.post(actionType.GET_CART, data)
    return response.data
}
export const updateCart = async (data) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.post(actionType.GET_CART+"/update", data)
    return response.data
}
export const removeCartItem = async (id) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.delete(`${actionType.GET_CART}/${id}`)
    return response.data
}
export const changeQuantityCartItem = async (data) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.patch(actionType.GET_CART, data)
    return response.data
}