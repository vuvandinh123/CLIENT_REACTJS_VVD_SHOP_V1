/* eslint-disable react/prop-types */
import { useField } from "formik";
import CateItem from "./CateItem";

const CateSelected = ({ data, name }) => {
  const [field] = useField(name);
  console.log(field.value);
  return (
    <div className="h-[400px] overflow-auto">
      <ul>
        {data?.map((item) => (
          <CateItem key={item.id} name={name} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default CateSelected;
