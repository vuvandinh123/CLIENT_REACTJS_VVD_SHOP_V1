import { convertDataTimeToLocal } from "../../helpers/utils"

export const initNewProduct = {
    name: "",
    categoryId: "",
    brandId: "",
    price: "",
    description: "",
    details: "",
    weight: "",
    metaKey: "",
    metaDesc: "",
    metaTitle: "",
    type: "single",
    quantity: 0,
}
export const initNewPromotion = {
    name: "",
    start_date: "",
    end_date: "",
    price_sale: "",
    type_price: "fixed_amount",
}
export const initNewCategory = {
    name: "",
    parent_id: "",
    description: "",
}
export const initNewBrand = {
    name: "",
    category_id: "",
    description: "",
}
export const initEditCategory = (data) => ({
    name: data?.name,
    parent_id: data?.parent_id && data?.parent_id.toString(),
    description: data?.description,
    thumbnail: data?.thumbnail,
})
export const initEditPromotion = (data) => ({
    name: data.name,
    start_date: convertDataTimeToLocal(data.start_date),
    end_date: convertDataTimeToLocal(data.end_date),
    price_sale: data.price_sale,
    type_price: data.type_price,
})
export const initInventory = {
    quantity: "",
    import_price: "",
    note: ""
}
export const initDiscount = {
    name: "",
    description: "",
    type: "products",
    type_price: "fixed_amount",
    value: "",
    code: "",
    start_date: "",
    end_date: "",
    max_uses: "",
    max_uses_per_user: "",
    min_order_value: "",
    applies_to: "all",
    is_active: "1",
}
export const initDiscountNew = (data) => ({
    name: data.name,
    description: data.description,
    type: data.type,
    type_price: data.type_price,
    value: data.value,
    code: data.code,
    start_date: convertDataTimeToLocal(data.start_date),
    end_date: convertDataTimeToLocal(data.end_date),
    max_uses: data.max_uses,
    max_uses_per_user: data.max_uses_per_user,
    min_order_value: data.min_order_value,
    applies_to: data.applies_to,
    is_active: data.is_active,
})
// product edit
export const initProductEdit = (data) => ({
    name: data.name,
    categoryId: data?.category_id?.toString(),
    brandId: data.brand_id,
    price: data.price,
    description: data.description,
    details: data.details,
    weight: data.weight,
    metaKey: data.meta_keyword,
    metaDesc: data.meta_description,
    metaTitle: data.meta_title,
    price_sale: data.price_sale,
    type: data.type,
    quantity: 0,
})
export const initProfile = (data) => ({
    shop_name: data?.shop_name,
    shop_username: data.shop_username,
    shop_phone: data.shop_phone,
    shop_website: data.shop_website,
    shop_email: data.shop_email,
    shop_description: data.shop_description,
    shop_country: data.shop_country,
    shop_province: data.shop_province,
    shop_address: data.shop_address,
    // lh
    user_first_name: data.user_first_name,
    user_last_name: data.user_last_name,
    user_email: data.user_email,
    user_phone: data.user_phone,
    shop_cccd: data.shop_cccd,

})