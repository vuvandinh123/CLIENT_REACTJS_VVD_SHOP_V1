/* eslint-disable react/prop-types */
import { Field, useFormikContext } from "formik";
import AppliesTo from "./AppliesTo";
import TextFiled from "../../../../../components/fields/TextFiled";
import PriceFiled from "../../../../../components/fields/PriceFiled";

const FormPromotion = (props) => {
  const { setFieldValue, values } = useFormikContext();
  return (
    <div className="p-5 rounded-lg bg-white shadow-md mb-10">
      <h3 className="text-xl font-bold mb-5">Cơ bản</h3>
      <div>
        <TextFiled
          label="Tên khuyến mãi"
          name="name"
          placeholder="Khuyến mãi"
        ></TextFiled>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-4">
        <div className="col-span-1">
          <div className="">
            <label
              className="mb-2 text-gray-500 font-semibold block"
              htmlFor=""
            >
              Loại giảm giá
            </label>
            <Field
              as="select"
              name="type_price"
              className="w-full  py-3  rounded-md border bg-white px-2 outline-blue-300"
            >
              <option value="fixed_amount">Giảm giá cố định</option>
              <option value="percent">Phần trăm</option>
            </Field>
          </div>
        </div>
        <div className="col-span-1">
          <PriceFiled
            label="Giảm"
            location={values.type_price === "fixed_amount" ? "VND" : "%"}
            name="price_sale"
            placeholder="99.99"
          ></PriceFiled>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-5 gap-4 items-center">
        <div>
          <label className="mb-2 text-gray-500 font-semibold block" htmlFor="">
            Thời gian bắt đầu
          </label>
          <Field
            type="datetime-local"
            name="start_date"
            className="w-full    rounded-lg border bg-white px-3 py-2 outline-blue-400"
          ></Field>
        </div>
        <div>
          <label className="block mb-2 text-gray-500 font-semibold" htmlFor="">
            Thời gian kết thúc
          </label>
          <Field
            type="datetime-local"
            name="end_date"
            className=" w-full rounded-lg border    bg-white px-3 py-2 outline-blue-400"
          ></Field>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default FormPromotion;
