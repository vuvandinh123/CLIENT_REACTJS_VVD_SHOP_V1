import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const getShopByUserId = async (id) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_SHOP_BY_ID_USER_BY_SHOP + "/" + id)
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