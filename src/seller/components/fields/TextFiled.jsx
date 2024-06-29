/* eslint-disable react/prop-types */

import { useField } from "formik";

const TextFiled = ({ label, className, required = true, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor=""
        className="block  font-semibold text-gray-500 field-label mb-2"
      >
        {label}{" "}
        {required && <span className="text-red-400 text-[12px]">*</span>}
      </label>
      <input
        type="text"
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error ? " !border-red-500" : "border-gray-300"
        } w-full border  outline-blue-500 p-3 rounded-md ${className}`}
      />
      {meta.touched && meta.error && (
        <div className="mt-2 text-[12px] text-red-500 ms-1">{meta.error}</div>
      )}
    </div>
  );
};

export default TextFiled;
