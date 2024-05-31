/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { formatNumber } from "../../../utils";
import { useField } from "formik";

const NumberFiled = ({
  label,
  location,
  required,
  locaPosition = "right",
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  // thay đổi field
  const handleChangePrice = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <label
        htmlFor=""
        className=" font-semibold text-gray-500 flex gap-2 items-center field-label mb-2"
      >
        {label} {required ? <span className="text-red-500 mt-1">*</span> : null}
      </label>
      <div className="relative">
        {locaPosition === "left" && (
          <span className="absolute cursor-default left-0 z-50  border-r w-max px-4 rounded-md top-1/2 translate-y-[-50%] h-full items-center flex">
            {location}
          </span>
        )}

        <input
          type="number"
          
          {...field}
          onChange={handleChangePrice}
          {...props}
          className={`w-full px-3 ${
            locaPosition === "left" ? "pl-16" : "pr-12"
          } border  relative outline-blue-500 p-3 rounded-md ${
            meta.touched && meta.error ? " !border-red-500" : "border-gray-300"
          }`}
        />
        {locaPosition === "right" && (
          <span className="absolute cursor-default right-0 z-0 border-l px-4 rounded-md top-1/2 translate-y-[-50%] h-full items-center flex">
            {location}
          </span>
        )}
        
      </div>
      {meta.touched && meta.error && (
        <div className="mt-2 text-[12px] text-red-500 ms-1">{meta.error}</div>
      )}
    </div>
  );
};

export default NumberFiled;
