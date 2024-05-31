/* eslint-disable react/prop-types */
import { Field, Form, Formik } from "formik";
import { initInventory } from "../../../../data/initValueFormik";
import { inventorySchema } from "../../../../data/schema";
import PriceFiled from "../../../../components/fields/PriceFiled";
import NumberFiled from "../../../../components/fields/NumberFiled";
import { useEffect, useRef, useState } from "react";
import { formatPrice, removeCommas } from "../../../../../utils";
import { createInventoryLog } from "../../../../service/InventoryLogs";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
// icons
import { LuClipboardEdit } from "react-icons/lu";
import ModalSelectVariant from "./ModalSlectVariant";

const ModalAddInventory = (props) => {
  const { data, setRefresh, refresh } = props;
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef(null);
  const [isVariant, setIsVariant] = useState(false);
  const [variant, setVariant] = useState({});
  const handleSubmit = async (values) => {
    // formath giá
    const price = removeCommas(values.import_price);
    const price2 = variant?.price ?? data.price;
    // check giá nhập
    if (price > Number(price2)) {
      toast.error("Giá nhập phải nhỏ hơn hoặc bằng đơn giá");
      return;
    }
    const product = [
      {
        product_id: data.id,
        import_price: price,
        quantity: values.quantity,
        variant: variant,
      },
    ];
    // tạo nhập hàng và tăng số lượng
    const res = await createInventoryLog({
      note: values.note,
      product: product,
    });
    if (res.status === 201) {
      toast.success("Nhập hàng thành công");
      setIsOpen(false);
      setRefresh(!refresh);
    }
  };
  useEffect(() => {
    if (data.type !== "single") setIsVariant(true);
  }, [data.type]);
  if (data.type !== "single" && isOpen && isVariant)
    return (
      <ModalSelectVariant
        id={data.id}
        setIsVariant={setIsVariant}
        isVariant={isVariant}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setVariant={setVariant}
        variant={variant}
      ></ModalSelectVariant>
    );
  const handleClose = () => {
    setIsOpen(false);
    setVariant({});
  };
  return (
    <div>
      <div>
        {/* Modal toggle */}
        <button type="button" onClick={() => setIsOpen(true)} className="">
          {data.quantity === 0 ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
              Out of Stock ( {data.quantity} )
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
              In Stock ( {data.quantity} )
            </span>
          )}
        </button>

        {/* Main modal */}
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className={` overflow-y-auto overflow-x-hidden bg-gray-500 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 left-0 z-50 w-full transition-all  md:inset-0 h-modal md:h-full ${
            isOpen ? "visible" : "invisible"
          }`}
        >
          <div
            className={`relative p-4 w-full max-w-2xl  h-full md:h-auto transition-all ${
              isOpen
                ? "scale-100 opacity-100 visible"
                : "scale-75 opacity-0 invisible"
            }`}
          >
            {/* Modal content */}
            <div className="relative p-4 bg-white rounded-lg shadow-lg  sm:p-5">
              {/* Modal header */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 ">
                  Nhập thêm hàng
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
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
              {/* Modal body */}
              <Formik
                initialValues={initInventory}
                validationSchema={inventorySchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                <Form ref={formRef}>
                  <div className="mb-5">
                    <label
                      htmlFor=""
                      className="mb-3 flex items-center gap-2 justify-between"
                    >
                      <h3 className="font-semibold text-[15px]">Sản phẩm</h3>
                      <Link
                        className="text-[15px] text-blue-500 flex gap-2"
                        to={`/admin/products/${data.slug}-${data?.id}/edit`}
                      >
                        <LuClipboardEdit></LuClipboardEdit> Sửa
                      </Link>
                    </label>
                    <div className="flex border p-4 rounded-lg shadow-lg items-start gap-2">
                      <div className="w-24 shrink-0 max-h-24 border overflow-hidden rounded-md">
                        <img
                          className="w-full h-full"
                          src={data?.thumbnail}
                          alt=""
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[15px] text-ecl">
                          <Link
                            className="hover:text-gray-800 min-h-16 block"
                            to={`/admin/products/${data.slug}-${data?.id}/edit`}
                          >
                            {data?.name}
                          </Link>
                        </h3>
                        {variant?.code ? (
                          <p className="mt-3">{variant.code}</p>
                        ) : null}
                        <div className="flex gap-5 items-center mt-3">
                          <p>
                            Giá: {formatPrice(variant?.price || data?.price)}
                          </p>
                          <p>Số lượng: {variant?.stock || data?.quantity}</p>
                          <p>Đã bán: {data?.sold}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <NumberFiled
                        name="quantity"
                        label="Số lượng nhập thêm"
                        placeholder="Số lượng nhập thêm"
                        location={"Chiếc"}
                      ></NumberFiled>
                      <span></span>
                    </div>

                    <div>
                      <PriceFiled
                        name="import_price"
                        label="Giá nhập"
                        placeholder="Giá nhap"
                        location={"USD"}
                      ></PriceFiled>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Ghi chú
                      </label>
                      <Field
                        as="textarea"
                        name="note"
                        rows={4}
                        className="block p-2.5 w-full outline-blue-500 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                        placeholder="Ghi chú"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex justify-end gap-2 items-center px-5 py-2 rounded-md hover:bg-gray-300 bg-gray-200 text-gray-800 "
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="flex justify-end gap-1 items-center px-3 py-2 rounded-md bg-blue-500 text-white"
                    >
                      <svg
                        className="mr-1 -ml-1 w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Lưu
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddInventory;
