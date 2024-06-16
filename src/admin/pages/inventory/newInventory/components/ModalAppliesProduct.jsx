/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { useApiCall } from "../../../../../hooks";
import { formatPrice, formatPriceVND } from "../../../../../utils";
import proNotFound from "../../../../../assets/image/product-notfound.png";
import { getAllProductAndVariant } from "../../../../service/Product";
const ModalAppliesProduct = ({
  isOpen,
  setIsOpen,
  listProductCheck,
  setListProductCheck,
}) => {
  const [listProducts, setListProducts] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (isOpen) {
      setSearch("");
    }
  }, [isOpen]);
  const handleChangeSearch = debounce(async (e) => {
    setSearch(e.target.value);
  }, 500);
  useEffect(() => {
    setListProducts(
      data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);
  const setProductChecked = (item) => {
    setListProductCheck([
      ...listProductCheck,
      {
        id: item.id,
        code: item.code,
        name: item.name,
        thumbnail: item.thumbnail,
        price: item.price,
        slug: item.slug,
        stock: item.stock ? item.stock : item.quantity,
        variant: {
          name: item.name,
          code: item.code || null,
          id: item.id,
          price: item.price,
          stock: item.quantity,
          thumbnail: item.thumbnail,
        },
        quantity: "",
        import_price: "",
      },
    ]);
  };
  const removeProductChecked = (item) => {
    setListProductCheck(
      listProductCheck.filter((item1) => {
        if (item1.code !== item.code) {
          return true;
        } else if (item1.id === item.id) {
          return false;
        } else {
          return true;
        }
      })
    );
  };
  const { loading } = useApiCall(async () => {
    const res2 = await getAllProductAndVariant({ search: search });
    setData(res2.data);
    setListProducts(res2.data);
    return res2.data;
  }, []);

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
            <div className="absolute z-50 min-h-[500px]  !w-[800px] overflow-hidden rounded-lg bg-white ">
              <div className="flex items-center justify-between bg-blue-400 text-white uppercase px-5 py-3 ">
                <h3 className="text-center font-bold ">Chọn sản phẩm</h3>
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
                <div className="mt-3 border-t max-h-[500px] overflow-auto dark:border-navy-700 ">
                  {!loading &&
                    listProducts.map((item, index) => (
                      <label
                        htmlFor={"applies_to" + item.id + index}
                        key={index}
                        className="grid cursor-pointer hover:bg-gray-100 rounded-md grid-cols-12 items-center justify-center border-b p-3 dark:border-navy-700"
                      >
                        <div className="col-span-8">
                          <div className="flex items-center gap-3">
                            <input
                              name="applies_to"
                              type="checkbox"
                              id={"applies_to" + item.id + index}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setProductChecked(item);
                                } else {
                                  removeProductChecked(item);
                                }
                              }}
                              checked={listProductCheck.some((product) => {
                                if (product.code) {
                                  return product.code === item.code;
                                } else {
                                  return product.id === item.id;
                                }
                              })}
                              value={item.id}
                            />
                            <div className="w-[50px] max-h-[50px] shrink-0">
                              <img
                                src={item.thumbnail}
                                className="max-h-[50px] w-[50px]"
                                alt=""
                              />
                            </div>

                            <div className="">
                              <p className="text-ecl">
                                {item.name} - {item.code}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2 text-center">
                          {item.quantity}
                        </div>
                        <div className="col-span-1 text-end">
                          {formatPriceVND(item.price)}
                        </div>
                      </label>
                    ))}
                  {loading &&
                    Array(5)
                      .fill(0)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="w-full mb-2 h-16 rounded-md animate-pulse bg-gray-200"
                        ></div>
                      ))}
                  {!loading && listProducts.length === 0 && (
                    <div className="w-full mb-2 rounded-md ">
                      <img className="mx-auto w-48" src={proNotFound} alt="" />
                      <p className="text-center uppercase mt-5 font-semibold text-gray-400">
                        Không tìm thấy sản phẩm nào
                      </p>
                    </div>
                  )}
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
