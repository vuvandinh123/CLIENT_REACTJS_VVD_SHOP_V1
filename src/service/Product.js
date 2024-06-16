import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const getProductById = async (id) => {
    const res = await axiosInstance.get(`${actionType.GET_PRODUCTS_BY_ID}/${id}`)
    return res.data
}
export const getHotSaleProduct = async () => {
    const res = await axiosInstance.get(`${actionType.GET_PRODUCTS_HOT_DEALS}`)
    return res.data
}
export const getDailyProduct = async (params) => {
    const res = await axiosInstance.get(`${actionType.GET_PRODUCTS_TOP_SELLING}`, { params })
    return res.data
}
export const getHotCategory = async (params) => {
    const res = await axiosInstance.get(`/products/hot_category`, { params })
    return res.data
}
export const getProductRandom = async (params = {}) => {
    const res = await axiosInstance.get(`/products/randoms`, { params })
    return res.data
}
export const getProductUserShop = async (shopId, params) => {
    const res = await axiosInstance.get(`${actionType.GET_PRODUCTS_SHOP}/${shopId}`, { params })
    return res.data
}

export const getProductByCategory = async (categoryId, params) => {
    const res = await axiosInstance.get(`/products/category/${categoryId}`, { params })
    return res.data
}
export const getSearchProducts = async (params = {}) => {
    const res = await axiosInstance.get(`/products/search`, { params })
    return res.data
}