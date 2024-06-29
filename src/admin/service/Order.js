import { axiosInstance, axiosInstanceAdmin, axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const getOrderStats = async (params = {}) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ORDER_STATS, {
        params,
    })
    return response.data
}
export const getAllOrderShop = async (params = {}) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ORDER_ALL, {
        params,
    })
    return response.data
}
export const getOrderIdShop = async (id, params = {}) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ORDER_ALL + "/" + id, {
        params,
    })
    return response.data
}
export const patchStatusOrder = async (data) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.patch(actionType.PATCH_ORDER_STATUS, data)
    return response.data
}
export const getNewOrderPending = async (params = {}) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get("/orders/status/pending-new", {
        params,
    })
    return response.data
}
export const getAllOrderByAdmin = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const res = await axiosInstanceAdmin.get("/orders", { params })
    return res.data
}
export const getOrderIdAdmin = async (id, params = {}) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/orders" + "/" + id, {
        params,
    })
    return response.data
}
export const patchStatusOrderAdmin = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.patch("/orders/change-status", data)
    return response.data
}
export const getCountStatusOrderAdmin = async () => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/orders/count-status")
    return response.data
}
export const getCountStatusOrderShop = async () => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get("/orders/count-status")
    return response.data
}
export const getDashboradAdmin = async () => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/orders/stats")
    return response.data
}