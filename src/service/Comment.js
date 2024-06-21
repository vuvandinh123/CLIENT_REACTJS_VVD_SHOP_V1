import verifyToken from "../api/AuthVerify"
import { axiosInstance } from "../api/axiosInstanceConfig"

export const getCommentByProductId = async (id) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get(`/comments/${id}`)
    return response.data
} 
export const getReviewStatistics = async (id) => {
    verifyToken(axiosInstance)
    const response = await axiosInstance.get(`/comments/statistics/${id}`)
    return response.data
}