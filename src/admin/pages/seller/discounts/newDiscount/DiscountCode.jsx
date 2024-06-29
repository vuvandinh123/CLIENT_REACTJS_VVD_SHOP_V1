import { Field, useFormikContext } from "formik";
import toast from "react-hot-toast";
import TextFiled from "../../../../components/fields/TextFiled";
import {
  formatNumber,
  generateDiscountCode,
  removeCommas,
} from "../../../../../utils";
const DiscountCode = () => {
  const { setFieldValue, values } = useFormikContext();
  const handleChangeCode = (e) => {
    if (e.target.value.length <= 10) {
      setFieldValue("code", e.target.value);
    }
  };
  const handleBeforeInput = (event) => {
    const inputValue = event.data;
    const isNumber = /^[0-9]$/.test(inputValue);
    if (!isNumber) {
      event.preventDefault();
    }
  };
  const handleClickAutoCode = () => {
    setFieldValue("code", generateDiscountCode());
  };
  return (
    <div>
      <div
        className={
          "w-full bg-white shadow-md rounded-lg py-5 pb-10 sm:overflow-auto p-4"
        }
      >
        <h3 className="text-xl font-bold">Tổng quan</h3>
        <p className="mt-2 mb-4 text-sm font-medium text-gray-400">
          Các thông tin cơ bản của mã giảm giá
        </p>
        <div>
          <div className="">
            <TextFiled
              name="name"
              label="Tiêu đề giảm giá"
              type="text"
              placeholder="Tiêu đề giảm giá"
              id="name"
            ></TextFiled>
          </div>
          <div className="mt-5">
            <label htmlFor="code" className="flex items-center justify-between">
              <span className="mb-2  block text-sm capitalize text-navy-700">
                Mã giảm giá
              </span>
              <span
                onClick={handleClickAutoCode}
                className="text-sm cursor-pointer hover:text-blueSecondary hover:underline"
              >
                Tạo mã ngẫu nhiên
              </span>
            </label>
            <Field
              value={values.code}
              onChange={handleChangeCode}
              name="code"
              placeholder="Code"
              type="text"
              className="w-full    rounded-md border py-3 px-5 outline-none focus:border-blue-400"
            />
          </div>
          <div className="mt-5">
            <TextFiled
              name="description"
              label="Mô tả"
              type="text"
              placeholder="Mô tả"
              id="description"
            ></TextFiled>
          </div>
          <div className="mt-5">
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor=""
                  className="my-2 block  text-sm text-navy-700 ms-2"
                >
                  Loại giảm giá
                </label>
                <Field
                  as="select"
                  name="type"
                  className="w-full  py-3  rounded-md border bg-white px-2 outline-blue-300"
                >
                  <option value="products">Giảm giá sản phẩm</option>
                  <option value="shipping">Giảm giá vận chuyển</option>
                </Field>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="my-2  block text-sm text-navy-700 ms-2"
                >
                  Phương thức giảm giá
                </label>
                <Field
                  as="select"
                  name="type_price"
                  onChange={(e) => {
                    setFieldValue("type_price", e.target.value);
                    setFieldValue("value", "");
                  }}
                  value={values.type_price}
                  className="w-full  py-3  rounded-md border bg-white px-2 outline-blue-300"
                >
                  <option value="fixed_amount">Số tiền</option>
                  <option value="percent">Phần trăm</option>
                </Field>
              </div>
              <div className="relative">
                <label
                  htmlFor=""
                  className="my-2  block text-sm text-navy-700 ms-2"
                >
                  Giảm giá
                </label>
                <Field
                  type="text"
                  placeholder="0"
                  name="value"
                  value={values.value}
                  onChange={(e) => {
                    setFieldValue("value", e.target.value);
                  }}
                  onBeforeInput={handleBeforeInput}
                  onBlur={(e) => {
                    if (e.target.value !== "") {
                      if (
                        values.type_price === "percent" &&
                        Number(e.target.value) > 100
                      ) {
                        toast.error("Discount must be less than 100");
                        setFieldValue("value", 100);
                      }
                    }
                  }}
                  className="w-full    rounded-md border px-2 py-3 outline-none focus:border-blue-500"
                />
                <span className="absolute right-0 top-1/2 px-2 py-2">
                  {values.type_price === "fixed_amount" ? "VND" : "%"}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor=""
                  className="my-2  block text-sm text-navy-700 ms-2"
                >
                  Số lượng mã giảm giá
                </label>
                <Field
                  name="max_uses"
                  type="number"
                  placeholder="1"
                  className="w-full  rounded-md border bg-white px-2 py-3 outline-blue-300"
                />
              </div>
              <div className="mt-2">
                <TextFiled
                  name="max_uses_per_user"
                  label="Sử dụng tối đa"
                  type="number"
                  placeholder="1"
                ></TextFiled>
              </div>
              <div className="relative">
                <label
                  htmlFor=""
                  className="my-2  block text-sm text-navy-700 ms-2"
                >
                  Số tiền tối thiểu
                </label>
                <Field
                  type="text"
                  placeholder="0"
                  name="min_order_value"
                  className=" w-full  rounded-md border px-2 py-3 outline-none focus:border-blue-500"
                />
                <span className="absolute right-0 top-1/2 px-2 py-2">$</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCode;
