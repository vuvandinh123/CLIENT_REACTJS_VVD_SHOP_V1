import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const getCategoryInShop = async (shopId) => {
    const response = await axiosInstance.get(actionType.GET_CATEGORY_CLIENT_SHOP + "/" + shopId)
    return response.data
}
export const getAllCategory = async () => {
    const response = await axiosInstance.get("/categories/all")
    return response.data
}
export const getAllCategoryShow = async () => {
    const response = await axiosInstance.get("/categories/")
    return response.data
}
export const getCategoryById = async (id) => {
    const response = await axiosInstance.get("/categories/" + id)
    return response.data
}
export const getCategoryFilter = async (id) => {
    const response = await axiosInstance.get("/categories/filter/" + id)
    return response.data
}