import {axiosInstance} from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

const getDiscountByProductId = async (id, params) => {
    const res = await axiosInstance.get(`${actionType.GET_DISCOUNT_PRODUCT_BY_ID}/${id}`, {
        params: {
            ...params
        }
    })
    return res.data
}
const addToDiscount = async (data) => {
    const res = await axiosInstance.post(actionType.POST_ADD_DISCOUNT, data)
    return res.data

}
export { getDiscountByProductId, addToDiscount }