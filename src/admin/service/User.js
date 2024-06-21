import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import verifyToken from "../../api/AuthVerify"

export const getUserById = async (id, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get("/users/" + id, {
        headers: {
            ...headers,
        }

    })
    return response.data
}