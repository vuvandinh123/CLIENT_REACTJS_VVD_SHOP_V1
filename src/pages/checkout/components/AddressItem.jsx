/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Field, useField } from "formik";
import { Radio } from "keep-react";
import React, { useId } from "react";
import Swal from "sweetalert2";
import { deleteAddressOrderByUser } from "../../../service/UserAddressOrder";
import toast from "react-hot-toast";

const AddressItem = ({ data, setIsOpenEdit, setData, ...props }) => {
  const id = useId();
  const handleClickDelete = async () => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa địa chỉ nhân hàng này ?",
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Xóa",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await deleteAddressOrderByUser(data.id);
        toast.success("Xóa địa chỉ nhân hàng thành công");
        props.setIsRefresh((prev) => !prev);
      }
    });
  };
  return (
    <div className="sm:col-span-2 ">
      <div
        htmlFor={`address-${id}`}
        className="mb-1 bg-gray-50 flex justify-between items-center cursor-pointer gap-2 text-sm border px-4 py-3 rounded-md font-medium text-gray-900 "
      >
        <label htmlFor={`address-${id}`}  className="flex gap-2">
          {/* <Field type="radio" name="address_id"  value={data?.id?.toString()}></Field> */}
          <Field
            className="shrink-0 w-4 h-4"
            name="address_id"
            value={data?.id?.toString()}
            type="radio"
            id={`address-${id}`}
          />
          <div className="border-l ps-3">
            <span className="font-bold capitalize me-3 shrink-0">
              {data.last_name} {data.first_name} - {data.phone}
            </span>
            <span className="">
              {data.address_detail}, {data?.province_name},{data?.nation_name}{" "}
            </span>
          </div>
        </label>
        <div className="shrink-0 ">
          <span
            onClick={() => {
              setIsOpenEdit(true);
              setData(data);
            }}
            className="border-l pl-3 underline text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            Sửa
          </span>
          <span
            onClick={handleClickDelete}
            className=" pl-3 underline text-red-500 hover:text-red-600 cursor-pointer"
          >
            Xóa
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddressItem;
