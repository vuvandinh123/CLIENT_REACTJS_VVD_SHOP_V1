/* eslint-disable react/prop-types */

import { Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";
// const HeaderTable = ["name", "code", "type", "value", "status","uses_count"];
const Table = (props) => {
  const {
    data,
    loading,
    children,
    handleCheckAll,
    isCheckAll,
    HeaderTable,
    isCheckBox = true,
  } = props;
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm mt-5">
      {/* table */}
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            {isCheckBox && (
              <th>
                <Checkbox checked={isCheckAll} onChange={handleCheckAll} />
              </th>
            )}

            {HeaderTable.map((item, index) => (
              <th
                scope="col"
                className="px-6 uppercase font-bold py-4  text-gray-900"
                key={index}
              >
                {t(`admin.${item}`)}
              </th>
            ))}
            <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {/* Row 1 */}
          {children}
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
      {/* end table */}
    </div>
  );
};

export default Table;
