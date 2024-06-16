/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../../../utils";
import TableSkeletor from "./TableSkeletor";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";

const HeaderTable = ["name", "stock", "code", "price"];
const Table = (props) => {
  const { data, loading } = props;
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm mt-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            {HeaderTable.map((item, index) => (
              <th
                scope="col"
                className="px-6 uppercase font-bold py-4  text-gray-900"
                key={index}
              >
                {t(`admin.variant.table.${item}`)}
              </th>
            ))}
            <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {/* Row 1 */}
          {data?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900">
                <div className="relative h-10 w-10 shrink-0">
                  <img
                    className="h-full w-full object-contain"
                    src={item.thumbnail}
                    alt={item.name}
                  />
                </div>
                <div
                  className="font-medium text-gray-700 max-w-xs text-ecl"
                  title={item.name}
                >
                  <Link to={`/admin/products/${item.name}-${item.id}/edit`}>
                    {item.name + " - " + item.code}
                  </Link>
                </div>
              </th>
              <td className="px-6 py-4">
                {item.stock == 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                    Out of Stock ( {item.stock} )
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    In Stock ( {item.stock} )
                  </span>
                )}
              </td>
              <td className="px-6 py-4">{item.code}</td>
              <td className="px-6 py-4">
                {item.price && formatPrice(Number(item.price))}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-4">
                  <Link to={`/admin/products/${item.name}-${item.id}/edit`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
          {/* no data */}
          {data?.length === 0 && (
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
