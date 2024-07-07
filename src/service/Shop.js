import verifyToken from "../api/AuthVerify"
import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

const getShopById = async (id) => {
    const res = await axiosInstance.get(`${actionType.GET_SHOP_BY_ID}/${id}`)
    return res.data
}
const getIsFollowShop = async (id) => {
    const res = await axiosInstance.get(`${actionType.GET_IS_FOLLOW_SHOP}/${id}`)
    return res.data
}
const toggleFollowShop = async (id) => {
    const res = await axiosInstance.patch(`${actionType.PATCH_TOGGLE_FOLLOW_SHOP}/${id}`)
    return res.data
}
export const getShopChatsByIds = async (data) => {
    verifyToken(axiosInstance)
    const res = await axiosInstance.post(`/shops/chats`, data)
    return res.data
}
export const getShopByIdChat = async (id) => {
    verifyToken(axiosInstance)
    const res = await axiosInstance.get(`/shops/find-id/${id}`)
    return res.data
}
export { getShopById, getIsFollowShop, toggleFollowShop }