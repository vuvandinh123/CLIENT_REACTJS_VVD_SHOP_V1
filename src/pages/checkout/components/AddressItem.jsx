/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Field, useField } from "formik";
import { Radio } from "keep-react";
import React, { useId } from "react";

const AddressItem = ({ data, ...props }) => {
  const id = useId();
  return (
    <div className="sm:col-span-2 ">
      <label
        htmlFor={`address-${id}`}
        className="mb-1 bg-gray-50 flex justify-between items-center cursor-pointer gap-2 text-sm border px-4 py-3 rounded-md font-medium text-gray-900 "
      >
        <div className="flex gap-2">
          {/* <Field type="radio" name="address_id"  value={data?.id?.toString()}></Field> */}
          <Field
            className="shrink-0 w-4 h-4"
            name="address_id"
            value={data?.id?.toString()}
            type="radio"
            id={`address-${id}`}
          />
          <div className="border-l ps-3">
            <span className="font-bold capitalize me-3 shrink-0">
              {data.last_name} {data.first_name} - {data.phone}
            </span>
            <span className="">
              {data.address_detail}, {data?.province_name},{data?.nation_name}{" "}
            </span>
          </div>
        </div>
        <div className="shrink-0 border-l pl-3 underline text-blue-500 hover:text-blue-600">
          Sửa
        </div>
      </label>
    </div>
  );
};

export default AddressItem;
