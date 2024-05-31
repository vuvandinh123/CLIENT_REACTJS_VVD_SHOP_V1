import toast from "react-hot-toast"
import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const getAllBrandByCategory = async (id, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.get(actionType.GET_ALL_BRAND_BY_CATEGORY_BY_SHOP + id, {
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