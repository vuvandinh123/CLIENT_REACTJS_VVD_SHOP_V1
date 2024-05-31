import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"
export const uploadImages = async (images) => {
    verifyToken(axiosInstanceShop)
    const formData = new FormData();
    images.forEach((file) => {
        formData.append("images", file);
    });
    const res = await axiosInstanceShop.post(actionType.POST_UPLOAD_IMAGE, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res.data;

}