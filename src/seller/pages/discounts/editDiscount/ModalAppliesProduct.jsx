/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { getAllProduct } from "../../../service/Product";
import { useApiCall } from "../../../../hooks";

const ModalAppliesProduct = ({
  isOpen,
  setIsOpen,
  listCheck,
  setListCheck,
  listProductCheck,
  setListProductCheck,
}) => {
  const [listProducts, setListProducts] = useState([]);
  const [search, setSearch] = useState("");

  const handleChangeSearch = debounce(async (e) => {
    setSearch(e.target.value);
  }, 500);
  const setProductChecked = (item) => {
    setListProductCheck([...listProductCheck, item]);
  };
  const removeProductChecked = (item) => {
    setListProductCheck(
      listProductCheck.filter((item1) => item1.id !== item.id)
    );
  };
  const { data } = useApiCall(async () => {
    const response = await getAllProduct({
      limit: 5,
      page: 1,
      search: search,
    });
    setListProducts(response.data);
    return response.data;
  });

  return (
    <div>
      {isOpen && (
        <>
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            className="fixed inset-0 z-40 bg-[#000]    bg-opacity-20"
          ></div>
          <div className="fixed left-1/2 top-1/2 z-50  flex items-center justify-center">
            <div className="absolute z-50 min-h-[500px] w-[600px] overflow-hidden rounded-lg bg-white ">
              <div className="flex items-center justify-between bg-gray-500 bg-opacity-30 px-5 py-3 ">
                <h3 className="text-center font-bold ">Add products</h3>
                <button onClick={() => setIsOpen(false)}>
                  <CgClose size={30} />
                </button>
              </div>
              <div className="mt-3 ">
                <div className="relative px-5">
                  <input
                    type="text"
                    autoFocus={true}
                    className="w-full rounded-lg  border px-3 py-2 pl-10 outline-blue-400 "
                    placeholder="Search..."
                    onChange={handleChangeSearch}
                  />
                  <span className="absolute left-7 top-3">
                    <BsSearch size={18} className="font-bold" />
                  </span>
                </div>
                <div className="mt-3 border-t dark:border-navy-700 ">
                  {listProducts.map((item, index) => (
                    <label
                      htmlFor={"applies_to" + item.id}
                      key={index}
                      className="grid cursor-pointer hover:bg-gray-100 rounded-md grid-cols-12 items-center justify-center border-b p-3 dark:border-navy-700"
                    >
                      <div className="col-span-1">
                        <input
                          name="applies_to"
                          type="checkbox"
                          id={"applies_to" + item.id}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setListCheck([...listCheck, item.id]);
                              setProductChecked(item);
                            } else {
                              setListCheck(
                                listCheck.filter((id) => id !== item.id)
                              );
                              removeProductChecked(item);
                            }
                          }}
                          checked={listCheck.includes(item.id)}
                          value={item.id}
                        />
                      </div>
                      <div className="col-span-2">
                        <img
                          src={item.thumbnail}
                          className="max-h-[50px] w-[50px]"
                          alt=""
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="text-ecl">{item.name}</p>
                      </div>
                      <div className="col-span-2">
                        {item.quantity} <small>available</small>
                      </div>
                      <div className="col-span-1 text-end">${item.price}</div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModalAppliesProduct;
