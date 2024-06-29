// lib
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiDiscount1 } from "react-icons/ci";
import { RxClipboardCopy } from "react-icons/rx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
// components
import TableSkeletor from "./TableSkeletor";
import LayoutListShop from "../../../components/page";

// service
import {
  changeStatusDiscount,
  deleteDiscount,
  getAllDiscount,
  getCountStatusDiscountCode,
} from "../../../service/Discount";
// hook
import { useApiCall, useMultipleSelect } from "../../../../hooks";
// utils
import { formatPrice, formathDate } from "../../../../utils";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import {
  changeStatusCategoryByShop,
  deleteCategoryByShop,
  getAllCategoryOnShop,
  getCountStatusCategory,
} from "../../../service/Category";
import imageNotFound from "../../../../assets/imageNotFound.png";
const HeaderTable = [
  "listCategory.table.name",
  "listCategory.table.description",
  "listCategory.table.created_at",
  "listCategory.table.status",
  "listCategory.table.product_count",
];
const ListDiscount = () => {
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
    status: "all",
    sortBy: "createdAtDesc",
  });
  // Lấy tất cả mã giảm giá
  const { data, loading } = useApiCall(async () => {
    const response = await getAllCategoryOnShop({
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
      const res = await deleteCategoryByShop({ listId });
      return res;
    },
    fnChangeStatusMultiple: async ({ listId, value }) => {
      const res = await changeStatusCategoryByShop({ listId, value });
      return res;
    },
    refresh,
  });
  // sự kiện xoá 1 sản phẩm vô thùng rác
  const handleClickDeleteSingle = async (id) => {
    const is = window.confirm("Bạn có muốn chắc muốn xóa vô thùng rác ?");
    if (!is) return;
    toast.promise(
      changeStatusCategoryByShop({
        listId: [id],
        value: 0,
      }),
      {
        loading: "Đang tải...",
        success: "Thêm vô thùng rác thành công",
        error: "Lỗi không xóa được",
      }
    );

    setRefresh(!refresh);
  };
  // sự kiện xoá 1 sản phẩm
  const handleClickDeleteSingle2 = async (id) => {
    const is = window.confirm("Bạn có muốn chắc muốn xóa ?");
    if (!is) return;
    toast.promise(
      deleteCategoryByShop({
        listId: [id],
      }),
      {
        loading: "Đang tải...",
        success: "Xóa thành công",
        error: "Lỗi không xóa được",
      }
    );
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
      const response = await getCountStatusCategory();
      return response.data;
    },
    [refresh],
    {}
  );
  const propsComponent = {
    data,
    HeaderTable,
    //   function
    handleCheckAll,
    handleMultiple,
    //   view
    linkCreate: "/seller/categories/create",
    title: t("admin.listCategory.title"),

    //   state
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
              <div
                className="font-bold text-gray-700 max-w-xs"
                title={item.name}
              >
                <div className={`relative h-10 w-10 shrink-0`}>
                  <img
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      e.target.src = imageNotFound;
                      e.target.onerror = null;
                    }}
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
              </div>
              <div
                className="font-medium text-gray-700 max-w-xs text-ecl"
                title={item.name}
              >
                <Link to={`/admin/categories/${item.slug}-${item.id}/edit`}>
                  {item.name}
                </Link>
              </div>
            </th>
            <td className="px-6 py-4 font-bold ">{item.description}</td>
            <td className="px-6 py-4">
              {" "}
              {formathDate(item.updated_at || item.created_at)}
            </td>
            <td className="px-6 py-4">
              {item.is_active == 2 ? (
                <span className="px-2 bg-green-300 rounded-md py-1 text-green-800">
                  Hoạt động
                </span>
              ) : (
                <span className="px-2 bg-red-300 rounded-md py-1 text-red-800">
                  Không hoạt động
                </span>
              )}
            </td>

            <td className="px-6 py-4">
              <span>{item.total_product}</span>
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-end items-center gap-2">
                <Link
                  className="text-gray-500 px-3 hover:text-blue-500"
                  title="Edit"
                  to={`/seller/discounts/${item.id}/edit`}
                >
                  <LuClipboardEdit size={20}></LuClipboardEdit>
                </Link>
                |
                <button
                  className="text-gray-500 px-3 hover:text-red-500"
                  title="Delete"
                  type="button"
                  onClick={() => {
                    handleClickDelete(item.id);
                  }}
                >
                  <MdOutlineDelete size={25}></MdOutlineDelete>
                </button>
              </div>
            </td>
          </tr>
        ))}
      {/* loading */}
      {loading &&
        Array(5)
          .fill(0)
          .map((_, index) => <TableSkeletor key={index}></TableSkeletor>)}
    </LayoutListShop>
  );
};

export default ListDiscount;
