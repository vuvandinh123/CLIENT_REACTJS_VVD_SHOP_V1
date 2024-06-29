import verifyToken from "../api/AuthVerify"
import { axiosInstance } from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

export const getAllUserAddressOrder = async () => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get(actionType.GET_ALL_USER_ADDRESS_ORDER)
    return response.data
}
export const createUserAddressOrder = async (data) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.post(actionType.GET_ALL_USER_ADDRESS_ORDER, data)
    return response.data
}
export const updateAddressOrderByUser = async (id, data) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.put("/address-user/" + id, data)
    return response.data
}
export const deleteAddressOrderByUser = async (id) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.delete("/address-user/" + id)
    return response.data
}

