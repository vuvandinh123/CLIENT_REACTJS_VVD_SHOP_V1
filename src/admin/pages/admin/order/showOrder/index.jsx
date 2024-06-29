/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import {
  getOrderIdAdmin,
  patchStatusOrderAdmin,
} from "../../../../service/Order";
import moment from "moment";
import { formatPriceVND } from "../../../../../utils";
import { PhoneCall, Star } from "phosphor-react";
import { FaAngleLeft, FaStar } from "react-icons/fa6";
import TimeLine from "./components/TimeLine";
import { Badge, Button } from "keep-react";
import Swal from "sweetalert2";
import { useState } from "react";
import Loader from "../../../../components/common/Loader";

const ShowOrder = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(null);
  const [isSave, setIsSave] = useState(false);
  const { isPending, data } = useQuery({
    queryKey: ["adminOrder", { id, isSave }],
    queryFn: async () => {
      const data = await getOrderIdAdmin(id);
      setStatus(data?.data?.status);
      return data.data;
    },
    staleTime: 60 * 1000,
  });
  const data2 = [
    {
      id: 1,
      name: "Chờ xác nhận",
      code: "PENDING",
    },
    {
      id: 2,
      name: "Đã xác nhận",
      code: "CONFIRMED",
    },
    {
      id: 3,
      name: "Đang vận chuyển",
      code: "SHIPPING",
    },
    {
      id: 4,
      name: "Đang giao",
      code: "DELIVERED",
    },
    {
      id: 5,
      name: "Thành công",
      code: "SUCCESS",
    },
    {
      id: 6,
      name: "Hủy đơn",
      code: "CANCEL",
    },
  ];
  const i = data2.findIndex((item) => item.code === data?.status);
  const handleClickSave = async () => {
    if (data.status === status) {
      return;
    }
    Swal.fire({
      title: "Bạn có muốn cập nhật lại trạng thái đơn hàng",
      showDenyButton: true,
      //   showCancelButton: true,
      confirmButtonText: "Cập nhật",
      icon: "warning",
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await patchStatusOrderAdmin({
          status: status,
          orderId: id,
        });
        if (res.status === 200) {
          setIsSave(!isSave);
          Swal.fire("Thành công!", "", "success");
          queryClient.invalidateQueries("adminListOrder");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  if (isPending) return <Loader></Loader>;
  return (
    <div>
      <div className="py-14 mt-5 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className=" my-3 flex items-center justify-between gap-2">
          <div>
            <Link
              to={"/admin/orders"}
              className="flex ms-3 px-2 py-2 hover:text-gray-900 hover:underline text-gray-600 items-center gap-2  "
            >
              <FaAngleLeft></FaAngleLeft> Quay lại
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-start item-start space-y-2 flex-col">
            <h1 className="text-3xl flex items-center gap-3  lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Đơn hàng #{id}
              <Badge showIcon={true} color="success">
                {data2[i]?.name}
              </Badge>
            </h1>
            <p className="text-base flex gap-3 font-medium leading-6 text-gray-600">
              <span>Thời gian:</span>
              {moment(data?.order_date).format("DD/MM/YYYY HH:mm:ss")}
            </p>
          </div>
          <div className="flex gap-1">
            <select
              className="border border-gray-300 px-4 py-2 rounded bg-white outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {data2.map((item, index) => {
                return (
                  <option value={item.code} key={index} disabled={index < i}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <Button
              onClick={handleClickSave}
              disabled={status === data?.status}
              size="sm"
            >
              Cập nhật
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">
                Sản phẩm
              </p>
              {data?.order_detail?.map((item, index) => (
                <div
                  key={index}
                  className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                >
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <img
                      className="w-full hidden md:block"
                      src={item?.product_thumbnail}
                      alt="dress"
                    />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-3">
                      <h3 className=" font-semibold text-ecl leading-6 text-gray-800">
                        <Link
                          className="block w-full hover:underline"
                          to={`/admin/products/${item.product_slug}-${item?.product_id}/edit`}
                        >
                          {item?.product_name}
                        </Link>
                      </h3>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm  leading-none text-gray-800">
                          {item?.code ? <span>SKU: {item?.code}</span> : null}
                        </p>
                      </div>
                    </div>
                    <div className="flex ms-4 justify-between space-x-8 items-start w-full">
                      <p className="text-base  xl:text-lg leading-6">
                        {formatPriceVND(Number(item?.product_price))}
                      </p>
                      <p className="text-base  xl:text-lg leading-6 text-gray-800">
                        x {item?.quantity}
                      </p>
                      <p className="text-base  xl:text-lg font-semibold leading-6 text-red-500">
                        {formatPriceVND(
                          Number(item?.product_price * item?.quantity)
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center  md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6">
                <h3 className="text-xl  font-semibold leading-5 text-gray-800">
                  Đơn hàng
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base  leading-4 text-gray-800">Tổng</p>
                    <p className="text-base  leading-4 text-gray-600">
                      {formatPriceVND(Number(data?.amount))}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base  leading-4 text-gray-800">
                      Giảm giá{" "}
                    </p>
                    <p className="text-base  leading-4 text-gray-600">
                      {formatPriceVND(0)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base  leading-4 text-gray-800">
                      Vận chuyển
                    </p>
                    <p className="text-base  leading-4 text-gray-600">
                      {formatPriceVND(Number(data?.cost || 0))}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base  font-semibold leading-4 text-gray-800">
                    Thanh toán
                  </p>
                  <p className="text-xl  font-bold  leading-4 text-red-600">
                    {formatPriceVND(Number(data?.total_amount))}
                  </p>
                </div>
              </div>
              <div className="flex flex-col  px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6">
                <h3 className="text-xl  font-semibold leading-5 text-gray-800">
                  Vận chuyển
                </h3>
                <div className="flex  justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6  font-semibold text-gray-800">
                        {data?.deliver_name}
                        <br />
                        <span className="font-normal">
                          {data?.estimated_time}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6  text-gray-800">
                    {formatPriceVND(Number(data?.cost))}
                  </p>
                </div>
                <h3 className="text-xl  font-semibold leading-5 text-gray-800">
                  Thanh toán
                </h3>
                <div className="flex  justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-10 h-10">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://gachbongdanang.com/wp-content/uploads/2021/03/payment-icon-flatelements.png"
                      />
                    </div>
                    <div className="flex flex-col gap-2 justify-start items-center">
                      <p className="text-md leading-6  font-semibold text-gray-800">
                        {data?.payment_method === "deliver"
                          ? "Thanh toán khi nhận hàng"
                          : "Thanh toán online"}
                      </p>
                      <p>
                        {data?.payment_status === "unpaid" ? (
                          <Badge showIcon={true} color="warning">
                            Chưa thanh toán
                          </Badge>
                        ) : (
                          <Badge showIcon={true} color="success">
                            Đã thanh toán
                          </Badge>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50  w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <TimeLine status={data?.status}></TimeLine>
            <h3 className="text-xl  font-semibold leading-5 text-gray-800">
              Khách hàng
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={
                      data?.logo_customer ||
                      "https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    }
                    alt="avatar"
                  />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base uppercase  font-semibold leading-4 text-left text-gray-800">
                      {data?.last_name + " " + data?.first_name}
                    </p>
                    <p className="text-[12px]  leading-5 text-gray-400">
                      10 Đơn đặt hàng trước đó
                    </p>
                  </div>
                </div>
                <div className=" text-gray-800  py-4 border-b border-gray-200 w-full">
                  <div className="flex items-center space-x-3">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 7L12 13L21 7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="cursor-pointer text-sm leading-5 ">
                      {data?.email}
                    </p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <PhoneCall size={20}></PhoneCall>
                    <p className="cursor-pointer text-sm leading-5 ">
                      (+84) {data?.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">
                      Địa chỉ nhận hàng
                    </p>
                    <p className="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {data?.address_detail +
                        ", " +
                        data?.province +
                        ", " +
                        data?.nation}
                    </p>
                  </div>
                  <div className="flex w-full justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p className="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">
                      Gửi từ
                    </p>
                    <p className="border p-3 rounded-md shadow-md w-full flex  gap-3  text-center md:text-left text-sm leading-5 text-gray-600">
                      <div className="w-12 h-12 shrink-0 rounded-full border overflow-hidden">
                        <img
                          className="w-full h-full"
                          src={data?.shop_logo}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        {data?.shop_name}
                        <p className="flex gap-2">
                          <FaStar size={16} color="#FFC107"></FaStar>{" "}
                          {data?.shop_rating}
                        </p>
                      </div>
                    </p>
                  </div>
                </div>
                <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                  <Link
                    to={`/admin/shops/${data?.shop_id}/edit`}
                    className="mt-6 md:mt-0 flex justify-center bg-white  dark:bg-transparent  py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-100 shadow-md  w-96 2xl:w-full text-base font-medium leading-4 text-gray-800 transition-all"
                  >
                    Xem cửa hàng
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOrder;
