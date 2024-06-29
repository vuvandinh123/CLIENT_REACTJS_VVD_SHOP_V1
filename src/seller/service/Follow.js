import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import verifyToken from "../../api/AuthVerify"

export const getFollowNewShop = async (params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get("/follows/shop", {
        params,
        headers: {
            ...headers,
        }

    })
    return response.data
}