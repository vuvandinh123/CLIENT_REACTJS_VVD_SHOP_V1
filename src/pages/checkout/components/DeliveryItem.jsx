/* eslint-disable react/prop-types */

import { Field } from "formik";
import { formatPriceVND } from "../../../utils";

const DeliveryItem = ({ data }) => {
  return (
    <label
      htmlFor={`delivery-${data.id}`}
      className="rounded-lg block cursor-pointer border border-gray-200 bg-gray-50 p-4 ps-4 "
    >
      <div className="flex items-start justify-between">
        <span className="flex cursor-pointer">
          <div className="flex h-5 items-center">
            <Field
              name="delivery_id"
              type="radio"
              id={`delivery-${data.id}`}
              value={data.id.toString()}
              className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 "
            />
          </div>
          <div className="ms-4 text-sm">
            {data?.description}
            <p
              id="dhl-text"
              className="mt-1 text-xs font-normal text-gray-500 "
            >
              {data?.estimated_time}
            </p>
          </div>
        </span>
        <div>
          <p className="text-xs font-medium ">
            {formatPriceVND(Number(data?.cost) || 0)}
          </p>
        </div>
      </div>
    </label>
  );
};

export default DeliveryItem;
