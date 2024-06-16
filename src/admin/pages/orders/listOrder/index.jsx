// lib
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// components
import TableSkeletor from "./TableSkeletor";
import LayoutListShop from "../../../components/page";

// hook
import { useApiCall, useMultipleSelect } from "../../../../hooks";
// utils
import { formatPriceVND, formathDate } from "../../../../utils";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { getAllOrderShop } from "../../../service/Order";
import { statusOrder } from "../../../data/statusOrder";
import ModalShow from "./ModalShow";
import { FaBook, FaShower } from "react-icons/fa";

const HeaderTable = [
  "listOrder.table.id",
  "listOrder.table.status",
  "listOrder.table.discount",
  "listOrder.table.created_at",
  "listOrder.table.amount",
];
const ListOrders = () => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [idOrder, setIdOrder] = useState(null);
  //   pagination
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
    total: 1,
    totalProduct: 1,
  });
  //   filter
  const [filter, setFilter] = useState({
    search: "",
    active: "all",
    status: "ALL",
    sortBy: "createdAtDesc",
  });
  // Lấy tất cả mã giảm giá
  const { data, loading } = useApiCall(async () => {
    const response = await getAllOrderShop({
      ...filter,
      limit: pagination.limit,
      page: pagination.page,
    });
    console.log(response);
    setPagination({
      ...pagination,
      total: response.options?.pagination?.totalPage,
      totalProduct: response.options?.count,
    });
    return response.data;
  }, [
    refresh,
    pagination.limit,
    pagination.page,
    filter.active,
    filter.sortBy,
    filter.search,
    filter.status,
  ]);
  // chức năng xóa thay đổi nhiều trạng thái
  const {
    checkedStates,
    handleCheckAll,
    handleMultiple,
    handleCheck,
    isCheckAll,
  } = useMultipleSelect({
    data: data,
    on: () => setRefresh(!refresh),
    fnDeleteMultiple: async ({ listId }) => {
      // const res = await deleteDiscount({ listId });
      return {};
    },
    fnChangeStatusMultiple: async ({ listId, value }) => {
      // const res = await changeStatusDiscount({ listId, value });
      return {};
    },
    refresh,
  });
  // sự kiện xoá 1 sản phẩm vô thùng rác
  const handleClickDeleteSingle = async (id) => {
    const is = window.confirm("Bạn có muốn chắc muốn xóa vô thùng rác ?");
    if (!is) return;
    // toast.promise(
    //   changeStatusDiscount({
    //     listId: [id],
    //     value: 0,
    //   }),
    //   {
    //     loading: "Đang tải...",
    //     success: "Thêm vô thùng rác thành công",
    //     error: "Lỗi không xóa được",
    //   }
    // );

    setRefresh(!refresh);
  };
  // sự kiện xoá 1 sản phẩm
  const handleClickDeleteSingle2 = async (id) => {
    const is = window.confirm("Bạn có muốn chắc muốn xóa ?");
    if (!is) return;
    // toast.promise(
    //   deleteDiscount({
    //     listId: [id],
    //   }),
    //   {
    //     loading: "Đang tải...",
    //     success: "Xóa thành công",
    //     error: "Lỗi không xóa được",
    //   }
    // );
    setRefresh(!refresh);
  };
  const handleClickDelete = async (id) => {
    if (filter.active != 0) {
      handleClickDeleteSingle(id);
    } else {
      handleClickDeleteSingle2(id);
    }
  };
  // gọi api lấy ra số lượng các trạng thái của sản phẩm theo trạng thái [all,active,unactive,trash]
  const { data: dataStatus } = useApiCall(
    async () => {
      // const response = await getCountStatusDiscountCode({
      //   limit: pagination.limit,
      //   page: pagination.page,
      //   ...filter,
      // });
      // console.log("dinh");
      // return response.data;
    },
    [
      refresh,
      filter.active,
      pagination.limit,
      pagination.page,
      filter.status,
      filter.sortBy,
      filter.search,
    ],
    {}
  );
  const propsComponent = {
    data,
    HeaderTable,
    //   function
    handleCheckAll,
    handleMultiple,
    //   view
    linkCreate: "/admin/discounts/create",
    title: t("admin.listDiscount.title"),
    viewFilter: (
      <>
        <select
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="px-2 outline-blue-500 py-2 rounded-md bg-white border"
          name=""
          id=""
        >
          <option value="" disabled>
            Trạng thái
          </option>
          <option value="all">Tất cả</option>
          <option value="active">Hoạt động</option>
          <option value="upcoming">Sắp tới</option>
          <option value="expired">Hết hạn</option>
        </select>
      </>
    ),
    //   state
    isCheckBox: false,
    dataStatus,
    checkedStates,
    loading,
    isCheckAll,
    pagination,
    setPagination,
    filter,
    setFilter,
    refresh,
    setRefresh,
  };
  return (
    <LayoutListShop {...propsComponent}>
      {!loading &&
        data?.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 font-bold ">
              <div
                title={item.id}
                className="flex cursor-pointer gap-2 bg-gray-100 text-gray-800 items-center border w-max px-3 rounded-sm py-1"
              >
                #{item.id}{" "}
              </div>
            </td>
            <td className="px-6 py-4">
              <span
                style={{
                  background: statusOrder.find((i) => i.code == item.status)
                    ?.color,
                }}
                className={`px-2 bg-green-500 rounded-md py-1 text-white
              
              `}
              >
                {statusOrder.find((i) => i.code == item.status)?.name}
              </span>
            </td>
            <td className="px-6 py-4">
              {item?.discount_id === null ? "Không" : "Đã áp dụng voucher"}
            </td>
            <td className="px-6 py-4">
              <span>{formathDate(item?.order_date)}</span>
            </td>
            <td className="px-6 py-4">
              <span>{formatPriceVND(Number(item?.amount || 0))}</span>
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-end items-center gap-2">
                <span
                  className="text-gray-500 cursor-pointer px-3 hover:text-blue-500"
                  onClick={() => {
                    setIdOrder(item.id);
                    setIsOpen(true);
                  }}
                  title="Edit"
                >
                  <FaBook size={20}></FaBook>
                </span>
              </div>
            </td>
          </tr>
        ))}
      {/* loading */}
      <ModalShow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setRefresh={setRefresh}
        id={idOrder}
      ></ModalShow>
      {loading &&
        Array(5)
          .fill(0)
          .map((_, index) => <TableSkeletor key={index}></TableSkeletor>)}
    </LayoutListShop>
  );
};

export default ListOrders;
