/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Link } from "react-router-dom";
import { getInventoryLogById } from "../../../../service/InventoryLogs";
import { useApiCall } from "../../../../../hooks";
import { formatPrice, formathDate } from "../../../../../utils";
const ModalShow = ({ id, isOpen, setIsOpen }) => {
  const componentRef = useRef();
  const { data } = useApiCall(
    async () => {
      if (!isOpen) return {};
      const res = await getInventoryLogById(id);
      return res.data;
    },
    [id],
    {}
  );
  const handleClose = () => {
    setIsOpen(false);
  };
  if (!isOpen || !id) return null;
  return (
    <div>
      <div>
        <div className=" fixed left-0 right-0 top-0 z-40  h-[calc(100%-1rem)] max-h-auto w-full max-h-full  flex justify-center items-center overflow-y-auto bg-black bg-opacity-30 overflow-x-hidden antialiased md:inset-0">
          <div className="relative max-h-auto max-w-xl">
            {/* Modal content */}
            <div
              ref={componentRef}
              className="relative rounded-lg p-5 bg-white shadow "
            >
              {/* Modal header */}
              <div className="flex items-center justify-between rounded-t border-b pb-3 ">
                <h3 className="text-lg font-semibold uppercase">
                  Chi tiết hóa đơn
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
                            Ngày tạo:{" "}
                            <span>{formathDate(data?.created_at)}</span>
                          </li>
                          <li className="border-b py-2">
                            Ghi chú: <span>{data?.note}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="relative  border-b border-gray-200 ">
                        <table className="w-full text-left font-medium  md:table-fixed">
                          <tbody className="divide-y divide-gray-200">
                            {data?.product?.map((item, index) => (
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
                                    <Link
                                      title={item.name + " - " + item.code}
                                      to={`/products/${item.slug}-${item.id}/edit`}
                                      className="hover:underline text-ecl "
                                    >
                                      {item.name} - {item.code}
                                    </Link>
                                  </div>
                                </td>
                                <td className="p-4 text-base font-normal text-right ">
                                  x{item.quantity}
                                </td>
                                <td className="p-4 text-right text-base font-bold ">
                                  {formatPrice(item.amount || 0)}
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
                                Tổng số sản phẩm
                              </dt>
                              <dd className="text-base font-medium ">
                                {" "}
                                x{data?.quantity}
                              </dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-4">
                              <dt className="text-gray-500 dark:text-gray-400">
                                Số tiền phải trả
                              </dt>
                              <dd className="text-base font-medium ">
                                {formatPrice(data?.total || 0)}
                              </dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-4">
                              <dt className="text-gray-500 dark:text-gray-400">
                                Dự tính tiền lời mỗi sản phẩm
                              </dt>
                              <dd className="text-base font-medium ">$99</dd>
                            </dl>
                          </div>
                          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-5 ">
                            <dt className="text-lg font-bold ">Tổng cộng</dt>
                            <dd className="text-lg font-bold ">
                              {formatPrice(data?.total || 0)}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className=" rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-green-600"
                      >
                        In hóa đơn
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-md bg-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                      >
                        Thoát
                      </button>
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
