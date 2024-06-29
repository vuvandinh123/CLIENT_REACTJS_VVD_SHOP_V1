/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { getVariantFirebaseById } from "../../../../../service/InventoryLogs";
import { Link } from "react-router-dom";
import { formatPriceVND } from "../../../../../../utils";

// icons

const ModalSelectVariant = (props) => {
  const {
    id,
    isVariant,
    setIsVariant,
    isOpen,
    setIsOpen,
    variant,
    setVariant,
  } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const res = await getVariantFirebaseById(id);
        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (isVariant && isOpen) {
      fetchApi();
    }
  }, [id, isVariant, isOpen]);
  return (
    <div>
      <div>
        <div
          aria-hidden="true"
          className={` overflow-y-auto overflow-x-hidden bg-gray-500 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 left-0 z-50 w-full transition-all  md:inset-0 h-modal md:h-full`}
        >
          <div
            className={`relative p-4 w-full max-w-2xl  h-full md:h-auto transition-all `}
          >
            {/* Modal content */}
            <div className="relative p-4 bg-white rounded-lg shadow-lg  sm:p-5">
              {/* Modal header */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 ">
                  Chọn biến thể sản phẩm
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div>
                <div className="grid grid-cols-6 p-3">
                  <div className="col-span-3">Tên sản phẩm</div>
                  <div className="col-span-2">Giá</div>
                  <div className="col-span-1">Số lượng</div>
                </div>
                <div className="">
                  {!loading &&
                    data &&
                    data?.map((item, index) => (
                      <label
                        key={index}
                        onClick={() => setVariant(item)}
                        className={`grid border rounded-md mb-2 cursor-pointer hover:bg-gray-100 grid-cols-6 p-3 ${
                          variant.code === item.code
                            ? "border-blue-500 bg-gray-100"
                            : ""
                        }`}
                      >
                        <div className="col-span-3">
                          <div className="flex items-center gap-2">
                            <div className="w-10 max-h-10 shrink-0">
                              <img
                                src={item.thumbnail}
                                className="w-full"
                                alt=""
                              />
                            </div>
                            <h3 className="text-ecl">
                              {item.name} - {item.code}
                            </h3>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <p className="">
                            {formatPriceVND(Number(item.price) || 0)}
                          </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                          <span>{item.stock}</span>
                        </div>
                      </label>
                    ))}
                  <div className="animate-pulse">
                    {loading &&
                      Array(5)
                        .fill(0)
                        .map((item, index) => (
                          <label
                            key={index}
                            className={`grid border   rounded-md mb-2 cursor-pointer hover:bg-gray-100 grid-cols-6 p-3 `}
                          >
                            <div className="col-span-3 ">
                              <div className="bg-slate-200 rounded-md w-32 h-5"></div>
                            </div>
                            <div className="col-span-2  flex items-center">
                              <div className="bg-slate-200 rounded-md w-10 h-5"></div>
                            </div>
                            <div className="col-span-1  flex items-center">
                              <div className="bg-slate-200 rounded-md w-10 h-5"></div>
                            </div>
                          </label>
                        ))}
                  </div>
                  {!loading && data.length === 0 && (
                    <div className="text-center my-5">
                      Không tìm thấy sản phẩm
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsVariant(false)}
                  className="bg-blue-500 text-white px-5 py-2 rounded-md"
                >
                  Chọn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectVariant;
