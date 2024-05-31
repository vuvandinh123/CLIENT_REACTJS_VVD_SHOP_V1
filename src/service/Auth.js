import verifyToken from '../api/AuthVerify';
import {axiosInstance} from '../api/axiosInstanceConfig';
import axios from 'axios';
import { actionType } from '../constants';
// Login API
const Login = async (data) => {
    try {
        const response = await axiosInstance.post(actionType.POST_LOGIN, data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
// Login Social API
const LoginSocial = async (data) => {
    try {
        const response = await axiosInstance.post(actionType.POST_LOGIN_SOCIAL, data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
// SingUp API
const SingUp = async (data) => {
    try {
        const response = await axiosInstance.post(actionType.POST_SIGNUP, data)
        return response.data
    } catch (error) {
        if (error.response.status === 400) {
            return {
                status: 400,
                message: "Email đã tồn tại"
            }
        }
    }
}
// send email API
const SendEmail = async (data) => {
    verifyToken(axiosInstance)
    try {
        const response = await axiosInstance.post(actionType.POST_SEND_EMAIL, data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
// send email API
const SendEmailForgetPassword = async (data) => {
    verifyToken(axiosInstance)
    try {
        const response = await axiosInstance.post(actionType.POST_SEND_EMAIL_FORGET_PASSWORD, data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
const RefreshTokenByUser = async (config) => {
    try {
        const response = await axiosInstance.post(actionType.POST_REFRESH_TOKEN, {}, {
            headers: {
                ...config
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
const VerifyForgetPassword = async (data) => {
    try {
        const response = await axiosInstance.post(actionType.POST_VERIFY_FORGET_PASSWORD, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
const ConfirmEmail = async (data) => {
    verifyToken(axiosInstance)
    try {
        const response = await axiosInstance.post(actionType.POST_VERIFY_EMAIL, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
const Logout = async () => {
    verifyToken(axiosInstance)
    try {
        const response = await axiosInstance.post(actionType.POST_LOGOUT)
        return response.data
    } catch (error) {
        console.log(error)
        return error;
    }
}
const getUserInfoGoogle = async (access_token) => {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`)
    return response.data
}
const getUser = async () => {
    verifyToken(axiosInstance)
    try {
        const response = await axiosInstance.get(actionType.GET_AUTH_USER)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default { Login, SingUp, SendEmail, ConfirmEmail, getUser, Logout, getUserInfoGoogle, LoginSocial ,RefreshTokenByUser,VerifyForgetPassword,SendEmailForgetPassword}
