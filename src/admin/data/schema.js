import * as Yup from "yup";

export const productSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.string().required("Price is required"),
    brandId: Yup.string().required("Brand is required"),
    details: Yup.string().required("Details is required"),
    categoryId: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    metaKey: Yup.string().required("Metakey is required"),
    weight: Yup.string().required("Weight is required"),
    metaDesc: Yup.string().required("Metadesc is required"),
    metaTitle: Yup.string().required("Metatitle is required"),
});
export const inventorySchema = Yup.object({
    quantity: Yup.string().required("Quantity is required"),
    import_price: Yup.string().required("Import price is required"),
});

export const discountSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    type_price: Yup.string().required("Brand is required"),
    type: Yup.string().required("Details is required"),
    value: Yup.string().required("Category is required"),
    code: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    start_date: Yup.string().required("Metakey is required"),
    end_date: Yup.string().required("Weight is required"),
    max_uses: Yup.string().required("Metadesc is required"),
    max_uses_per_user: Yup.string().required("Metatitle is required"),
    min_order_value: Yup.string().required("Metatitle is required"),
    applies_to: Yup.string().required("Metatitle is required"),

});
export const promotionSchema = Yup.object({

    name: Yup.string().required("Name is required"),
    start_date: Yup.string().required("Start date is required"),
    end_date: Yup.string().required("End date is required"),
    price_sale: Yup.string().required("Price sale is required"),
    type_price: Yup.string().required("Type price is required"),

})
export const categorySchema = Yup.object({

    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Start date is required"),
    parent_id: Yup.string().required("categories is required"),

})