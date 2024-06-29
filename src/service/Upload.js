import verifyToken from "../api/AuthVerify";
import { axiosInstance } from "../api/axiosInstanceConfig"
export const uploadImages = async (images) => {
    verifyToken(axiosInstance)
    const formData = new FormData();
    images.forEach((file) => {
        formData.append("images", file);
    });
    const res = await axiosInstance.post("/upload/multiple", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res.data;

}