import toast from "react-hot-toast"
import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"
import axios from "axios"

export const getProvider = async () => {
    const response = await axios.get("https://res.cloudinary.com/dnvr7lidh/raw/upload/v1716973986/json/mveyr0hejke4kajnj1tj.json")
    return response.data
}