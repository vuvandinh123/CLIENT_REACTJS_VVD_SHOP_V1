import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const getAllPromotion = async (params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_PROMOTIONS_BY_SHOP, {
        params,
        headers: {
            ...headers,
        }

    })
    return response.data

}
export const createPromotion = async (data, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.post(actionType.POST_ADD_PROMOTION_BY_SHOP, data, {
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const getAllProductOnPromotion = async (params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ALL_PRODUCT_ON_PROMOTION, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const changeStatusPromotion = async (data, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.patch(actionType.CHANGE_STATUS_PROMOTION, data, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const deletePromotion = async (data, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.patch(actionType.DELETE_PROMOTION, data, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const getCountStatusPromotion = async (id, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_COUNT_STATUS_PROMOTION, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const getPromotionById = async (id, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_PROMOTIONS_BY_SHOP + "/" + id, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const updatePromotion = async (id, data, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.put(actionType.GET_PROMOTIONS_BY_SHOP + "/" + id, data, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}