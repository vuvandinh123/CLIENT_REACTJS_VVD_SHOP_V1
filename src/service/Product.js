import {axiosInstance} from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const getProductById = async (id) => {
    const res = await axiosInstance.get(`${actionType.GET_PRODUCTS_BY_ID}/${id}`)
    return res.data
}
export const getHotSaleProduct= async () => {
    const res = await axiosInstance.get(`${actionType.GET_PRODUCTS_HOT_DEALS}`)
    return res.data
}
export const getDailyProduct= async () => {
    const res = await axiosInstance.get(`${actionType.GET_PRODUCTS_TOP_SELLING}`)
    return res.data
}
