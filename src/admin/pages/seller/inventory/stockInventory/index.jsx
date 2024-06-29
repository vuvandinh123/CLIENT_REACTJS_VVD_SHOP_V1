import React, { useState } from "react";
import PageHeader from "../../../../components/common/PageHeader";
import CardStock from "./components/CardStock";
import ListOrder from "./components/ListOrder";
import ListTopProduct from "./components/ListTopProduct";
import { useApiCall } from "../../../../../hooks";
import { getInventoryStats } from "../../../../service/InventoryLogs";
import Loader from "../../../../components/common/Loader";
import { formatNumber, formatPrice, formatPriceVND } from "../../../../../utils";

const StockInventory = () => {
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState("week");
  const { data, loading } = useApiCall(async () => {
    const response = await getInventoryStats({ compareWith: filter });
    return response.data;
  }, [filter,refresh]);

  return (
    <div>
      {loading && <Loader></Loader>}
      <PageHeader setRefresh={setRefresh} title="Thống kê hàng tồn kho"></PageHeader>
      <div className="flex items-center mt-5 justify-end gap-3">
        <label htmlFor="" className="block shrink-0">Lọc theo:</label>
        <select
          defaultValue={filter}
          className=" p-2 border border-gray-200 rounded-md outline-blue-500 bg-white"
          onChange={(e) => setFilter(e.target.value)}
          name=""
          id=""
        >
          <option value="week">Tuần</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-5">
        <CardStock
          title={"Nhập hàng"}
          value={formatPriceVND(data?.totalIncome?.value || 0)}
          filter={filter}

          change={
            data?.totalIncome?.change > 0
              ? "increment"
              : data?.totalIncome?.change < 0
              ? "decrement"
              : "noChange"
          }
          changeValue={Math.round(data?.totalIncome?.change || 0)}
        ></CardStock>
        <CardStock
          title={"Doanh thu"}
          value={formatPriceVND(data?.totalExpense?.value || 0)}
          filter={filter}
          change={
            data?.totalExpense?.change > 0
              ? "increment"
              : data?.totalExpense?.change < 0
              ? "decrement"
              : "noChange"
          }
          changeValue={Math.round(data?.totalExpense?.change || 0)}
        ></CardStock>
        <CardStock
          title={"Tiền lời ước tính (chưa trừ khuyến mại)"}
          filter={filter}

          value={formatPriceVND(
            data?.estimatedProfit?.value < 0 ? 0 : data?.estimatedProfit?.value
          )}
          change={
            data?.estimatedProfit?.change > 0
              ? "increment"
              : data?.estimatedProfit?.change < 0
              ? "decrement"
              : "noChange"
          }
          changeValue={Math.round(data?.estimatedProfit?.change || 0)}
        ></CardStock>
        <CardStock
          title={"Tổng sản phẩm còn trong kho"}
          value={formatNumber(data.totalProductIventory || 0)}
          isChange={false}
        ></CardStock>
        <CardStock
          title={"Tổng giá trị sản phẩm trong kho"}
          value={formatPriceVND(data.totalPriceProductIventory || 0)}
          isChange={false}
          change="increment"
          changeValue={"32"}
        ></CardStock>
        <CardStock
          title={"Sản phẩm đang chờ xuất kho"}
          value={"42"}
          change="increment"
          isChange={false}
          changeValue={"32"}
        ></CardStock>
      </div>
      <div className="grid grid-cols-2 mt-5 gap-5">
        <div>
          <ListOrder></ListOrder>
        </div>
        <div>
          <ListTopProduct></ListTopProduct>
        </div>
      </div>
    </div>
  );
};

export default StockInventory;
