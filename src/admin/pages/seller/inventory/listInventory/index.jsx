// lib
import { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import PageHeader from "../../../../components/common/PageHeader";
import Table from "./components/Table";
import Filter from "./components/Filter";
import Pagination from "./components/Pagination";
import NavStatus from "./components/NavStatus";
// service
import {
  changeStatusProduct,
  deleteProduct,
} from "../../../../service/Product";

// hook
import { useApiCall, useMultipleSelect } from "../../../../../hooks";
import toast from "react-hot-toast";
import { getAllInventoryLog } from "../../../../service/InventoryLogs";
import moment from "moment/moment";

const ListInventory = () => {
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
    month: moment().format("YYYY-MM"),
    categoryId: null,
    sortBy: "createdAtDesc",
  });
  // Lấy tất cả sản phẩm
  const { data, loading } = useApiCall(async () => {
    const response = await getAllInventoryLog({
      month: filter.month,
      limit: pagination.limit,
      page: pagination.page,
    });
    setPagination({
      ...pagination,
      total: response.options?.pagination?.totalPage,
      totalProduct: response.options?.count,
    });
    console.log(response);
    return response.data;
  }, [refresh, filter.month, pagination.limit, pagination.page]);
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
    refresh,
  });
  // sự kiện xoá 1 sản phẩm vô thùng rác
  const handleClickDeleteSingle = async (id) => {
    const is = window.confirm(
      "Bạn có muốn chắc muốn xóa sản phẩm vô thùng rác ?"
    );
    if (!is) return;
    toast.promise(
      changeStatusProduct({
        listId: [id],
        value: 0,
      }),
      {
        loading: "Đang tải...",
        success: "Thêm vô thùng rác thành công",
        error: "Lỗi không xóa được",
      }
    );

    setRefresh(!refresh);
  };
  // sự kiện xoá 1 sản phẩm
  const handleClickDeleteSingle2 = async (id) => {
    const is = window.confirm("Bạn có muốn chắc muốn xóa sản phẩm ?");
    if (!is) return;
    toast.promise(
      deleteProduct({
        listId: [id],
      }),
      {
        loading: "Đang tải...",
        success: "Xóa thành công",
        error: "Lỗi không xóa được",
      }
    );
    setRefresh(!refresh);
  };

  return (
    <section>
      {/* header */}
      <PageHeader
        title={t("admin.listInventory.title")}
        setRefresh={setRefresh}
        refresh={refresh}
      ></PageHeader>
      {/* status product count and navigation */}
      <NavStatus
        filter={filter}
        refresh={refresh}
        setFilter={setFilter}
      ></NavStatus>
      {/* filter */}
      <Filter
        filter={filter}
        handleMultiple={handleMultiple}
        checkedStates={checkedStates}
        setFilter={setFilter}
      />
      {/* Table */}
      <Table
        data={data}
        filter={filter}
        isCheckAll={isCheckAll}
        handleClickDeleteSingle={handleClickDeleteSingle}
        handleClickDeleteSingle2={handleClickDeleteSingle2}
        checkedStates={checkedStates}
        handleMultiple={handleMultiple}
        handleCheckAll={handleCheckAll}
        handleCheck={handleCheck}
        setRefresh={setRefresh}
        loading={loading}
        refresh={refresh}
      ></Table>
      {/* pagination */}
      <Pagination setPagination={setPagination} pagination={pagination} />
    </section>
  );
};

export default ListInventory;
