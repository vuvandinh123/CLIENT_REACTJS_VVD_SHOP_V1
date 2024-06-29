import { Loader } from "../../../../components/common";
import { useApiCall } from "../../../../hooks";
import PageHeader from "../../../components/common/PageHeader";
import { getDashboradAdmin, getOrderStats } from "../../../service/Order";
import { getCountFollows } from "../../../service/UserFollow";
import { formatPriceVND } from "../../../../utils";
import FollowsNew from "../../seller/dashboard/components/FollowsNew";
import NewOrder from "../../seller/dashboard/components/NewOrder";
import Card from "../../../components/common/Card";
import { useTranslation } from "react-i18next";
import UserNew from "./UserNew";

const Dashboard = () => {
  const { t } = useTranslation();
  const { data, loading } = useApiCall(async () => {
    const res = await getDashboradAdmin();
    return {
      ...res.data,
    };
  });
  return (
    <div>
      {loading && <Loader></Loader>}
      <PageHeader title="Bảng điều khiển"></PageHeader>
      <main>
        <div>
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Card
              label={t("admin.dashboard.total_order")}
              description={"Số đơn hàng được đặt trong ngày"}
              value={data.total_orders || 0}
              percent={12}
            ></Card>
            <Card
              label={"Khách hàng mới"}
              description={"Số lượng người dùng tạo tài khoản trong ngày"}
              value={data.count_total_sigup || 0}
              percent={12}
            ></Card>
            <Card
              label={"Doanh thu trong ngày"}
              description={"Doanh thu khi đơn hàng đã được thanh toán"}
              value={formatPriceVND(Number(data.total_success || 0))}
              percent={12}
            ></Card>
            <Card
              label={"Doanh thu đơn hàng"}
              description={"Tổng doanh thu đơn hàng trong ngày"}
              value={formatPriceVND(Number(data.total_pending || 0))}
              percent={12}
            ></Card>
            <Card
              label={"Số đơn hàng mới cần duyệt"}
              description={"Số đơn hàng chờ được xác nhận "}
              value={data.new_orders_pending || 0}
              percent={12}
            ></Card>
            <Card
              label={"Số đơn hàng thành công "}
              description={"Tổng số đơn hàng đã được giao đến khách hàng"}
              value={data.successful_orders || 0}
              percent={12}
            ></Card>
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
            <UserNew></UserNew>
            <NewOrder></NewOrder>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
