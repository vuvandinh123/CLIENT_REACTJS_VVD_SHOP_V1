import { axiosInstanceAdmin, axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const getAllBrandByCategory = async (id, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ALL_BRAND_BY_CATEGORY_BY_SHOP + id, {
        params,
        headers: {
            ...headers,
        }

    })
    return response.data
}
export const getAllBrand = async (params = {}, headers) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/brands", {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data
}
export const changeStatusBrand = async (data, params = {}, headers) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.patch("/brands/change-status/", data, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data
}
export const getCountStatusBrand = async (params = {}, headers) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/brands/count-status", {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data
}
export const deleteBrand = async (data, params = {}, headers) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.patch("/brands/del/", data, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data
}
export const createBrand = async (data, params = {}, headers) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.post("/brands", data, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data
}