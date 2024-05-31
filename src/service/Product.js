import {axiosInstance} from "../api/axiosInstanceConfig"
import { actionType } from "../constants"

const getProductById = async (id) => {
    const res = await axiosInstance.get(`${actionType.GET_PRODUCTS_BY_ID}/${id}`)
    return res.data
}
export { getProductById }