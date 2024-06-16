/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { getExchangeRatesUSDtoVND, getExchangeRatesVNDtoUSD } from "../../../api/price";
import { formatNumber, formatPrice, formatPriceVND, removeCommas } from "../../../utils";
import { useField } from "formik";

const PriceFiled = ({ label, location, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [vnd, setVnd] = useState(0);
  const [vndView, setVndView] = useState(0);
  const handleConvertPrice = async () => {
    const res = getExchangeRatesVNDtoUSD(vnd || 0);
    setVndView(res);
  };
  useEffect(() => {
    setTimeout(() => {
      handleConvertPrice();
    }, 500);
  }, [vnd]);
  const { setValue } = helpers;
  // thay đổi field
  const handleChangePrice = (e) => {
    setVnd(e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <label
        htmlFor=""
        className="block font-semibold text-gray-500 field-label mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          {...field}
          onChange={handleChangePrice}
          {...props}
          className={`w-full px-3 pr-12 border z-10 bg-transparent relative outline-blue-500 p-3 rounded-md ${
            meta.touched && meta.error ? " !border-red-500" : "border-gray-300"
          }`}
        />
        {vnd.length > 0 && (
          <div className="absolute top-1/2 translate-y-[-50%] text-gray-300 z-0 right-20">
            {" "}
            = {formatPrice(vndView || 0)}
          </div>
        )}

        <span className="absolute cursor-default right-0 z-0 border-l px-4 rounded-md top-1/2 translate-y-[-50%] h-full items-center flex">
          {location}
        </span>
      </div>
      {meta.touched && meta.error && (
        <div className="mt-2 text-[12px] text-red-500 ms-1">{meta.error}</div>
      )}
    </div>
  );
};

export default PriceFiled;
