import toast from "react-hot-toast"
import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const addSpec = async (data, params = {}, headers = {}) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.post(actionType.POST_ADD_SPEC, data, {
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