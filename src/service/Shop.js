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
export { getShopById, getIsFollowShop, toggleFollowShop }