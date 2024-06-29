// lib
import { useState } from "react";
import { useTranslation } from "react-i18next";
// components
import TableSkeletor from "./TableSkeletor";

// hook
// utils
import LayoutListShop from "../../../../components/page";
import { useApiCall, useMultipleSelect } from "../../../../../hooks";
import { formatPriceVND } from "../../../../../utils";
import { getAllProductAdmin } from "../../../../service/Product";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import ModalAddInventory from "../../../seller/products/listProduct/components/ModalAddInventory";
import { Checkbox } from "@mui/material";

const HeaderTable = [
  "listProductAdmin.table.name",
  "listProductAdmin.table.stock",
  "listProductAdmin.table.price_sale",
  "listProductAdmin.table.sold",
  "listProductAdmin.table.type",
  "listProductAdmin.table.action",
];
const ListProduct = () => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
  //   pagination
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
    total: 1,
    totalProduct: 1,
  });
  //   filter
  const [filter, setFilter] = useState({
    search: "",
    active: "all",
    status: "ALL",
    sortBy: "createdAtDesc",
  });
  const { data, loading } = useApiCall(async () => {
    const response = await getAllProductAdmin({
      ...filter,
      limit: pagination.limit,
      page: pagination.page,
    });
    setPagination({
      ...pagination,
      total: response.options?.pagination?.totalPage,
      totalProduct: response.options?.count,
    });
    return response.data;
  }, [
    refresh,
    pagination.limit,
    pagination.page,
    filter.active,
    filter.sortBy,
    filter.search,
    filter.status,
  ]);
  // chức năng xóa thay đổi nhiều trạng thái
  const {
    checkedStates,
    handleCheckAll,
    handleMultiple,
    handleCheck,
    isCheckAll,
  } = useMultipleSelect({
    data: data,
    on: () => setRefresh(!refresh),
    fnDeleteMultiple: async ({ listId }) => {
      // const res = await deleteDiscount({ listId });
      return {};
    },
    fnChangeStatusMultiple: async ({ listId, value }) => {
      // const res = await changeStatusDiscount({ listId, value });
      return {};
    },
    refresh,
  });
  // sự kiện xoá 1 sản phẩm vô thùng rác
  const handleClickDeleteSingle = async (id) => {
    const is = window.confirm("Bạn có muốn chắc muốn xóa vô thùng rác ?");
    if (!is) return;
    // toast.promise(
    //   changeStatusDiscount({
    //     listId: [id],
    //     value: 0,
    //   }),
    //   {
    //     loading: "Đang tải...",
    //     success: "Thêm vô thùng rác thành công",
    //     error: "Lỗi không xóa được",
    //   }
    // );

    setRefresh(!refresh);
  };
  // sự kiện xoá 1 sản phẩm
  const handleClickDeleteSingle2 = async (id) => {
    const is = window.confirm("Bạn có muốn chắc muốn xóa ?");
    if (!is) return;
    // toast.promise(
    //   deleteDiscount({
    //     listId: [id],
    //   }),
    //   {
    //     loading: "Đang tải...",
    //     success: "Xóa thành công",
    //     error: "Lỗi không xóa được",
    //   }
    // );
    setRefresh(!refresh);
  };
  const handleClickDelete = async (id) => {
    if (filter.active != 0) {
      handleClickDeleteSingle(id);
    } else {
      handleClickDeleteSingle2(id);
    }
  };
  // gọi api lấy ra số lượng các trạng thái của sản phẩm theo trạng thái [all,active,unactive,trash]
  const { data: dataStatus } = useApiCall(
    async () => {
      // const response = await getCountStatusDiscountCode({
      //   limit: pagination.limit,
      //   page: pagination.page,
      //   ...filter,
      // });
      // console.log("dinh");
      // return response.data;
    },
    [
      refresh,
      filter.active,
      pagination.limit,
      pagination.page,
      filter.status,
      filter.sortBy,
      filter.search,
    ],
    {}
  );
  const propsComponent = {
    data,
    HeaderTable,
    //   function
    handleCheckAll,
    handleMultiple,
    //   view
    linkCreate: "/seller/discounts/create",
    title: "Tất cả đơn hàng",

    //   state
    // isCheckBox: false,
    dataStatus,
    checkedStates,
    loading,
    isCheckAll,
    pagination,
    setPagination,
    filter,
    setFilter,
    refresh,
    setRefresh,
  };
  return (
    <LayoutListShop {...propsComponent}>
      {!loading &&
        data?.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td>
              <Checkbox
                value={item.id}
                onChange={handleCheck}
                checked={checkedStates.includes(item.id)}
              />
            </td>
            <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900">
              <div className="relative h-10 w-10 shrink-0">
                <img
                  className="h-full w-full object-contain"
                  src={item.thumbnail}
                  alt={item.name}
                />
                <span
                  className={`absolute right-0 bottom-0 h-2 w-2 rounded-full`}
                >
                  <span
                    className={`animate-ping absolute inline-flex  h-full w-full rounded-full opacity-75 ${
                      item.is_active == 2 ? "bg-green-400 " : "bg-gray-200"
                    }`}
                  />
                  <span
                    className={`absolute inline-flex rounded-full h-2 w-2  ${
                      item.is_active == 2 ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                </span>
              </div>
              <div
                className="font-medium text-gray-700 max-w-xs text-ecl"
                title={item.name}
              >
                <Link to={`/seller/products/${item.slug}-${item.id}/edit`}>
                  {item.name}
                </Link>
              </div>
            </th>
            <td className="px-6 py-4">
              <ModalAddInventory
                refresh={refresh}
                setRefresh={setRefresh}
                data={item}
              ></ModalAddInventory>
            </td>
            <td className="px-6 py-4">
              {formatPriceVND(item.price < 0 ? 0 : item.price)}
            </td>
            <td className="px-6 py-4">{item.sold}</td>
            <td className="px-6 py-4">{item.type}</td>
            <td className="px-6 py-4">
              <div className="flex justify-end items-center gap-2">
                <Link
                  className="text-gray-500 px-3 hover:text-blue-500"
                  title="Edit"
                  to={`/seller/products/${item.slug}-${item.id}/edit`}
                >
                  <LuClipboardEdit size={20}></LuClipboardEdit>
                </Link>
                |
                <button
                  className="text-gray-500 px-3 hover:text-red-500"
                  title="Delete"
                  type="button"
                  onClick={() => {
                    if (filter.active == "0") {
                      handleClickDeleteSingle2(item.id);
                    } else {
                      handleClickDeleteSingle(item.id);
                    }
                  }}
                >
                  <MdOutlineDelete size={25}></MdOutlineDelete>
                </button>
              </div>
            </td>
          </tr>
        ))}
      {/* loading */}
      {/* <ModalShow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setRefresh={setRefresh}
        id={idOrder}
      ></ModalShow> */}
      {loading &&
        Array(5)
          .fill(0)
          .map((_, index) => <TableSkeletor key={index}></TableSkeletor>)}
    </LayoutListShop>
  );
};

export default ListProduct;
