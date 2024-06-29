/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useApiCall } from "../../../../../hooks";
import { formatPriceVND, formathDate } from "../../../../../utils";
import { getOrderIdShop, patchStatusOrder } from "../../../../service/Order";
import { statusOrder } from "../../../../data/statusOrder";
import toast from "react-hot-toast";
const ModalShow = ({ id, isOpen, setIsOpen, setRefresh }) => {
  const componentRef = useRef();
  const { data } = useApiCall(
    async () => {
      if (!isOpen) return {};
      const res = await getOrderIdShop(id);
      return res.data;
    },
    [id,isOpen],
    {}
  );
  const handleClickConfirm = async () => {
    const res = await patchStatusOrder({
      status: "CONFIRMED",
      orderId: id,
    });
    if (res.status === 200) {
      toast.success("Xác nhận đơn hàng thành công");
      setIsOpen(false);
      setRefresh((prev) => !prev);
    }
  };
  const handleClickCancel = async () => {
    const res = await patchStatusOrder({
      status: "CANCEL",
      orderId: id,
    });
    if (res.status === 200) {
      toast.success("Huỷ đơn hàng thành công");
      setIsOpen(false);
      setRefresh((prev) => !prev);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  if (!isOpen || !id) return null;
  return (
    <div>
      <div>
        <div className=" fixed left-0 right-0 top-0 z-40  max-h-auto w-full max-h-full  flex justify-center items-center overflow-y-auto bg-black bg-opacity-30 overflow-x-hidden antialiased md:inset-0">
          <div className="relative max-h-auto max-w-xl">
            {/* Modal content */}
            <div
              ref={componentRef}
              className="relative rounded-lg p-5 bg-white shadow "
            >
              {/* Modal header */}
              <div className="flex items-center justify-between rounded-t border-b pb-3 ">
                <h3 className="text-lg font-semibold uppercase">
                  Chi tiết đơn hàng
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 "
                  data-modal-toggle="billingInformationModal"
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <section className=" antialiased  md:py-5">
                <form
                  action="#"
                  className="mx-auto flex flex-col justify-between gap-5 max-w-screen-xl px-4 2xl:px-0"
                >
                  <div className="mx-auto max-w-3xl">
                    <div className="">
                      <div className="">
                        <ul className="flex  flex-col ">
                          <li className="border-b py-2">
                            Mã hóa đơn: <span>#{data?.id}</span>
                          </li>
                          <li className="border-b py-2">
                            Người nhận:{" "}
                            <span>{data.lastName + " " + data?.firstName}</span>
                          </li>
                          <li className="border-b py-2">
                            Email: <span>{data.email}</span>
                          </li>
                          <li className="border-b py-2">
                            Trạng thái đơn hàng:{" "}
                            <span className="border px-2 bg-green-500 text-white py-1 rounded-md">
                              {
                                statusOrder.find(
                                  (item) => item.code === data?.status
                                )?.name
                              }
                            </span>
                          </li>
                          <li className="border-b py-2">
                            Ngày tạo:{" "}
                            <span>{formathDate(data?.order_date)}</span>
                          </li>
                          <li className="border-b py-2">
                            Ghi chú: <span>{data?.note}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="relative  border-b border-gray-200 ">
                        <table className="w-full text-left font-medium  md:table-fixed">
                          <tbody className="divide-y divide-gray-200">
                            {data?.products?.map((item, index) => (
                              <tr key={index}>
                                <td className=" py-4 md:w-[50%]">
                                  <div className="flex items-center gap-4">
                                    <a
                                      href="#"
                                      className="flex items-center aspect-square w-10 h-10 shrink-0"
                                    >
                                      <img
                                        className="h-auto w-full max-h-full"
                                        src={
                                          item.thumbnail
                                            ? item.thumbnail
                                            : "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                        }
                                        alt="imac image"
                                      />
                                    </a>
                                    <span
                                      title={item.name + " - " + item.code}
                                      className=" text-ecl "
                                    >
                                      {item.name} - {item.code}
                                    </span>
                                  </div>
                                </td>
                                <td className="p-4 text-base font-normal text-right ">
                                  x{item.quantity}
                                </td>
                                <td className="p-4 text-right text-base font-bold ">
                                  {formatPriceVND(Number(item.price) || 0)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 space-y-6">
                        <h4 className="text-xl font-semibold ">Chi tiết</h4>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <dl className="flex items-center justify-between gap-4">
                              <dt className="text-gray-500 dark:text-gray-400">
                                Giảm giá
                              </dt>
                              <dd className="text-base font-medium ">
                                {data.type_price === "percent" ? (
                                  <span className="text-red-500">
                                    {data?.value}%
                                  </span>
                                ) : (
                                  <span className="text-red-500">
                                    {formatPriceVND(Number(data?.value) || 0)}
                                  </span>
                                )}
                              </dd>
                            </dl>
                          </div>
                          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-5 ">
                            <dt className="text-lg font-bold ">Tổng cộng</dt>
                            <dd className="text-lg font-bold ">
                              {
                                data.type_price === "percent" ? (
                                  <span>{formatPriceVND(Number(data?.amount - data?.amount * ((data?.value/100))) || 0)}</span>
                                )
                                :
                                  <span>{formatPriceVND(Number(data?.amount - data?.value) || 0)}</span>
                              }
                              
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="flex gap-2">
                      {data.status === "PENDING" ? (
                        <>
                          <button
                            type="button"
                            onClick={handleClickConfirm}
                            className=" rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-green-600"
                          >
                            Xác nhận đơn hàng
                          </button>
                          <button
                            type="button"
                            onClick={handleClickCancel}
                            className=" rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-red-600"
                          >
                            Hủy đơn hàng
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={handleClose}
                          className=" rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-red-600"
                        >
                          Thoát
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalShow;
