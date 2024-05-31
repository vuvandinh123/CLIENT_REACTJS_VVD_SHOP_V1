import React from "react";
import PageHeader from "../../../components/common/PageHeader";
import CardStock from "./components/CardStock";
import ListOrder from "./components/ListOrder";
import ListTopProduct from "./components/ListTopProduct";

const StockInventory = () => {
  return (
    <div>
      <PageHeader title="Thống kê hàng tồn kho"></PageHeader>
      <div className="grid grid-cols-3 gap-2 mt-5">
        <CardStock
          title={"Nhập hàng"}
          value={"$240.94"}
          change="increment"
          changeValue={"62"}
        ></CardStock>
        <CardStock
          title={"Xuất hàng"}
          value={"$240.94"}
          change="decrement"
          changeValue={"32"}
        ></CardStock>
        <CardStock
          title={"Tiền lời ước tính (chưa trừ khuyến mại)"}
          value={"$240.94"}
          change="increment"
          changeValue={"32"}
        ></CardStock>
        <CardStock
          title={"Tổng sản phẩm còn trong kho"}
          value={"240"}
          change="increment"
          isChange={false}
          changeValue={"32"}
        ></CardStock>
        <CardStock
          title={"Tổng giá trị sản phẩm trong kho"}
          value={"$222.240"}
          isChange={false}
          change="increment"
          changeValue={"32"}
        ></CardStock>
        <CardStock
          title={"Sản phẩm đang chờ xuất kho"}
          value={"123"}
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
