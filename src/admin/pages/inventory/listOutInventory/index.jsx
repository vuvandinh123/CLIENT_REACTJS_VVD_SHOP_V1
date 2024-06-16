// lib
import { useState } from "react";
import { Link } from "react-router-dom";
// components
import TableSkeletor from "./TableSkeletor";
import LayoutListShop from "../../../components/page";

// utils
import { formatPrice, formatPriceVND, formathDate } from "../../../../utils";
import { MdOutlineEventNote } from "react-icons/md";

import {
  getAllInventoryLog,
  getTotalAmountInventoryLog,
} from "../../../service/InventoryLogs";
import ModalShow from "./ModalShow";
import { useApiCall } from "../../../../hooks";
import moment from "moment";
const HeaderTable = [
  "listInventory.table.id",
  "listInventory.table.quantity",
  "listInventory.table.amount",
  "listInventory.table.note",
  "listInventory.table.created_at",
];
const ListOutInventory = () => {
  // const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
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
    month: moment().format("YYYY-MM"),
  });
  const { data: amount_price_date } = useApiCall(
    async () => {
      const res = await getTotalAmountInventoryLog({type: "OUT"});
      return res.data;
    },
    [],
    {
      total_by_day: 0,
      total_by_week: 0,
      total_by_month: 0,
      total_by_year: 0,
    }
  );
  // Lấy tất cả mã giảm giá
  const { data, loading } = useApiCall(async () => {
    const response = await getAllInventoryLog({
      month: filter.month,
      limit: pagination.limit,
      page: pagination.page,
      type: "OUT",
    });
    setPagination({
      ...pagination,
      total: response.options?.pagination?.totalPage,
      totalProduct: response.options?.count,
    });
    return response.data;
  }, [refresh, filter.month, pagination.limit, pagination.page]);
  const handleChangeMoth = (e) => {
    setFilter({ ...filter, month: e.target.value });
  }
  const propsComponent = {
    isCheckBox: false,
    isBtnCreated: false,
    data,
    HeaderTable,
    customStatus: (
      <>
        <div className="flex gap-3">
          <h2>Tổng số tiền đã xuất hàng:</h2>
          <ul className="flex items-center gap-3">
            <li>
              Hôm nay :{" "}
              <span className="font-bold text-blue-500">
                {formatPrice(amount_price_date.total_by_day || 0)}
              </span>
            </li>
            <li>
              Tuần :{" "}
              <span className="font-bold text-blue-500">
                {formatPrice(amount_price_date.total_by_week || 0)}
              </span>
            </li>
            <li>
              Tháng :{" "}
              <span className="font-bold text-blue-500">
                {formatPrice(amount_price_date.total_by_month || 0)}
              </span>
            </li>
            <li>
              Năm:{" "}
              <span className="font-bold text-blue-500">
                {formatPrice(amount_price_date.total_by_year || 0)}
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
    addFilter: (
      <div>
        <input
          type="month"
          id="date"
          value={filter.month}
          onChange={handleChangeMoth}
          className="px-3  py-2 rounded-md bg-white border outline-blue-500"
        />
      </div>
    ),
    //   view
    linkCreate: "/admin/categories/create",
    title: "Lịch sử xuất hàng",
    //   state
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
            <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900">
              <div className="font-bold text-gray-700 max-w-xs" title={item.id}>
                <Link to={`/admin/products/${item.slug}-${item.id}/edit`}>
                  {`#` + item.id}
                </Link>
              </div>
            </th>
            <td className="px-6 py-4">x{item.quantity}</td>
            <td className="px-6 py-4">{formatPriceVND(item.total || 0)}</td>
            <td className="px-6 py-4">{item.note}</td>
            <td className="px-6 py-4">{formathDate(item.created_at)}</td>
            <td className="px-6 py-4">
              <div className="flex justify-end gap-4">
                <button
                  className="text-[15px]"
                  type="button"
                  onClick={() => {
                    setId(item.id);
                    setShowModal(true);
                  }}
                >
                  <MdOutlineEventNote size={25}></MdOutlineEventNote>
                </button>
              </div>
            </td>
          </tr>
        ))}
      {/* modal */}
      <ModalShow
        id={id}
        isOpen={showModal}
        setIsOpen={setShowModal}
      ></ModalShow>
      {/* loading */}
      {loading &&
        Array(5)
          .fill(0)
          .map((_, index) => <TableSkeletor key={index}></TableSkeletor>)}
    </LayoutListShop>
  );
};

export default ListOutInventory;
