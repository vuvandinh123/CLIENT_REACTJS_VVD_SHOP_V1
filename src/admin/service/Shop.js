import { axiosInstanceAdmin, axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const getShopByUserId = async (id) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_SHOP_BY_ID_USER_BY_SHOP + "/" + id)
    return response.data
}
export const getShopByUserIdAdmin = async (id) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/shops" + "/" + id)
    return response.data
}
export const createShop = async (data) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.post(actionType.POST_ADD_SHOP, data)
    return response.data
}
export const verifyEmailRegisterShop = async (data) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.post(actionType.POST_VERIFY_EMAIL_REGISTER_SHOP, data)
    return response.data
}
export const getShopId = async (id) => {
    verifyToken(axiosInstanceShop)
    const res = await axiosInstanceShop.get(`/shops/find/${id}`)
    return res.data
}
export const getAllShop = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const res = await axiosInstanceAdmin.get("/shops", { params })
    return res.data
}
export const changeStatusShop = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const res = await axiosInstanceAdmin.patch("/shops/change-status", data)
    return res.data
}
export const getCountStatusShop = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/shops/count-status", {
        params
    })
    return response.data
}
export const changePasswordShop = async (data) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.post("/shops/change-password", data)
    return response.data
}