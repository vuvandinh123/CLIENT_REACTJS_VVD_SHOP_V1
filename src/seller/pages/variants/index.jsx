/* eslint-disable react-hooks/exhaustive-deps */
// lib
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Table from "./components/Table";

// hook
import { useApiCall } from "../../../hooks";
import { getProductInventory } from "../../service/Product";
import PageHeader from "../../components/common/PageHeader";
import Pagination from "./components/Pagination";

const ListVariant = () => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  //   pagination
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
    total: 1,
    totalProduct: 1,
  });
  // function phaan trang
  const fnPagination = (data) => {
    // setLoading(true);
    const indexOfLastItem = pagination.page * pagination.limit;
    const indexOfFirstItem = indexOfLastItem - pagination.limit;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    setPagination({
      ...pagination,
      total: Math.ceil(pagination.totalProduct / pagination.limit),
    });
    setData2(currentItems);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 500);
  };
  // Lấy tất cả sản phẩm
  useApiCall(async () => {
    const response = await getProductInventory();
    setPagination({
      ...pagination,
      totalProduct: response.data?.length,
    });
    setData(response.data);
    fnPagination(response.data);
    return response.data;
  }, [refresh]);

  useEffect(() => {
    fnPagination(data);
  }, [pagination.page, pagination.limit]);

  return (
    <section>
      {/* header */}
      <PageHeader
        title={t("Biến thể sản phẩm")}
        setRefresh={setRefresh}
        refresh={refresh}
      ></PageHeader>

      {/* Table */}
      <Table data={data2}></Table>
      {/* pagination */}
      <Pagination setPagination={setPagination} pagination={pagination} />
    </section>
  );
};

export default ListVariant;
