import { axiosInstanceAdmin, axiosInstanceShop } from "../../api/axiosInstanceConfig"
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
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("categories/count-status", {
        params
    })
    return response.data
}
export const getAllCategoryAdminSelect = async () => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ALL_CATEGORY_SELECT_ADMIN)
    return response.data
}
export const createCategory = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.post("/categories", data)
    return response.data
}
export const updateCategory = async (id, data) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.put("/categories/" + "/" + id, data)
    return response.data
}

export const deleteCategory = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.patch("/categories/del", data)
    return response.data
}
export const changeStatusCategory = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.patch("/categories/change-status", data)
    return response.data
}
export const getAllCategoryWithParentId = async (id) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ALL_CATEGORY_WITH_PARENT_ID + "/" + id)
    return response.data
}
export const getALlCategoryByAdmin = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/categories", {
        params
    })
    return response.data
}
export const getAllCategoryAdminSelectParent = async () => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/categories/select-admin")
    return response.data
}
export const getCategoryById = async (id) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/categories/" + id)
    return response.data
}