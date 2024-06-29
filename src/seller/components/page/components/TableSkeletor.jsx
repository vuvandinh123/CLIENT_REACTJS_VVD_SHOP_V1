
const TableSkeletor = () => {
  return (
    <tr className="animate-pulse">
      <td>
        <div className="bg-slate-200 w-4 h-4  rounded-sm ms-3"></div>
      </td>
      <th className="flex items-center gap-3 px-6  py-4 font-normal text-gray-900">
        <div className="relative bg-slate-200 h-10 w-10 rounded-md"></div>
        <div className="font-medium bg-slate-200 w-40 h-4 rounded-md"></div>
      </th>
      <td className=" py-4 ">
        <div className="inline-flex w-20 h-3 bg-slate-200  items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-green-600"></div>
      </td>
      <td className=" py-4 ">
        <div className="bg-slate-200 w-20 h-3 rounded-md"></div>
      </td>
      <td className=" py-4 ">
        <div className="bg-slate-200 w-20 h-3 rounded-md"></div>
      </td>
      <td className=" py-4 ">
        <div className="bg-slate-200 w-20 h-3 rounded-md"></div>
      </td>
      <td className=" py-4 ">
        <div className="bg-slate-200 w-20 h-3 rounded-md"></div>
      </td>
      <td className=" py-4 px-3">
        <div className="bg-slate-200 w-full h-3 rounded-md"></div>
      </td>
    </tr>
  );
};

export default TableSkeletor;
