import { FaHouseChimneyUser } from "react-icons/fa6";
import { MdDiscount, MdInventory } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
export const navSidebar = [
  {
    title: "Bảng điều khiển",
    link: "/seller",
    icon: (
      <svg
        className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
      </svg>
    ),
  },
  {
    title: "Sản phẩm",
    link: "/seller/products",
    icon: (
      <svg
        className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
          clipRule="evenodd"
        />
      </svg>
    ),
    children: [
      {
        title: "Tất cả sản phẩm",
        link: "/seller/products",
      },
      {
        title: "Thêm mới sản phẩm",
        link: "/seller/products/create",
      },
      {
        title: "Giảm giá sản phẩm",
        link: "/seller/sale-products",
      },
      {
        title: "Danh sách biến thể",
        link: "/seller/variants",
      },
    ],
  },
  {
    title: "Khuyến mại",
    link: "/seller/discounts",
    icon: (
      <MdDiscount
        size={21}
        className="text-gray-500  flex-shrink-0 group-hover:text-gray-900 transition duration-75"
      ></MdDiscount>
    ),
    children: [
      {
        title: "Tất cả khuyến mại",
        link: "/seller/discounts",
      },
      {
        title: "Tạo mã giảm giá",
        link: "/seller/discounts/create",
      },
    ],
  },
  // {
  //   title: "Danh mục",
  //   link: "/admin/categories",
  //   icon: (
  //     <svg
  //       className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
  //       fill="currentColor"
  //       viewBox="0 0 20 20"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  //     </svg>
  //   ),
  //   children: [
  //     {
  //       title: "Tất cả danh mục",
  //       link: "/admin/categories",
  //     },
  //     {
  //       title: "Thêm mới danh mục",
  //       link: "/admin/categories/create",
  //     },
  //   ],
  // },
  // {
  //   title: "Thương hiệu",
  //   link: "/admin/users",
  //   icon: (
  //     <HiMiniCube
  //       size={22}
  //       className="text-gray-500  flex-shrink-0 group-hover:text-gray-900 transition duration-75 "
  //     ></HiMiniCube>
  //   ),
  //   children: [
  //     {
  //       title: "Danh sách thương hiệu",
  //       link: "/admin/brands",
  //     },
  //     {
  //       title: "Thêm mới thương hiệu",
  //       link: "/admin/brands/create",
  //     },
  //   ],
  // },
  {
    title: "Quản lý kho hàng",
    icon: (
      <MdInventory
        size={21}
        className="text-gray-500  flex-shrink-0 group-hover:text-gray-900 transition duration-75"
      ></MdInventory>
    ),
    children: [
      {
        title: "Thống kê hàng tồn kho",
        link: "/seller/inventory/stocks",
      },
      {
        title: "Lịch sử nhập hàng",
        link: "/seller/inventory",
      },
      {
        title: "Lịch sử xuất hàng",
        link: "/seller/out-inventory",
      },
      {
        title: "Nhập thêm hàng",
        link: "/seller/inventory/create",
      },
    ],
  },
  {
    title: "Khách hàng",
    link: "/seller/users",
    icon: (
      <FaHouseChimneyUser
        size={22}
        className="text-gray-500  flex-shrink-0 group-hover:text-gray-900 transition duration-75 "
      ></FaHouseChimneyUser>
    ),
    children: [
      {
        title: "Khách hàng đăng ký",
        link: "/seller/users",
      },
      {
        title: "Hỗ trợ",
        link: "/seller/chats",
      },
    ],
  },
  {
    title: "Đơn hàng",
    icon: (
      <FaShippingFast
        size={22}
        className="text-gray-500  flex-shrink-0 group-hover:text-gray-900 transition duration-75 "
      ></FaShippingFast>
    ),
    children: [
      {
        title: "Tất cả đơn hàng",
        link: "/seller/orders",
      },
    ],
  },
];
