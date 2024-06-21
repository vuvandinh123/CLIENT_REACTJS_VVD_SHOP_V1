import useApiCall from "../../../hooks/useApiCall";
import { formatPriceVND } from "../../../utils";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import { getOrderStats } from "../../service/Order";
import { getCountFollows } from "../../service/UserFollow";
import Card from "./components/Card";
import FollowsNew from "./components/FollowsNew";
import NewOrder from "./components/NewOrder";

const Dashboard = () => {
  const { data, loading } = useApiCall(async () => {
    const res = await getOrderStats();
    const res2 = await getCountFollows();
    return {
      ...res.data,
      countFollow: res2.data.count,
    };
  }, []);
  return (
    <div>
      {loading && <Loader></Loader>}
      <PageHeader title="Bảng điều khiển"></PageHeader>
      <main>
        <div>
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Card
              label={"Tổng số đơn hàng"}
              description={"Số đơn hàng được đặt trong ngày"}
              value={data.total_orders}
              percent={12}
            ></Card>
            <Card
              label={"Số người theo dõi mới"}
              description={
                "Số lượng người dùng đã theo dõi cửa hàng trong ngày"
              }
              value={data.countFollow}
              percent={12}
            ></Card>
            <Card
              label={"Doanh thu trong ngày"}
              description={"Doanh thu khi đơn hàng đã được thanh toán"}
              value={formatPriceVND(Number(data.total_success))}
              percent={12}
            ></Card>
            <Card
              label={"Doanh thu đơn hàng"}
              description={"Tổng doanh thu đơn hàng trong ngày"}
              value={formatPriceVND(Number(data.total_pending))}
              percent={12}
            ></Card>
            <Card
              label={"Số đơn hàng mới cần duyệt"}
              description={"Số đơn hàng chờ được xác nhận "}
              value={data.new_orders_pending}
              percent={12}
            ></Card>
            <Card
              label={"Số đơn hàng thành công "}
              description={"Tổng số đơn hàng đã được giao đến khách hàng"}
              value={data.successful_orders}
              percent={12}
            ></Card>
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
            <FollowsNew></FollowsNew>
            <NewOrder></NewOrder>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
