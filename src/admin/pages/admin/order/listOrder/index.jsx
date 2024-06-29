// lib
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// components
import TableSkeletor from "./TableSkeletor";
import LayoutListShop from "../../../../components/page";

// hook
import { useApiCall, useMultipleSelect } from "../../../../../hooks";
import {
  changeStatusCategory,
  deleteCategory,
} from "../../../../service/Category";
import {
  getAllOrderByAdmin,
  getCountStatusOrderAdmin,
} from "../../../../service/Order";
import { formatPriceVND, formathDate } from "../../../../../utils";
import { FaEye } from "react-icons/fa6";
import { Badge } from "keep-react";
import { statusOrder } from "./status";
import { useQuery } from "@tanstack/react-query";
const HeaderTable = [
  "listOrderAdmin.table.id",
  "listOrderAdmin.table.payment_method",
  "listOrderAdmin.table.status",
  "listOrderAdmin.table.created_at",
  "listOrderAdmin.table.cost",
  "listOrderAdmin.table.total_amout",
  "listOrderAdmin.table.action",
];
const ListOrder = () => {
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
  const { isPending: loading, data } = useQuery({
    queryKey: [
      "adminListOrder",
      refresh,
      pagination.limit,
      pagination.page,
      filter.active,
      filter.sortBy,
      filter.search,
      filter.status,
    ],
    queryFn: async () => {
      const response = await getAllOrderByAdmin({
        ...filter,
        limit: pagination.limit,
        page: pagination.page,
      });
      setPagination({
        ...pagination,
        total: response.options?.pagination?.totalPage,
        totalProduct: response.options?.total,
      });
      return response.data;
    },
    staleTime: 60 * 1000,
  });
  // chức năng xóa thay đổi nhiều trạng thái
  const { checkedStates, handleCheckAll, handleMultiple } = useMultipleSelect({
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

  // gọi api lấy ra số lượng các trạng thái của sản phẩm theo trạng thái [all,active,unactive,trash]
  const { data: dataStatus } = useApiCall(
    async () => {
      const response = await getCountStatusOrderAdmin();
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
    title: t("admin.listOrderAdmin.title"),
    isBtnCreated:false,
    customStatus: (
      <>
        <ul className="flex items-center gap-3">
          <li
            onClick={() => setFilter({ ...filter, status: "ALL" })}
            className={`hover:underline cursor-pointer hover:text-blue-500 ${
              filter.status === "ALL" && "text-blue-500"
            }`}
          >
            Tất cả ( {dataStatus["TOTAL"] || 0} )
          </li>
          <li>|</li>
          {statusOrder.map((item) => (
            <>
              <li
                onClick={() => setFilter({ ...filter, status: item.code })}
                className={`hover:underline cursor-pointer hover:text-blue-500 ${
                  filter.status === item.code && "text-blue-500"
                }`}
              >
                {item.name} ( {dataStatus[item.code] || 0} )
              </li>
              <li>|</li>
            </>
          ))}
        </ul>
      </>
    ),
    //   state
    dataStatus,
    checkedStates,
    loading,
    isCheckBox: false,
    // isCheckAll,
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
            <th className="flex items-center gap-3  px-6 py-4 font-bold text-gray-900">
              <Link to={`/admin/shops/${item.user_id}/edit`}>#{item.id}</Link>
            </th>
            <td className="px-6 py-4 ">
              {item?.payment_status === "unpaid" ? (
                <Badge size="md" showIcon={true} color="warning">
                  Chưa thanh toán
                </Badge>
              ) : (
                <Badge showIcon={true} color="success">
                  Đã thanh toán
                </Badge>
              )}
            </td>
            <td className="px-6 py-4 ">
              {item.status === "CONFIRMED" && (
                <span className="px-3 py-1 text-nowrap rounded-md uppercase bg-green-400 text-green-800">
                  ĐÃ XÁC NHẬN
                </span>
              )}
              {item.status === "PENDING" && (
                <span className="px-3 py-1 text-nowrap rounded-md uppercase bg-yellow-400 text-white">
                  Chờ xác nhận
                </span>
              )}
              {item.status === "SHIPPING" && (
                <span className="px-3 py-1 text-nowrap rounded-md uppercase bg-yellow-400 text-white">
                  Đang vận chuyển
                </span>
              )}
              {item.status === "DELIVERED" && (
                <span className="px-3 py-1 text-nowrap rounded-md uppercase bg-yellow-400 text-white">
                  Đang GIAO
                </span>
              )}
              {item.status === "CANCEL" && (
                <span className="px-3 py-1 text-nowrap rounded-md uppercase bg-red-400 text-white">
                  Đã hủy
                </span>
              )}
              {item.status === "SUCCESS" && (
                <span className="px-3 py-1 text-nowrap rounded-md uppercase bg-green-400 text-white">
                  Thành công
                </span>
              )}
            </td>
            <td className="px-6 py-4">{formathDate(item.order_date)}</td>

            <td className="px-6 py-4">
              <span>{formatPriceVND(Number(item.cost))}</span>
            </td>
            <td className="px-6 py-4">
              <span className="font-bold text-md">
                {formatPriceVND(Number(item.total_amount))}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-end items-center gap-2">
                <Link
                  className="text-gray-500 px-3 hover:text-blue-500"
                  title="Show"
                  to={`/admin/orders/${item.id}/show`}
                >
                  <FaEye size={20}></FaEye>
                </Link>
                {/* 
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
                </button> */}
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

export default ListOrder;
