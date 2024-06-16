import { useEffect, useRef, useState } from "react";
import { FilterMb } from "../../../components/common";
import { colors } from "../../../api/data";
import PropTypes from "prop-types";

const ModalMB = (props) => {
  const { params, setParams, brands } = props;
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpenMenu]);
  const handleClickFilterPrice = () => {
    setParams({
      ...params,
      price: {
        min: minPriceRef.current.value,
        max: maxPriceRef.current.value,
      },
    });
  };
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const isChecked = event.target.checked;
    props.handleCheckboxChange(value, isChecked, name);
  };
  return (
    <div>
      <div
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        className="py-5  flex justify-between items-center px-5 bg-white rounded-md mb-3"
      >
        <div className="uppercase font-medium"> filter and sort</div>
        <svg
          className="w-6 text-4xl h-6"
          focusable="false"
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            d="M4.833 6.5a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0ZM4.05 7H2.5a.5.5 0 0 1 0-1h1.55a2.5 2.5 0 0 1 4.9 0h8.55a.5.5 0 0 1 0 1H8.95a2.5 2.5 0 0 1-4.9 0Zm11.117 6.5a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0ZM13.5 11a2.5 2.5 0 0 1 2.45 2h1.55a.5.5 0 0 1 0 1h-1.55a2.5 2.5 0 0 1-4.9 0H2.5a.5.5 0 0 1 0-1h8.55a2.5 2.5 0 0 1 2.45-2Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className={`${isOpenMenu ? "visible" : "invisible "}`}>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="fixed inset-0 h-full z-50 bg-[#00000080]"
        ></div>
        <div
          className={`bg-white  max-w-full h-full fixed right-0 top-0 bottom-0 transition-all duration-300 z-50 ${
            isOpenMenu ? "w-[300px]" : "w-0 overflow-hidden"
          }`}
        >
          <div className="flex justify-between items-center p-3 bg-[#d5d5d5]">
            <h2 className="text-base font-bold">Filter</h2>
            <i
              className="fa-solid fa-xmark cursor-pointer text-2xl"
              onClick={() => setIsOpenMenu(false)}
            ></i>
          </div>
          <div className="flex items-center justify-center py-2">
            <span className="font-bold me-1">7</span> of{" "}
            <span className="font-bold mx-1"> 59 </span>Products
          </div>
          <div className="relative ">
            <FilterMb label={"price"}>
              <div className="flex gap-3 p-3">
                <input
                  className="w-full rounded-md p-3 border"
                  type="text"
                  ref={minPriceRef}
                  placeholder="Min"
                />
                <input
                  className="w-full rounded-md p-3 border"
                  type="text"
                  ref={maxPriceRef}
                  placeholder="Max"
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <input type="reset" className="p-3" value={"Reset"} />
                <button
                  onClick={handleClickFilterPrice}
                  type="submit"
                  className="uppercase px-5 py-2 rounded-md text-white font-bold bg-blue-500"
                >
                  Apply
                </button>
              </div>
            </FilterMb>
            <FilterMb label={"brands"}>
              <div className="p-3">
                <div className="mt-5">
                  {brands &&
                    brands.length > 0 &&
                    brands.map((item) => (
                      <label
                        key={item.id}
                        htmlFor={item.name}
                        className="flex justify-between mb-2 cursor-pointer"
                      >
                        <div className="flex gap-3 items-center">
                          <input
                            type="checkbox"
                            checked={params.brand.includes("" + item.id)}
                            value={item.id}
                            onChange={handleCheckboxChange}
                            name="brand"
                            className="brand"
                            id={item.name}
                          />
                          <span className="text-gray-500 pt-[2px]">
                            {item.name} ({item.product_count})
                          </span>
                        </div>
                      </label>
                    ))}
                </div>
              </div>
            </FilterMb>
            <FilterMb label={"colors"}>
              <div className="p-3">
                <div className="mt-5">
                  {colors.map((item) => (
                    <label
                      key={item.id}
                      htmlFor={item.name}
                      className="flex justify-between mb-2 cursor-pointer"
                    >
                      <div className="flex gap-3 w-full items-center justify-between">
                        <div className="flex gap-3 items-center">
                          <input
                            type="checkbox"
                            checked={params.brand.includes("" + item.id)}
                            value={item.id}
                            onChange={handleCheckboxChange}
                            name="brand"
                            className="brand"
                            id={item.name}
                          />
                          <span className="text-gray-500 pt-[2px]">
                            {item.name} ({10})
                          </span>
                        </div>
                        <div>
                          <span
                            className="block w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.code }}
                          ></span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </FilterMb>
            <div className="flex items-center justify-center gap-4">
              <input type="reset" className="p-3" value={"Reset"} />
              <button
                type="submit"
                className="uppercase px-5 py-2 rounded-md text-white font-bold bg-blue-500"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ModalMB.propTypes = {
  handleCheckboxChange: PropTypes.func,
  params: PropTypes.object,
  setParams: PropTypes.func,
  brands: PropTypes.array,
};
export default ModalMB;
