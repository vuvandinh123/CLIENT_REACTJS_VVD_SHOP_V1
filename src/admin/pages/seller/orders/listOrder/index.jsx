// lib
import { useState } from "react";
import { useTranslation } from "react-i18next";
// components
import TableSkeletor from "./TableSkeletor";

// hook
// utils
import ModalShow from "./ModalShow";
import { FaBook } from "react-icons/fa";
import LayoutListShop from "../../../../components/page";
import { useApiCall, useMultipleSelect } from "../../../../../hooks";
import { formatPriceVND, formathDate } from "../../../../../utils";
import {
  getAllOrderShop,
  getCountStatusOrderShop,
} from "../../../../service/Order";
import { statusOrder } from "./status";

const HeaderTable = [
  "listOrder.table.id",
  "listOrder.table.status",
  "listOrder.table.discount",
  "listOrder.table.created_at",
  "listOrder.table.amount",
];
const ListOrders = () => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [idOrder, setIdOrder] = useState(null);
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
  // Lấy tất cả mã giảm giá
  const { data, loading } = useApiCall(async () => {
    const response = await getAllOrderShop({
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
  const { data: dataStatus } = useApiCall(
    async () => {
      const response = await getCountStatusOrderShop();
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
    linkCreate: "/seller/discounts/create",
    title: "Tất cả đơn hàng",
    isBtnCreated: false,
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
    isCheckBox: false,
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
            <td className="px-6 py-4 font-bold ">
              <div
                title={item.id}
                className="flex cursor-pointer gap-2 bg-gray-100 text-gray-800 items-center border w-max px-3 rounded-sm py-1"
              >
                #{item.id}{" "}
              </div>
            </td>
            <td className="px-6 py-4">
              <span
                style={{
                  background: statusOrder.find((i) => i.code == item.status)
                    ?.color,
                }}
                className={`px-2 bg-green-500 rounded-md py-1 text-white
              
              `}
              >
                {statusOrder.find((i) => i.code == item.status)?.name}
              </span>
            </td>
            <td className="px-6 py-4">
              {item?.discount_id === null ? "Không" : "Đã áp dụng voucher"}
            </td>
            <td className="px-6 py-4">
              <span>{formathDate(item?.order_date)}</span>
            </td>
            <td className="px-6 py-4">
              {item.type_price === "percent" ? (
                <span>
                  {formatPriceVND(
                    Number(item?.amount - item?.amount * (item?.value / 100)) ||
                      0
                  )}
                </span>
              ) : (
                <span>
                  {formatPriceVND(Number(item?.amount - item?.value) || 0)}
                </span>
              )}
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-end items-center gap-2">
                <span
                  className="text-gray-500 cursor-pointer px-3 hover:text-blue-500"
                  onClick={() => {
                    setIdOrder(item.id);
                    setIsOpen(true);
                  }}
                  title="Edit"
                >
                  <FaBook size={20}></FaBook>
                </span>
              </div>
            </td>
          </tr>
        ))}
      {/* loading */}
      <ModalShow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setRefresh={setRefresh}
        id={idOrder}
      ></ModalShow>
      {loading &&
        Array(5)
          .fill(0)
          .map((_, index) => <TableSkeletor key={index}></TableSkeletor>)}
    </LayoutListShop>
  );
};

export default ListOrders;
