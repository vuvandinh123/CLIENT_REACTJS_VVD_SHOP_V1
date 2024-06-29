import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const createInventoryLog = async (data, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.post(actionType.POST_ADD_INVENTORY_LOGS, data, {
        params,
        headers: {
            ...headers,
        }

    })
    return response.data

}
export const getVariantFirebaseById = async (id) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(`/inventory-logs/variant-id/${id}`)
    return response.data
}
export const getAllInventoryLog = async (params) => {
    verifyToken(axiosInstanceShop)

    const response = await axiosInstanceShop.get(`/inventory-logs`, {
        params,
    })
    return response.data
}
export const getTotalAmountInventoryLog = async (params) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(`/inventory-logs/amount`, {
        params,
    })
    return response.data
}
export const getInventoryLogById = async (id, params) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(`/inventory-logs/${id}`, {
        params,
    })
    return response.data
}
export const getInventoryStats = async (params) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(`/inventory-logs/stats`, {
        params,
    })
    return response.data
}