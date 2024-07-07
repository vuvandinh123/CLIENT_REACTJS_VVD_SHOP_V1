/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ModalAppliesProduct from "./ModalAppliesProduct";
import { Field, useFormikContext } from "formik";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { formatPriceVND } from "../../../../../utils";

const AppliesTo = ({ productIds, setProductIds, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [listProductCheck, setListProductCheck] = useState([]);
  const { values } = useFormikContext();
  useEffect(() => {
    if (products) {
      setListProductCheck(products);
    }
  }, [products]);
  const removeProductChecked = (item) => {
    setProductIds(productIds.filter((id) => id !== item.id));
    setListProductCheck(
      listProductCheck.filter((item1) => item1.id !== item.id)
    );
  };
  return (
    <div>
      <div className="w-full rounded-lg bg-white p-5  shadow-md">
        <h3 className="text-xl font-bold capitalize">Áp dụng cho</h3>
        <p className="mt-2 mb-4 text-sm font-medium text-gray-400">
          Chọn những sản phẩm áp dụng giảm giá này.
        </p>
        <div>
          <Field
            name="applies_to"
            as="select"
            className="w-full rounded-md  border  bg-white px-3 py-3 outline-blue-400  "
          >
            <option value="all">Tất cả sản phẩm</option>
            <option value="specific">Sản phẩm nhất định</option>
          </Field>
        </div>
        {values.applies_to === "specific" && (
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              className="w-full rounded-md  border py-3 px-3 outline-blue-400  "
              placeholder="Search"
              onFocus={() => setIsOpen(true)}
              readOnly
            />
            <span
              onClick={() => setIsOpen(true)}
              className="cursor-pointer rounded-md bg-blue-500 px-3 py-3 text-white hover:bg-gray-400 "
            >
              Browse
            </span>
          </div>
        )}
        <div className="mb-5">
          <ModalAppliesProduct
            listCheck={productIds}
            setListCheck={setProductIds}
            listProductCheck={listProductCheck}
            setListProductCheck={setListProductCheck}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          ></ModalAppliesProduct>
        </div>
        <div>
          {listProductCheck.length > 0 &&
            listProductCheck.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center justify-center border-b p-3 hover:bg-gray-100 rounded-md"
              >
                <div className="col-span-1">
                  <img
                    src={item.thumbnail}
                    className="max-h-[50px] w-[50px]"
                    alt=""
                  />
                </div>
                <div className="col-span-7">
                  <p className="text-ecl">
                    <Link to={`/products/${item.slug}-${item.id}`}>
                      {item.name}
                    </Link>
                  </p>
                </div>
                <div className="col-span-2 text-center">
                  {item.quantity} cái
                </div>
                <div className="col-span-1">
                  {formatPriceVND(item.price || 0)}
                </div>
                <div className="col-span-1 flex justify-end">
                  <span
                    onClick={() => removeProductChecked(item)}
                    className="cursor-pointer text-red-500"
                  >
                    <CgClose></CgClose>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AppliesTo;
