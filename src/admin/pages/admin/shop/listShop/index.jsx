// lib
import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
// components
import TableSkeletor from "./TableSkeletor";
import LayoutListShop from "../../../../components/page";

// hook
import { useApiCall, useMultipleSelect } from "../../../../../hooks";
// utils
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import {
  changeStatusCategory,
  deleteCategory,
  getCountStatusCategory,
} from "../../../../service/Category";
import imageNotFound from "../../../../../assets/imageNotFound.png";
import { getAllShop, getCountStatusShop } from "../../../../service/Shop";
const HeaderTable = [
  "listShop.table.name",
  "listShop.table.phone",
  "listShop.table.CCCD",
  "listShop.table.status",
  "listShop.table.product_count",
];
const ListShop = () => {
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
    const response = await getAllShop({
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
      const res = await deleteCategory({ listId });
      return res;
    },
    fnChangeStatusMultiple: async ({ listId, value }) => {
      const res = await changeStatusCategory({ listId, value });
      return res;
    },
    refresh,
  });
  // sự kiện xoá 1 sản phẩm vô thùng rác
  const handleClickDeleteSingle = async (id) => {
    const is = window.confirm("Bạn có muốn chắc muốn xóa vô thùng rác ?");
    if (!is) return;
    toast.promise(
      changeStatusCategory({
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
      deleteCategory({
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
      const response = await getCountStatusShop();
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
    linkCreate: "/admin/categories/create",
    title: t("admin.listShop.title"),
    customStatus: (
      <>
        <ul className="flex items-center gap-3">
          <li
            onClick={() => setFilter({ ...filter, active: "all" })}
            className={`hover:underline cursor-pointer hover:text-blue-500 ${
              filter.active === "all" && "text-blue-500"
            }`}
          >
            Tất cả ( {dataStatus?.countTotal || 0} )
          </li>
          <li>|</li>
          <li
            onClick={() => setFilter({ ...filter, active: "active" })}
            className={`hover:underline cursor-pointer hover:text-blue-500 ${
              filter.active === "active" && "text-blue-500"
            }`}
          >
            {" "}
            Hoạt động ( {dataStatus?.countActive || 0} )
          </li>
          <li>|</li>
          <li
            onClick={() => setFilter({ ...filter, active: "pending" })}
            className={`hover:underline cursor-pointer hover:text-blue-500 ${
              filter.active === "pending" && "text-blue-500"
            }`}
          >
            {" "}
            Chưa xác nhận ( {dataStatus?.countPending || 0} )
          </li>
          <li>|</li>
          <li
            onClick={() => setFilter({ ...filter, active: "blocked" })}
            className={`hover:underline cursor-pointer hover:text-blue-500 ${
              filter.active === "blocked" && "text-blue-500"
            }`}
          >
            Khóa ( {dataStatus?.countBlock || 0} )
          </li>
          <li>|</li>
          <li
            onClick={() => setFilter({ ...filter, active: "cancel" })}
            className={`hover:underline cursor-pointer hover:text-blue-500 ${
              filter.active === "cancel" && "text-blue-500"
            }`}
          >
            Từ chối ( {dataStatus?.countCancel || 0} )
          </li>
        </ul>
      </>
    ),
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
                <div
                  className={`relative h-10 w-10 rounded-full overflow-hidden border shrink-0`}
                >
                  <Link to={`/admin/shops/${item.user_id}/edit`}>
                    <img
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        e.target.src = imageNotFound;
                        e.target.onerror = null;
                      }}
                      src={item.logo}
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
                  </Link>
                </div>
              </div>
              <div
                className="font-medium text-gray-700 max-w-xs text-ecl"
                title={item.name}
              >
                <Link to={`/admin/shops/${item.user_id}/edit`}>
                  {item.name}
                </Link>
              </div>
            </th>
            <td className="px-6 py-4 ">{item.phone}</td>
            <td className="px-6 py-4">{item.CCCD}</td>
            <td className="px-6 py-4">
              {item.status === "active" && (
                <span className="px-3 py-1 rounded-md bg-green-400 text-green-800">
                  Hoạt động
                </span>
              )}
              {item.status === "pending" && (
                <span className="px-3 py-1 rounded-md bg-yellow-400 text-yellow-800">
                  Chưa xác nhận
                </span>
              )}
              {item.status === "cancel" && (
                <span className="px-3 py-1 rounded-md bg-red-400 text-red-800">
                  Từ chối
                </span>
              )}
              {item.status === "blocked" && (
                <span className="px-3 py-1 rounded-md bg-red-400 text-red-800">
                  Khóa
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
                  to={`/admin/categories/${item.slug}-${item.id}/edit`}
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

export default ListShop;
