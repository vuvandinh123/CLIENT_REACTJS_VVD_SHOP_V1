/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatPrice, formatPriceVND, formathDate } from "../../../../../../utils";
import TableSkeletor from "./TableSkeletor";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import ModalShow from "./ModalShow";
import { MdOutlineEventNote } from "react-icons/md";
const HeaderTable = ["id", "quantity", "amount", "note", "created_at"];
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
  const [showModal, setShowModal] = React.useState(false);
  const [id, setId] = useState(null);
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
                {t(`admin.listInventory.table.${item}`)}
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
                  <div
                    className="font-bold text-gray-700 max-w-xs"
                    title={item.id}
                  >
                    <Link to={`/seller/products/${item.slug}-${item.id}/edit`}>
                      {`#` + item.id}
                    </Link>
                  </div>
                </th>
                <td className="px-6 py-4">x{item.quantity}</td>
                <td className="px-6 py-4">{formatPriceVND(item.total || 0)}</td>
                <td className="px-6 py-4">{item.note}</td>
                <td className="px-6 py-4">{formathDate(item.created_at)}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      className="text-[15px]"
                      type="button"
                      onClick={() => {
                        setId(item.id);
                        setShowModal(true);
                      }}
                    >
                      <MdOutlineEventNote size={25}></MdOutlineEventNote>
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
      <ModalShow
        id={id}
        isOpen={showModal}
        setIsOpen={setShowModal}
      ></ModalShow>
    </div>
  );
};

export default Table;
