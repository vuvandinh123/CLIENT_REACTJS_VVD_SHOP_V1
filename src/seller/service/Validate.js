import { axiosInstance } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"

export const checkEmailExits = async (email) => {
    const res = await axiosInstance.post(actionType.POST_CHECK_EMAIL_EXITS, { email })
    return res.data;
}