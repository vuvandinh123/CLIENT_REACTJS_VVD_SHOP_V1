/* eslint-disable react/prop-types */

import { RiAddCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useApiCall } from "../../../../../hooks";
import { getTotalAmountInventoryLog } from "../../../../service/InventoryLogs";
import { formatPrice } from "../../../../../utils";

const NavStatus = () => {
  // hook api
  const { data } = useApiCall(
    async () => {
      const res = await getTotalAmountInventoryLog()
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
  return (
    <div className="flex mt-5 justify-between items-center px-2">
      <div className="flex gap-3">
        <h2>Tổng số tiền đã nhập hàng:</h2>
        <ul className="flex items-center gap-3">
          <li>Hôm nay : <span className="font-bold text-blue-500">{formatPrice(data.total_by_day)}</span></li>
          <li>Tuần : <span className="font-bold text-blue-500">{formatPrice(data.total_by_week)}</span></li>
          <li>Tháng : <span className="font-bold text-blue-500">{formatPrice(data.total_by_month)}</span></li>
          <li>Năm: <span className="font-bold text-blue-500">{formatPrice(data.total_by_year)}</span></li>
        </ul>
      </div>
      <Link
        to="/admin/inventory/create"
        className="px-3 flex items-center gap-2 py-2 bg-blue-500 text-white rounded-md"
      >
        <RiAddCircleFill></RiAddCircleFill> Thêm mới
      </Link>
    </div>
  );
};

export default NavStatus;
