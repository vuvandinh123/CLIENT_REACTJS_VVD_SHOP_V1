import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const getCountFollows = async (params = {}) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_COUNT_USER_FOLLOWS, {
        params,
    })
    return response.data
}