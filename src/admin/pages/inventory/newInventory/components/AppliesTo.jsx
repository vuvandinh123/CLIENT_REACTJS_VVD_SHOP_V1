/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalAppliesProduct from "./ModalAppliesProduct";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { formatPrice, formatPriceVND } from "../../../../../utils";

const AppliesTo = ({ listProductCheck, setListProductCheck }) => {
  const [isOpen, setIsOpen] = useState(false);
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
  return (
    <div className="mb-4">
      <div className="w-full rounded-lg bg-white p-5  shadow-md">
        <h3 className="text-xl font-bold capitalize">Sản phẩm</h3>
        <p className="mt-2 mb-4 text-sm font-medium text-gray-400">
          Chọn sản phẩm muốn nhập thêm.
        </p>
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
            Thêm
          </span>
        </div>
        <div className="mb-5">
          <ModalAppliesProduct
            listProductCheck={listProductCheck}
            setListProductCheck={setListProductCheck}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          ></ModalAppliesProduct>
        </div>
        <div>
          {listProductCheck.length > 0 &&
            listProductCheck.map((item, index) => (
              <div
                key={item.id + index}
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
                  <p className="text-ecl hover:text-gray-800 hover:underline">
                    <Link className="block" to={`/admin/products/${item.slug}-${item.id}/edit`}>
                      {item.name} {item.code}
                    </Link>
                  </p>
                  <div className="flex mt-2 items-center gap-3">
                    <span className="block">
                      Giá bán:{" "}
                      <span className="font-bold">
                        {formatPriceVND(Number(item.price))}
                      </span>
                    </span>
                    <span>
                      Trong kho:{" "}
                      <span
                        className={`${
                          item.stock <= 10 ? "text-red-500" : ""
                        } font-bold`}
                      >
                        {" "}
                        {item.stock}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  <input
                    name="quantity"
                    type="number"
                    title="Số lượng"
                    value={item.quantity}
                    onChange={(e) => {
                      const product = listProductCheck[index];
                      const updatedList = listProductCheck.map((item, i) =>
                        i === index
                          ? { ...product, quantity: e.target.value }
                          : item
                      );
                      setListProductCheck(updatedList);
                    }}
                    className="w-[100px] rounded-md px-3 py-2 border outline-blue-500"
                    placeholder="Số lượng"
                  />
                </div>
                <div className="col-span-1">
                  <input
                    name="quantity"
                    type="number"
                    title="Giá nhập"
                    value={item.import_price}
                    onChange={(e) => {
                      const product = listProductCheck[index];
                      const updatedList = listProductCheck.map((item, i) =>
                        i === index
                          ? { ...product, import_price: e.target.value }
                          : item
                      );
                      setListProductCheck(updatedList);
                    }}
                    className="w-[150px] rounded-md px-3 py-2 border outline-blue-500"
                    placeholder="Giá nhập"
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <span
                    onClick={() => removeProductChecked(item)}
                    title="Xóa"
                    className="cursor-pointer p-2 hover:bg-red-100 rounded-md text-red-500 hover:text-red-600"
                  >
                    <CgClose></CgClose>
                  </span>
                </div>
              </div>
            ))}
          {listProductCheck.length === 0 && (
            <p className="text-gray-400 text-center">Chưa có sản phẩm nào</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliesTo;
