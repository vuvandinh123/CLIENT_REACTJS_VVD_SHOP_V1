import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
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