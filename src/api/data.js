// src/api/data.js
export const categories = [
    {
        id: 1,
        image:
            "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_1.png?v=1681548716&width=2000",
        name: "Tablets/Ipad",
    },
    {
        id: 2,
        image:
            "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_2.png?v=1681548716&width=2000",
        name: "Phone/Mobile",
    },
    {
        id: 3,
        image:
            "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_3.png?v=1681548716&width=2000",
        name: "Camara/Photo",
    },
    {
        id: 4,
        image:
            "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_4.png?v=1681548715&width=2000",
        name: "Gamepad Pro",
    },
    {
        id: 5,
        image:
            "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_5.png?v=1681548716&width=2000",
        name: "Tablet/Ipad",
    },
];
export const brands = [
    {
        id: 1,
        name: "Apple",
    },
    {
        id: 2,
        name: "Samsung",
    },
    {
        id: 3,
        name: "Sony",
    },
    {
        id: 4,
        name: "Xiaomi",
    },
    {
        id: 5,
        name: "Huawei",
    },
    {
        id: 6,
        name: "Vivo",
    },
    {
        id: 7,
        name: "Realme",
    },
    {
        id: 8,
        name: "Nokia",
    },
    {
        id: 9,
        name: "Oppo",
    },
    {
        id: 10,
        name: "Vsmart",
    },
    {
        id: 11,
        name: "Asus",
    },
    {
        id: 12,
        name: "Lenovo",
    },
    {
        id: 13,
        name: "Xiaomi",
    },
    {
        id: 14,
        name: "Realme",
    },
    {
        id: 15,
        name: "Nokia",
    }
];
export const colors = [
    {
        id: 1,
        name: "Red",
        code: "#f00",
    },
    {
        id: 2,
        name: "Green",
        code: "#0f0",
    },
    {
        id: 3,
        name: "Blue",
        code: "#00f",
    },
    {
        id: 4,
        name: "Yellow",
        code: "#ff0",
    },
    {
        id: 5,
        name: "Black",
        code: "#000",
    }
]
export const menus = [
    {
        id: 1,
        name: "Trang chủ",
        link: "/",
        parent_id: 0,
    },
    {
        id: 2,
        name: "Danh mục",
        link: "/categories",
        parent_id: 0,
    },
    {
        id: 3,
        name: "Bài viết",
        link: "/blog",
        parent_id: 0,

    },
    {
        id: 4,
        name: "Hỗ trợ",
        link: "/about",
        parent_id: 0,
    },
    // {
    //     id: 5,
    //     name: "products 1",
    //     link: "/about",
    //     parent_id: 2,
    // },
    // {
    //     id: 6,
    //     name: "products2 ",
    //     link: "/about",
    //     parent_id: 2,
    // },
    // {
    //     id: 7,
    //     name: "products5 ",
    //     link: "/about",
    //     parent_id: 2,
    // }
]
export const news = [
    {
        "name": "The Smartphone Has Just Launched in Sep 2022",
        "image": "https://demo-uminex.myshopify.com/cdn/shop/articles/10_cc1abdba-a10a-4889-8b57-88133851a0ba_360x.png?v=1677830513",
        "category": "Technology",
        "date": "Sep 2022"
    },
    {
        "name": "New Advances in Artificial Intelligence",
        "image": "https://demo-uminex.myshopify.com/cdn/shop/articles/10_cc1abdba-a10a-4889-8b57-88133851a0ba_360x.png?v=1677830513",
        "category": "Technology",
        "date": "Oct 2022"
    },
    {
        "name": "Exploring the Future of Space Travel",
        "image": "https://demo-uminex.myshopify.com/cdn/shop/articles/10_cc1abdba-a10a-4889-8b57-88133851a0ba_360x.png?v=1677830513",
        "category": "Science",
        "date": "Nov 2022"
    },
    {
        "name": "The Smartphone Has Just Launched in Sep 2023",
        "image": "https://demo-uminex.myshopify.com/cdn/shop/articles/10_cc1abdba-a10a-4889-8b57-88133851a0ba_360x.png?v=1677830513",
        "category": "Science",
        "date": "Nov 2022"
    },
]
export const products = [
    {
        "id": 1,
        "name": "Apple iPhone 13 Mini 128GB Pink– Unlocked",
        "price": 25.99,
        "description": "Áo polo nam thời trang và thoáng khí, phù hợp cho mọi dịp.",
        "category_id": 1,
        "brand_id": 1,
        "colors": ["Đen", "Trắng", "Xanh"],
        "sizes": ["S", "M", "L", "XL"],
        "images": [
            "https://demo-uminex.myshopify.com/cdn/shop/products/products_34_1.jpg?v=1678075515",
            "https://demo-uminex.myshopify.com/cdn/shop/products/products_34_2.jpg?v=1678075516",
        ]
    },
    {
        "id": 2,
        "name": "MacBook Air M1 2020 8GB 256GB/7-Core GPU",
        "price": 25.99,
        "description": "Áo polo nam thời trang và thoáng khí, phù hợp cho mọi dịp.",
        "category_id": 1,
        "brand_id": 1,
        "colors": ["Đen", "Trắng", "Xanh"],
        "sizes": ["S", "M", "L", "XL"],
        "images": [
            "https://demo-uminex.myshopify.com/cdn/shop/products/products_19_1.jpg?v=1672303733",
            "https://demo-uminex.myshopify.com/cdn/shop/products/products_19_2.jpg?v=1672303733",
        ]
    },
    {
        "id": 3,
        "name": "Wireless Controller Series Mac/Windows",
        "price": 12.76,
        "description": "Áo polo nam thời trang và thoáng khí, phù hợp cho mọi dịp.",
        "category_id": 1,
        "brand_id": 1,
        "colors": ["Đen", "Trắng", "Xanh"],
        "images": [
            "https://demo-uminex.myshopify.com/cdn/shop/products/products_28_1.jpg?v=1672307403",
            "https://demo-uminex.myshopify.com/cdn/shop/products/products_28_2.jpg?v=1672307403",
        ]
    },
    {
        "id": 4,
        "name": "Logitech G203 Wired 8000 DPI For PC/Mac",
        "price": 12.76,
        "description": "Áo polo nam thời trang và thoáng khí, phù hợp cho mọi dịp.",
        "category_id": 1,
        "brand_id": 1,
        "colors": ["Đen", "Trắng", "Xanh"],
        "images": [
            "	https://demo-uminex.myshopify.com/cdn/shop/products/products_25_1.jpg?v=1672306132",
            "https://demo-uminex.myshopify.com/cdn/shop/products/products_25_2.jpg?v=1672306132",
        ]
    },
    {
        "id": 5,
        "name": "Apple Airpods Pro MWP22A M/A Bluetooth 7.1",
        "price": 53.76,
        "description": "Áo polo nam thời trang và thoáng khí, phù hợp cho mọi dịp.",
        "category_id": 1,
        "brand_id": 1,
        "colors": ["Đen", "Trắng", "Xanh"],
        "images": [
            "https://demo-uminex.myshopify.com/cdn/shop/products/products_23_1.jpg?v=1672305891",
            "	https://demo-uminex.myshopify.com/cdn/shop/products/products_23_2.jpg?v=1672305892",
        ]
    },
    {
        "id": 6,
        "name": "Apple iPhone 13 Pro Max 128GB – Unlocked ( with 3D, Video )",
        "price": 53.76,
        "description": "Áo polo nam thời trang và thoáng khí, phù hợp cho mọi dịp.",
        "category_id": 1,
        "brand_id": 1,
        "colors": ["Đen", "Trắng", "Xanh"],
        "images": [
            "	https://demo-uminex.myshopify.com/cdn/shop/products/products_7_1.jpg?v=1670906467",
            "	https://demo-uminex.myshopify.com/cdn/shop/products/products_7_4.jpg?v=1687334434",
        ]
    },
]
export const conversionPrice = [
    {
        "id": 2,
        "from": "vi-VN",
        "name": "Việt Nam (VND ₫)",
        "currency": "VND",
        "rate": 24000
    },
    {
        "id": 1,
        "from": "en-US",
        "name": "United States(USD $)",
        "currency": "USD",
        "rate": 0.00004129
    },

]