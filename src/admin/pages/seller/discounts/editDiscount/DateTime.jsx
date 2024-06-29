import { Field } from "formik";
import React from "react";

const DateTime = () => {
  return (
    <div>
      <div className="w-full rounded-lg bg-white shadow-md   p-5">
        <h3 className="text-xl font-bold">Ngày & Giờ</h3>
        <p className="mt-2 mb-4 text-sm font-medium text-gray-400">
          Chọn thời gian giảm giá
        </p>
        <div className="flex items-center justify-between">
          <div>
            <label className="mb-2 block" htmlFor="">
              Thời gian bắt đầu
            </label>
            <Field
              type="datetime-local"
              
              name="start_date"
              className="w-[400px]   dark:border-[#2b408e] rounded-lg border bg-white px-3 py-3 outline-blue-400"
            ></Field>
          </div>
          <div>
            <label className="block mb-2" htmlFor="">
              Thời gian kết thúc
            </label>
            <Field
              type="datetime-local"
              name="end_date"
              className=" w-[400px] rounded-lg border   dark:border-[#2b408e] bg-white px-3 py-3 outline-blue-400"
            ></Field>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
