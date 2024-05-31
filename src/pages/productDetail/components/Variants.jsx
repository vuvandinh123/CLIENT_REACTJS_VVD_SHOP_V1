import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const Variants = ({ data,value,setValue }) => {
  const [productVariant, setProductVariant] = useState([]);
  const [active, setActive] = useState("");
  const [selectd, setSelectd] = useState([]);
  useEffect(() => {
    setProductVariant(data?.productVariants);
  }, []);
  const handleChangeVariant = (e, name) => {
    const active = e.target.value;
    setValue({
      ...value,
      [name]: active,
    });
    setActive(name);
    const variantSelect = productVariant.filter(
      (item) => item.code.includes(active) && item.isActive === 1
    );
    setSelectd(() => {
      const arr = [];
      variantSelect.forEach((item) => {
        const code = item.code.split("-");
        const res = code.filter((item2) => item2 !== active);
        arr.push(res.join("-"));
      });
      return arr;
    });
  };
  return (
    <div className="mb-5">
        <p></p>
      {data?.variant.map((item, index) => (
        <div key={index} className="text-gray-500 mt-5">
          <div>
            {item.name} :{" "}
            <span className="font-bold text-black uppercase"></span>
          </div>
          <div className="mt-2 flex gap-2">
            {item?.value.map((item2, index) => (
              <label
                key={index}
                htmlFor={item2}
                className={` cursor-pointer text-black p-2 px-5 border-2 rounded-md inline-block ${
                  value[item.name] === item2
                    ? "border-blue-600 text-blue-500 border-2"
                    : ""
                } ${
                  !selectd.includes(item2) &&
                  item.name !== active &&
                  active != ""
                    ? "bg-gray-100 !cursor-not-allowed text-gray-400"
                    : ""
                }`}
              >
                <input
                  defaultValue={item2}
                  onChange={(e) => handleChangeVariant(e, item.name)}
                  disabled={
                    !selectd.includes(item2) &&
                    item.name !== active &&
                    active != ""
                  }
                  checked={value[item.name] === item2}
                  type="radio"
                  name="size"
                  className="hidden"
                  id={item2}
                />
                {item2}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
Variants.propTypes = {
  data: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired
};
export default Variants;
