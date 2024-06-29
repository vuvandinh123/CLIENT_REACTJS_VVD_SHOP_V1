// lib
import { useState } from "react";
import { useTranslation } from "react-i18next";
// components
import TableSkeletor from "./TableSkeletor";
import LayoutListShop from "../../../../components/page";

// hook
import { useApiCall, useMultipleSelect } from "../../../../../hooks";
// utils
import { formatPriceVND, formathDate } from "../../../../../utils";
import { getAllOrderShop } from "../../../../service/Order";
import { statusOrder } from "../../../../data/statusOrder";
import { FaBook, FaShower } from "react-icons/fa";
import { getFollowNewShop } from "../../../../service/Follow";
import { getAllUserByAdmin } from "../../../../service/User";

const HeaderTable = [
  "listUserAdmin.table.name",
  "listUserAdmin.table.email",
  "listUserAdmin.table.count_order",
  "listUserAdmin.table.created_at",
];
const ListOrders = () => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
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
    const response = await getAllUserByAdmin({
      ...filter,
      limit: pagination.limit,
      page: pagination.page,
    });
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
    linkCreate: "/seller/discounts/create",
    title: "Quản lý khách hàng",
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
    isBtnCreated: false,
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
            <td className="px-6 py-4 flex items-center gap-3 ">
              <img
                className="h-10 w-10 shrink-0 rounded-full"
                src={
                  item?.image ||
                  "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                }
                onError={(e) => {
                  e.target.src =
                    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
                  e.target.onerror = null;
                }}
                alt=""
              />
              {item?.lastName + " " + item?.firstName}
            </td>
            <td className="px-6 py-4">
              <span>{item.email}</span>
            </td>
            <td className="px-6 py-4">
              <span>{item.count_order}</span>
            </td>
            <td className="px-6 py-4">
              <span>{formathDate(item?.created_at)}</span>
            </td>
          </tr>
        ))}
      {/* loading */}
      {loading &&
        Array(5)
          .fill(0)
          .map((_, index) => <TableSkeletor key={index}></TableSkeletor>)}
    </LayoutListShop>
  );
};

export default ListOrders;
