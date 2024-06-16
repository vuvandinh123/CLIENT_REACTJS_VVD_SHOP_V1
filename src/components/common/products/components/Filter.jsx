/* eslint-disable react/prop-types */
import { useRef } from "react";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import Accordion from "../../Accordion";
import { formatPriceVND } from "../../../../utils";

const Filter = (props) => {
  const { filter, setFilter, price, brands, province } = props;
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const isChecked = event.target.checked;
    props.handleCheckboxChange(value, isChecked, name);
  };
  const handleClickFilterPrice = () => {
    setFilter({
      ...filter,
      price: {
        min: minPriceRef.current.value,
        max: maxPriceRef.current.value,
      },
    });
  };
  const handleChangeStart = (e) => {
    setFilter({ ...filter, stars: e.target.value });
  };
  const handleChangeProvince = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFilter({ ...filter, province: [...filter.province, value] });
    } else {
      const newProvince = filter.province.filter((item) => item != value);
      setFilter({ ...filter, province: newProvince });
    }
  };
  return (
    <>
      <div className="border-b pb-5 mt-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold uppercase ">Bộ lọc</h3>

          <button className="" title="Remove all">
            <BiTrash
              onClick={() => {
                setFilter({
                  ...filter,
                  brand: [],
                  sortBy: "featured",
                  price: { min: null, max: null },
                });
                document.querySelectorAll(".brand").forEach((it) => {
                  it.checked = false;
                });
                minPriceRef.current.value = "";
                maxPriceRef.current.value = "";
              }}
              className="text-[15px]"
            />
          </button>
        </div>
        <div className="flex items-center gap-1 mt-2 flex-wrap">
          {filter.brand.length > 0 &&
            brands &&
            filter.brand.map((item, index) => {
              const mach = brands.find((item2) => item2.id == item);
              return (
                <div key={index}>
                  <span className="px-2 text-[13px] py-1 pr-0 my-1 bg-slate-100 inline-block ms-1  rounded-sm">
                    Thương hiệu: {mach?.name}
                    <span
                      onClick={() => {
                        document.querySelectorAll(".brand").forEach((it) => {
                          if (it.value == mach.id) {
                            it.checked = false;
                          }
                        });
                        setFilter({
                          ...filter,
                          brand: filter.brand.filter((item3) => item3 !== item),
                        });
                      }}
                      className="px-2  hover:text-[#ff3030] cursor-pointer"
                    >
                      <AiOutlineClose className="inline text-[13px]" />
                    </span>
                  </span>
                </div>
              );
            })}
          {filter.price.min && (
            <div className="flex items-center ">
              <span className="px-4 text-[13px] py-1 my-1 bg-slate-100 inline-block ms-1  rounded-sm">
                Min: {price.min}
                <span
                  onClick={() => {
                    minPriceRef.current.value = "";
                    setFilter({
                      ...filter,
                      price: { ...filter.price, min: null },
                    });
                  }}
                  className="pl-3 hover:text-[#ff3030] cursor-pointer"
                >
                  <AiOutlineClose className="inline" />
                </span>
              </span>
            </div>
          )}
          {filter.price.max && (
            <div className="flex items-center ">
              <span className="px-3 text-[13px] py-1 my-1 bg-slate-100 inline-block ms-1  rounded-sm">
                Max: {filter.price.max}
                <span
                  onClick={() => {
                    maxPriceRef.current.value = "";
                    setFilter({
                      ...filter,
                      price: { ...filter.price, max: null },
                    });
                  }}
                  className="pl-3 hover:text-[#ff3030] cursor-pointer"
                >
                  <AiOutlineClose className="inline" />
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="border-b pb-5 mt-5">
        <Accordion title="Giá">
          <div>
            <p className="text-gray-500 mt-3">
              Giá cao nhất là {"  "}
              <span className="text-black">{formatPriceVND(99999999)}</span>
            </p>
            <div className="">
              <div className="flex items-center gap-3 mt-3 justify-around">
                <span className="text-md text-gray-500">VND</span>
                <input
                  ref={minPriceRef}
                  placeholder="Min"
                  min={1}
                  className="border px-3 py-2 w-20 text-center outline-none focus:border focus:border-[#3030ff] rounded-md"
                  type="number"
                />
                <input
                  ref={maxPriceRef}
                  placeholder="Max"
                  min={1}
                  className="border px-1 py-2 w-20 text-center outline-none focus:border focus:border-[#3030ff] rounded-md"
                  type="number"
                />
              </div>

              <button
                onClick={handleClickFilterPrice}
                className="w-full py-2 border bg-[#3030ff] text-white rounded-md mt-3"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </Accordion>
      </div>
      {brands && brands.length > 0 && (
        <div className="border-b pb-5 mt-5">
          <Accordion title="brand">
            <div className="mt-5">
              {brands.map((item) => (
                <label
                  key={item.id}
                  htmlFor={item.name}
                  className="flex justify-between mb-2 cursor-pointer"
                >
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      checked={filter.brand.includes("" + item.id)}
                      value={item.id}
                      onChange={handleCheckboxChange}
                      name="brand"
                      className="brand"
                      id={item.name}
                    />
                    <span className="text-gray-500 capitalize pt-[2px]">
                      {item.name} ({item.product_count})
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </Accordion>
        </div>
      )}
      <div className="border-b pb-5 mt-5">
        <Accordion title="Đánh giá">
          <div className="mt-5 overflow-auto">
            <form action="" method="post">
              {[1, 2, 3, 4, 5].map((item) => {
                return (
                  <label
                    htmlFor={`star-${item}`}
                    key={item}
                    className="flex justify-between mb-2 cursor-pointer"
                  >
                    <div className="flex gap-3 items-center">
                      <input
                        type="radio"
                        onChange={handleChangeStart}
                        name="start"
                        value={6 - item}
                        id={`star-${item}`}
                        className="w-3  h-3"
                      />
                      <span className="text-gray-500 flex gap-2 items-center capitalize pt-[2px]">
                        <div className="flex items-center gapx-3 text-yellow-400">
                          {Array(5)
                            .fill(0)
                            .map((item2, index) => (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 "
                                viewBox="0 0 20 20"
                                fill={`${
                                  5 - index >= item ? "#ffc107" : "#e4e5e9"
                                }`}
                                key={index}
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                        </div>
                      </span>
                      {
                        <span className="text-gray-500">
                          ({6 - item} ) {6 - item < 5 ? "Trở lên" : ""}
                        </span>
                      }
                    </div>
                  </label>
                );
              })}
            </form>
          </div>
        </Accordion>
      </div>
      <div className="border-b pb-5 mt-5">
        <Accordion title="Nơi bán">
          <div className="mt-5 h-[500px] overflow-auto">
            <form action="" method="post">
              {province?.map((item) => {
                return (
                  <label
                    key={item.id}
                    htmlFor={item.name}
                    className="flex justify-between mb-2 cursor-pointer"
                  >
                    <div className="flex gap-3 items-center">
                      <input
                        type="checkbox"
                        // checked={filter.province.includes("" + item.id)}

                        value={item.id}
                        onChange={handleChangeProvince}
                        name="province"
                        className="brand"
                        id={item.name}
                      />
                      <span className="text-gray-500 capitalize pt-[2px]">
                        {item.name} <span>({item.total_product})</span>
                      </span>
                    </div>
                  </label>
                );
              })}
              {/* <label
                htmlFor=""
                className="flex justify-between mb-2 cursor-pointer"
              >
                <div className="flex gap-3 items-center">
                  <input type="checkbox" className="" id="" />
                  <span className="text-gray-500 pt-[2px]">Invalid (1)</span>
                </div>
              </label> */}
            </form>
          </div>
        </Accordion>
      </div>
    </>
  );
};

Filter.propTypes = {
  handleCheckboxChange: PropTypes.func,
  filter: PropTypes.object,
  setFilter: PropTypes.func,
  setPrice: PropTypes.func,
  price: PropTypes.object,
  brands: PropTypes.array,
};
export default Filter;
