/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";
import { CgLoadbarDoc } from "react-icons/cg";
import { SlOptionsVertical } from "react-icons/sl";
import { useFormikContext } from "formik";
import { generateDataVariant } from "../../../../utils";
const Variant = ({ option, variant, setOption, setVariant }) => {
  const [priceStockMap, setPriceStockMap] = useState(new Map());
  const { values } = useFormikContext();
  useEffect(() => {
    const newMap = new Map();
    if (variant) {
      for (let item of variant) {
        newMap.set(item.code, {
          price: item.price == 0 ? values.price : item.price,
          stock: item.stock,
          isActive: item.isActive,
        });
      }
      setPriceStockMap(newMap);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (
      option &&
      option.length > 0 &&
      option[option.length - 1].name !== "" &&
      option[option.length - 1].value[
        option[option.length - 1].value.length - 1
      ] !== ""
    ) {
      const res = generateDataVariant(option, priceStockMap, values.price);
      setVariant(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option, priceStockMap]);
  const addOption = () => {
    if (option.length === 0) {
      setOption([
        {
          name: "",
          value: [""],
        },
      ]);
    } else if (
      option.length > 0 &&
      option[option.length - 1].name !== "" &&
      option[option.length - 1].value[
        option[option.length - 1].value.length - 1
      ] !== ""
    ) {
      setOption([
        ...option,
        {
          name: "",
          value: [""],
        },
      ]);
    } else {
      toast("Please enter option name and value to continue", {
        type: "error",
      });
    }
  };

  const addValue = (index) => {
    const options = [...option];
    if (
      options[option.length - 1].value[
        options[option.length - 1].value.length - 1
      ] !== ""
    ) {
      options[index].value = [...options[index].value, ""];
      setOption(options);
    } else {
      toast("Please enter value to continue", { type: "error" });
    }
  };
  const removeValue = (index, index2) => {
    const options = [...option];
    if (options[index].value.length > 1) {
      options[index].value.splice(index2, 1);
      setOption(options);
    } else {
      toast("You must have at least one value", { type: "error" });
    }
  };
  const removeOption = (index) => {
    const options = [...option];
    options.splice(index, 1);
    setOption(options);
  };
  if (values.type === "single") {
    return "";
  }
  return (
    <div
      className={`w-full bg-white rounded-md shadow-md sm:overflow-auto p-4 ${
        values.type === "single" ? "hidden" : ""
      }`}
    >
      <h3 className="font-bold">Biến thể</h3>
      <div className="mt-4">
        {option &&
          option?.map((item, index) => {
            return (
              <div key={index} className="border p-3">
                <label
                  htmlFor=""
                  className="mb-2 flex items-center gap-2 text-gray-500"
                >
                  <CgLoadbarDoc></CgLoadbarDoc>
                  Tên bộ chọn
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="option"
                    list="options"
                    name="option"
                    value={item.name}
                    onChange={(e) => {
                      const values = [...option];
                      values[index].name = e.target.value;
                      setOption(values);
                    }}
                    className="w-full rounded-md border px-3 py-2 outline-none"
                  />
                  <datalist id="options">
                    <option value="size"></option>
                    <option value="color"></option>
                    <option value="brand"></option>
                  </datalist>
                  <span className="cursor-pointer px-3">
                    <CiTrash
                      onClick={() => removeOption(index)}
                      color="red"
                      size={20}
                    ></CiTrash>
                  </span>
                </div>
                <div className="ml-5 mt-3">
                  <label
                    htmlFor=""
                    className="mb-2 flex items-center text-gray-500"
                  >
                    <SlOptionsVertical></SlOptionsVertical>
                    Giá trị
                  </label>
                  {item?.value.map((item2, index2) => {
                    return (
                      <div key={index2} className="flex items-center">
                        <input
                          type="text"
                          value={item2}
                          onChange={(e) => {
                            const options = [...option];
                            options[index].value[index2] = e.target.value;

                            setOption(options);
                          }}
                          className="mb-2 w-full rounded-md border px-3 py-2 outline-none"
                        />
                        <span className="cursor-pointer px-3">
                          <CiTrash
                            onClick={() => removeValue(index, index2)}
                            color="red"
                            size={20}
                          ></CiTrash>
                        </span>
                      </div>
                    );
                  })}
                  <span
                    onClick={() => addValue(index)}
                    className="cursor-pointer text-blue-400 underline"
                  >
                    Thêm giá trị
                  </span>
                </div>
              </div>
            );
          })}

        <span
          onClick={addOption}
          className="cursor-pointer text-blue-400 underline"
        >
          Thêm bộ chọn
        </span>
      </div>
      {variant?.length > 0 && (
        <div className="mt-4 border p-3">
          <table className="w-full ">
            <thead>
              <tr>
                <th className="text-left">Code</th>
                <th>Giá</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {variant.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`relative py-3 ${
                      item.isActive === 0 && "bg-gray-300 bg-opacity-30"
                    }`}
                  >
                    <td
                      className={`text-left ${
                        !item.isActive && "text-gray-400 line-through"
                      }`}
                    >
                      {item.code}
                    </td>
                    <td className="text-center">
                      {item.isActive ? (
                        <input
                          type="number"
                          className="w-[100px] rounded-md border text-center  outline-none focus:border-blue-400"
                          value={item.price}
                          onChange={(e) => {
                            const newdata = [...variant];
                            newdata[index].price = e.target.value;
                            setPriceStockMap((prevMap) => {
                              const newMap = new Map(prevMap);
                              newMap.set(newdata[index].code, {
                                price: newdata[index].price,
                                stock: newdata[index].stock,
                                isActive: newdata[index].isActive,
                              });
                              return newMap;
                            });
                            setVariant(newdata);
                          }}
                        />
                      ) : (
                        <span></span>
                      )}
                    </td>
                    {/* <td className="text-center">
                      {item.isActive ? (
                        <input
                          type="number"
                          id=""
                          className="w-[100px] rounded-md border text-center  outline-none focus:border-blue-400"
                          value={item.stock}
                          onChange={(e) => {
                            const newdata = [...variant];
                            newdata[index].stock = e.target.value;
                            setPriceStockMap((prevMap) => {
                              const newMap = new Map(prevMap);
                              newMap.set(newdata[index].code, {
                                price: newdata[index].price,
                                stock: newdata[index].stock,
                                isActive: newdata[index].isActive,
                              });
                              return newMap;
                            });
                            setVariant(newdata);
                          }}
                        />
                      ) : (
                        <span></span>
                      )}
                    </td> */}
                    <td className="flex items-center justify-center">
                      {item.isActive ? (
                        <CiTrash
                          className="cursor-pointer"
                          onClick={() => {
                            const newdata = [...variant];
                            newdata[index].isActive = 0;
                            setPriceStockMap((prevMap) => {
                              const newMap = new Map(prevMap);
                              newMap.set(newdata[index].code, {
                                price: newdata[index].price,
                                stock: newdata[index].stock,
                                isActive: 0,
                              });
                              return newMap;
                            });
                            setVariant(newdata);
                          }}
                          color="red"
                        />
                      ) : (
                        <div>
                          <span
                            className="cursor-pointer text-green-500"
                            onClick={() => {
                              const newdata = [...variant];
                              newdata[index].isActive = 1;
                              setPriceStockMap((prevMap) => {
                                const newMap = new Map(prevMap);
                                newMap.set(newdata[index].code, {
                                  price: newdata[index].price,
                                  stock: newdata[index].stock,
                                  isActive: 1,
                                });
                                return newMap;
                              });
                              setVariant(newdata);
                            }}
                          >
                            Undo
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Variant;
