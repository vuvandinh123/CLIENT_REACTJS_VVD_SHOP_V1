// lib
import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
// components
import TableSkeletor from "./TableSkeletor";
import LayoutListShop from "../../components/page";

// service
import { getCountStatusDiscountCode } from "../../service/Discount";
// hook
import { useApiCall, useMultipleSelect } from "../../../hooks";
// utils
import { formatPrice, formatPriceVND } from "../../../utils";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import {
  changeStatusPromotion,
  deletePromotion,
  getAllPromotion,
  getCountStatusPromotion,
} from "../../service/Promotion";

const HeaderTable = [
  "productPromotion.table.name",
  "productPromotion.table.price",
  "productPromotion.table.price_sale",
  "productPromotion.table.last_price",
  "productPromotion.table.status",
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
    const response = await getAllPromotion({
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
      const res = await deletePromotion({ listId });
      return res;
    },
    fnChangeStatusMultiple: async ({ listId, value }) => {
      const res = await changeStatusPromotion({ listId, value });
      return res;
    },
    refresh,
  });
  // sự kiện xoá 1 sản phẩm vô thùng rác
  const handleClickDeleteSingle = async (id) => {
    const is = window.confirm("Bạn có muốn chắc muốn xóa vô thùng rác ?");
    if (!is) return;
    toast.promise(
      changeStatusPromotion({
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
      deletePromotion({
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
      const response = await getCountStatusPromotion();
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
    linkCreate: "/admin/sale-products/create",
    title: t("admin.productPromotion.title"),
    viewFilter: (
      <>
        <select
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="px-2 outline-blue-500 py-2 rounded-md bg-white border"
          name=""
          id=""
        >
          <option value="" disabled>
            Trạng thái
          </option>
          <option value="all">Tất cả</option>
          <option value="active">Hoạt động</option>
          <option value="upcoming">Sắp tới</option>
          <option value="expired">Hết hạn</option>
        </select>
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
    <>
      <LayoutListShop {...propsComponent}>
        {!loading &&
          data?.map((item) => {
            let lastPrice = 0;
            if (item.type_price === "fixed_amount") {
              lastPrice = item.price - item.price_sale;
            } else {
              lastPrice = item.price - item.price * (item.price_sale / 100);
            }
            return (
              <tr key={item.id} className="hover:bg-gray-50">
                <td>
                  <Checkbox
                    value={item.id}
                    onChange={handleCheck}
                    checked={checkedStates.includes(item.id)}
                  />
                </td>
                <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="w-10 shrink-0 h-10 rounded-md">
                    <img src={item.thumbnail} alt="" />
                  </div>
                  <div
                    className="font-bold text-gray-700 max-w-xs"
                    title={item.name}
                  >
                    <Link
                      className="text-ecl"
                      to={`/admin/sale-products/${item.id}/edit`}
                    >
                      {item.name}
                    </Link>
                  </div>
                </th>
                <td className="px-6 py-4 ">{formatPriceVND(item.price || 0)}</td>
                <td className="px-6 py-4">
                  -
                  {item.type_price === "fixed_amount"
                    ? formatPriceVND(item.price_sale || 0)
                    : item.price_sale}{" "}
                  {item.type_price !== "fixed_amount" ? "%" : ""}
                </td>
                <td className="px-6 py-4">{formatPriceVND(lastPrice < 0 ? 0 : lastPrice || 0)}</td>
                <td className="px-6 py-4">
                  {item.status == "active" ? (
                    <span className="px-2 bg-green-300 rounded-md py-1 text-green-800">
                      Hoạt động
                    </span>
                  ) : item.status == "expired" ? (
                    <span className="px-2 bg-red-300 rounded-md py-1 text-red-800">
                      Hết hạn
                    </span>
                  ) : (
                    <span className="px-2 bg-yellow-300 rounded-md py-1 text-yellow-800">
                      Sắp tới
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span>{item.uses_count}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end items-center gap-2">
                    <Link
                      className="text-gray-500 px-3 hover:text-blue-500"
                      title="Edit"
                      to={`/admin/sale-products/${item.id}/edit`}
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
            );
          })}
        {/* loading */}
        {loading &&
          Array(5)
            .fill(0)
            .map((_, index) => <TableSkeletor key={index}></TableSkeletor>)}
      </LayoutListShop>
    </>
  );
};

export default ListDiscount;
