/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Field } from "formik";
import React from "react";

const PaymentItem = ({ data }) => {
  return (
    <label
      htmlFor={`payment-${data.code}`}
      className="rounded-lg block cursor-pointer border mb-2 border-gray-200 bg-gray-50 p-3 ps-4 "
    >
      <div className="flex items-center  justify-between">
        <div className="flex h-5 items-center">
          <div className="flex h-5 items-center">
            <Field
              type="radio"
              className="w-4 h-4"
              value={data.code}
              id={`payment-${data.code}`}
              name="payment_method"
            />
          </div>
          <div className="ms-4 text-sm">
            <span className="font-medium leading-none text-gray-900 ">
              {data?.name}
            </span>
            <p
              id="credit-card-text"
              className="mt-1 text-xs font-normal text-gray-500 "
            >
              {data?.description}
            </p>
          </div>
        </div>
        <div>
          <svg
            className="ms-auto w-10 h-10 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            />
          </svg>
        </div>
      </div>
    </label>
  );
};

export default PaymentItem;
