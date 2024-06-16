import useApiCall from "../../../hooks/useApiCall";
import { formatPriceVND } from "../../../utils";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import { getOrderStats } from "../../service/Order";
import { getCountFollows } from "../../service/UserFollow";
import Card from "./components/Card";

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
              value={data.total_success}
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
            <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900">
                  Latest Customers
                </h3>
                <a
                  href="#"
                  className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
                >
                  View all
                </a>
              </div>
              <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200">
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://demo.themesberg.com/windster/images/users/neil-sims.png"
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Neil Sims
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          <a
                            href="/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="17727a767e7b57607e7973646372653974787a"
                          >
                            [email&nbsp;protected]
                          </a>
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        $320
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://demo.themesberg.com/windster/images/users/bonnie-green.png"
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Bonnie Green
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          <a
                            href="/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="d4b1b9b5bdb894a3bdbab0a7a0b1a6fab7bbb9"
                          >
                            [email&nbsp;protected]
                          </a>
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        $3467
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://demo.themesberg.com/windster/images/users/michael-gough.png"
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Michael Gough
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          <a
                            href="/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="57323a363e3b17203e3933242332257934383a"
                          >
                            [email&nbsp;protected]
                          </a>
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        $67
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://demo.themesberg.com/windster/images/users/thomas-lean.png"
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Thomes Lean
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          <a
                            href="/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="284d45494144685f41464c5b5c4d5a064b4745"
                          >
                            [email&nbsp;protected]
                          </a>
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        $2367
                      </div>
                    </div>
                  </li>
                  <li className="pt-3 sm:pt-4 pb-0">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://demo.themesberg.com/windster/images/users/lana-byrd.png"
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Lana Byrd
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          <a
                            href="/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="a2c7cfc3cbcee2d5cbccc6d1d6c7d08cc1cdcf"
                          >
                            [email&nbsp;protected]
                          </a>
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        $367
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
              <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
                Acquisition Overview
              </h3>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                        Top Channels
                      </th>
                      <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                        Users
                      </th>
                      <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="text-gray-500">
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                        Organic Search
                      </th>
                      <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                        5,649
                      </td>
                      <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">30%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-cyan-600 h-2 rounded-sm"
                                style={{ width: "30%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-500">
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                        Referral
                      </th>
                      <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                        4,025
                      </td>
                      <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">24%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-orange-300 h-2 rounded-sm"
                                style={{ width: "24%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-500">
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                        Direct
                      </th>
                      <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                        3,105
                      </td>
                      <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">18%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-teal-400 h-2 rounded-sm"
                                style={{ width: "18%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-500">
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                        Social
                      </th>
                      <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                        1251
                      </td>
                      <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">12%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-pink-600 h-2 rounded-sm"
                                style={{ width: "12%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-500">
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                        Other
                      </th>
                      <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                        734
                      </td>
                      <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">9%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-sm"
                                style={{ width: "9%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-500">
                      <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">
                        Email
                      </th>
                      <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">
                        456
                      </td>
                      <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">7%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-sm"
                                style={{ width: "7%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
