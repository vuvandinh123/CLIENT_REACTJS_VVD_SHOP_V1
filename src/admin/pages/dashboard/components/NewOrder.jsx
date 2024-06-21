import React from "react";
import { useApiCall } from "../../../../hooks";
import { getNewOrderPending } from "../../../service/Order";
import moment from "moment";

const NewOrder = () => {
  const { data } = useApiCall(async () => {
    const res = await getNewOrderPending();
    return res.data;
  });
  console.log(data);
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
      <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
        Đơn hàng mới cần xác nhận
      </h3>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                # Mã Đơn hàng
              </th>
              <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                Trạng thái
              </th>
              <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px" >
                Ngày đặt hàng
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.map((item) => {
              return (
                <tr key={item.id} className="text-gray-500">
                  <th className="border-t-0 font-bold text-left px-4 align-middle text-sm whitespace-nowrap p-4 ">
                    #{item.id}
                  </th>
                  <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                    <span className="px-3 py-1 bg-yellow-400 rounded-md text-yellow-700">Chờ xác nhận</span>
                  </td>
                  <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                        {moment(item.order_date).format("DD/MM/YY")}                      
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewOrder;
