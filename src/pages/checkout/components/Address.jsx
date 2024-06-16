/* eslint-disable no-unused-vars */
import { useState } from "react";
import { ModalAddress } from "./ModalAddress";
import { useApiCall } from "../../../hooks";
import { getAllUserAddressOrder } from "../../../service/UserAddressOrder";
import AddressItem from "./AddressItem";
import { useField } from "formik";

const Address = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: address } = useApiCall(async () => {
    const res = await getAllUserAddressOrder();
    return res.data;
  }, [isOpen]);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 ">
        Địa chỉ nhận hàng
      </h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <p>Chọn địa chỉ nhận hàng</p>
        {address?.map((item, index) => (
          <AddressItem key={index} data={item} name="address_id"></AddressItem>
        ))}
        <div className="w-full sm:col-span-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 "
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14m-7 7V5"
              />
            </svg>
            Thêm địa chỉ
          </button>
          <ModalAddress isOpen={isOpen} setIsOpen={setIsOpen}></ModalAddress>
        </div>
      </div>
    </div>
  );
};

export default Address;
