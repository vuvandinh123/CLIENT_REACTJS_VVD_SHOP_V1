/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import { formatPrice, formatPriceVND } from "../../../../../utils";
import TableSkeletor from "./TableSkeletor";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import ModalAddInventory from "./ModalAddInventory";
import { MdOutlineDelete } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
const HeaderTable = ["name", "stock", "price", "sold", "type"];
const Table = (props) => {
  const {
    data,
    loading,
    handleClickDeleteSingle,
    filter,
    checkedStates,
    handleCheckAll,
    handleClickDeleteSingle2,
    handleCheck,
    isCheckAll,
    setRefresh,
    refresh,
  } = props;
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm mt-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th>
              <Checkbox checked={isCheckAll} onChange={handleCheckAll} />
            </th>
            {HeaderTable.map((item, index) => (
              <th
                scope="col"
                className="px-6 uppercase font-bold py-4  text-gray-900"
                key={index}
              >
                {t(`admin.listProduct.table.${item}`)}
              </th>
            ))}
            <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {/* Row 1 */}
          {!loading &&
            data?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td>
                  <Checkbox
                    value={item.id}
                    onChange={handleCheck}
                    checked={checkedStates.includes(item.id)}
                  />
                </td>
                <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10 shrink-0">
                    <img
                      className="h-full w-full object-contain"
                      src={item.thumbnail}
                      alt={item.name}
                    />
                    <span
                      className={`absolute right-0 bottom-0 h-2 w-2 rounded-full`}
                    >
                      <span
                        className={`animate-ping absolute inline-flex  h-full w-full rounded-full opacity-75 ${
                          item.is_active == 2 ? "bg-green-400 " : "bg-gray-200"
                        }`}
                      />
                      <span
                        className={`absolute inline-flex rounded-full h-2 w-2  ${
                          item.is_active == 2 ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    </span>
                  </div>
                  <div
                    className="font-medium text-gray-700 max-w-xs text-ecl"
                    title={item.name}
                  >
                    <Link to={`/seller/products/${item.slug}-${item.id}/edit`}>
                      {item.name}
                    </Link>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <ModalAddInventory
                    refresh={refresh}
                    setRefresh={setRefresh}
                    data={item}
                  ></ModalAddInventory>
                </td>
                <td className="px-6 py-4">{formatPriceVND(item.price < 0 ? 0 : item.price)}</td>
                <td className="px-6 py-4">{item.sold}</td>
                <td className="px-6 py-4">{item.type}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end items-center gap-2">
                    <Link
                      className="text-gray-500 px-3 hover:text-blue-500"
                      title="Edit"
                      to={`/seller/products/${item.slug}-${item.id}/edit`}
                    >
                      <LuClipboardEdit size={20}></LuClipboardEdit>
                    </Link>
                    |
                    <button
                      className="text-gray-500 px-3 hover:text-red-500"
                      title="Delete"
                      type="button"
                      onClick={() => {
                        if (filter.active == "0") {
                          handleClickDeleteSingle2(item.id);
                        } else {
                          handleClickDeleteSingle(item.id);
                        }
                      }}
                    >
                      <MdOutlineDelete size={25}></MdOutlineDelete>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          {/* loading */}
          {loading &&
            Array(5)
              .fill(0)
              .map((_, index) => <TableSkeletor key={index}></TableSkeletor>)}
          {/* no data */}
          {!loading && data?.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-5">
                {t("admin.listProduct.table.noData")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
