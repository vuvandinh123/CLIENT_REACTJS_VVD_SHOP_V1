import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const addSpec = async (data, params = {}, headers = {}) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.post(actionType.POST_ADD_SPEC, data, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}