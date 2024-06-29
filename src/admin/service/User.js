import { axiosInstanceAdmin, axiosInstanceShop } from "../../api/axiosInstanceConfig"
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
export const getUserSignupNewAdmin = async () => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/users/user-new")
    return response.data
}
export const getAllUserByAdmin = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/users", {
        params
    })
    return response.data
}