/* eslint-disable react/prop-types */
import { useField } from "formik";
import { useId } from "react";

const SelectField = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);
  const id = useId();
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label
          htmlFor={`field-${id}`}
          className="block text-sm font-medium text-gray-900 "
        >
          {" "}
          {label || "NO LABEL"}
        </label>
      </div>
      <select
        {...props}
        {...field}
        id={`field-${id}`}
        className="block w-full rounded-lg border outline-blue-500 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
      >
        {children}
      </select>
      {meta.touched && meta.error && (
        <div className="mt-2 text-[12px] text-red-500 ms-1">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectField;
