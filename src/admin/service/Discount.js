import toast from "react-hot-toast"
import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const createDiscount = async (data, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.post(actionType.POST_ADD_DISCOUNT_BY_SHOP, data, {
            headers: {
                ...headers,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
            window.location.href = "/admin/login";
        }
        toast.error("failed")
    }
}
export const updateDiscount = async (id, data, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.put(actionType.POST_ADD_DISCOUNT_BY_SHOP + "/" + id, data, {
            params,
            headers: {
                ...headers,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
            window.location.href = "/admin/login";
        }
        toast.error("failed")
    }
}
export const getAllDiscount = async (params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.get(actionType.POST_ADD_DISCOUNT_BY_SHOP, {
            params,
            headers: {
                ...headers,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
            window.location.href = "/admin/login";
        }
        toast.error("failed")
    }
}
export const getDiscountByIdOnShop = async (id, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.get(actionType.POST_ADD_DISCOUNT_BY_SHOP + "/" + id, {
            params,
            headers: {
                ...headers,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
            window.location.href = "/admin/login";
        }
        toast.error("failed")
    }
}
export const getCountStatusDiscountCode = async (id, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.get(actionType.GET_COUNT_STATUS_DISCOUNT, {
            params,
            headers: {
                ...headers,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
            window.location.href = "/admin/login";
        }
        toast.error("failed")
    }
}
export const changeStatusDiscount = async (data, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.patch(actionType.CHANGE_STATUS_DISCOUNT, data, {
            params,
            headers: {
                ...headers,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
            window.location.href = "/admin/login";
        }
        toast.error("failed")
    }
}
export const deleteDiscount = async (data, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.patch(actionType.DELETE_DISCOUNT, data, {
            params,
            headers: {
                ...headers,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
            window.location.href = "/admin/login";
        }
        toast.error("failed")
    }
}