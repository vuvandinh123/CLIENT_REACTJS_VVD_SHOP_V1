import toast from "react-hot-toast"
import { axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const getAllProduct = async (params, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.get(actionType.GET_ALL_PRODUCT_BY_SHOP, {
            params: {
                ...params
            },
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
export const addProduct = async (data, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.post(actionType.POST_ADD_PRODUCT, data, {
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
export const editProduct = async (id, data, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.put(actionType.POST_EDIT_PRODUCT + "/" + id, data, {
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
export const getCountStatusProduct = async (headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.get(actionType.GET_COUNT_STATUS_PRODUCT, {
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
export const changeStatusProduct = async (data, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.patch(actionType.PATCH_CHANGE_STATUS_PRODUCT, data, {
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
export const deleteProduct = async (data, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.patch(actionType.PATCH_DELETE_PRODUCT, data, {
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
export const getProductById = async (id, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.get(actionType.GET_PRODUCT_BY_ID_BY_SHOP + "/" + id, {
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
export const getImagesById = async (id, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.get(actionType.GET_IMAGE_BY_ID_PRODUCT_BY_SHOP + "/" + id, {
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
export const deleteImages = async (data, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.post("images", data, {
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
export const getProductInventory = async (params, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.get(actionType.GET_PRODUCT_INVENTORY_BY_SHOP, {
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
export const getAllProductAndVariant = async (params, headers) => {
    verifyToken(axiosInstanceShop)
    try {
        const response = await axiosInstanceShop.get("/products/search-inventory", {
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