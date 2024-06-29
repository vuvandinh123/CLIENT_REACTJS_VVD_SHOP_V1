import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const getAllCategory = async () => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ALL_CATEGORY_SELECT_BY_SHOP)
    return response.data
}
export const getAllCategoryOnShop = async (params) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ALL_CATEGORY_BY_SHOP, {
        params
    })
    return response.data
}
export const getCategoryIdByShop = async (id) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_CATEGORY_BY_SHOP + "/" + id)
    return response.data
}
export const getCountStatusCategory = async (params) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ALL_CATEGORY_STATUS_COUNT_BY_SHOP, {
        params
    })
    return response.data
}
export const getAllCategoryAdminSelect = async () => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ALL_CATEGORY_SELECT_ADMIN)
    return response.data
}
export const createCategoryByShop = async (data) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.post(actionType.POST_ADD_CATEGORY_BY_SHOP, data)
    return response.data
}
export const updateCategoryByShop = async (id, data) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.put(actionType.PUT_UPDATE_CATEGORY_BY_SHOP + "/" + id, data)
    return response.data
}
export const changeStatusCategoryByShop = async (data) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.patch(actionType.PATCH_CHANGE_STATUS_CATEGORY_BY_SHOP, data)
    return response.data
}
export const deleteCategoryByShop = async (data) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.patch(actionType.DELETE_CATEGORY_BY_SHOP, data)
    return response.data
}
export const getAllCategoryWithParentId = async (id) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ALL_CATEGORY_WITH_PARENT_ID + "/" + id)
    return response.data
}