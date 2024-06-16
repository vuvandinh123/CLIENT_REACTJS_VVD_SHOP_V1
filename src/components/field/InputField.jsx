/* eslint-disable react/prop-types */
import { useField } from "formik";
import { useId } from "react";

const InputField = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);
  const id = useId();
  return (
    <div>
      <label
        htmlFor={`field-${id}`}
        className="mb-2 block text-sm font-medium text-gray-900 "
      >
        {" "}
        {label || "NO LABEL"}
      </label>
      <input
        type={type || "text"}
        {...field}
        {...props}
        id={`field-${id}`}
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 outline-blue-500 ${props?.className}`}
      />
      {meta.touched && meta.error && (
        <div className="mt-2 text-[12px] text-red-500 ms-1">{meta.error}</div>
      )}
    </div>
  );
};

export default InputField;
