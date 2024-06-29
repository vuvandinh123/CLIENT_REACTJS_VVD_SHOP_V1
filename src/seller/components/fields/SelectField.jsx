import { useField } from "formik";

/* eslint-disable react/prop-types */
const SelectField = ({ label, data,className, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor=""
        className="block  font-semibold text-gray-500 field-label mb-2"
      >
        {label}
      </label>
      <select
        className={`w-full  outline-blue-500 p-3 rounded-md bg-white border ${
          meta.touched && meta.error ? " !border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
        {...field}
      >
        <option disabled selected value="">
          Choose {label}
        </option>
        {data?.map((item, index) => (
          <option value={item?.id} key={index}>
            {item?.name}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="mt-2 text-[12px] text-red-500 ms-1">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectField;
