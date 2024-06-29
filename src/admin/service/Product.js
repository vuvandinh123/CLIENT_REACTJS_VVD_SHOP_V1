import { axiosInstanceAdmin, axiosInstanceShop } from "../../api/axiosInstanceConfig"
import { actionType } from "../../constants"
import verifyToken from "../../api/AuthVerify"

export const getAllProduct = async (params, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_ALL_PRODUCT_BY_SHOP, {
        params: {
            ...params
        },
        headers: {
            ...headers,
        }

    })
    return response.data
}
export const addProduct = async (data, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.post(actionType.POST_ADD_PRODUCT, data, {
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const editProduct = async (id, data, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.put(actionType.POST_EDIT_PRODUCT + "/" + id, data, {
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const getCountStatusProduct = async (headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_COUNT_STATUS_PRODUCT, {
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const changeStatusProduct = async (data, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.patch(actionType.PATCH_CHANGE_STATUS_PRODUCT, data, {
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const deleteProduct = async (data, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.patch(actionType.PATCH_DELETE_PRODUCT, data, {
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const getProductById = async (id, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_PRODUCT_BY_ID_BY_SHOP + "/" + id, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const getImagesById = async (id, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_IMAGE_BY_ID_PRODUCT_BY_SHOP + "/" + id, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const deleteImages = async (data, params = {}, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.post("images", data, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const getProductInventory = async (params, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get(actionType.GET_PRODUCT_INVENTORY_BY_SHOP, {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}
export const getAllProductAndVariant = async (params, headers) => {
    verifyToken(axiosInstanceShop)
    const response = await axiosInstanceShop.get("/products/search-inventory", {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data

}
// admin
export const getAllProductAdmin = async (params, headers) => {
    verifyToken(axiosInstanceAdmin)
    const response = await axiosInstanceAdmin.get("/products", {
        params,
        headers: {
            ...headers,
        }
    })
    return response.data
}