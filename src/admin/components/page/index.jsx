/* eslint-disable react/prop-types */
// lib

// components
import Table from "./components/Table";
import Filter from "./components/Filter";
import Pagination from "./components/Pagination";
import NavStatus from "./components/NavStatus";
// hook
import PageHeader from "../common/PageHeader";

const LayoutListShop = ({
  // data
  data,
  HeaderTable,
  //   function
  handleCheckAll,
  handleMultiple,
  //   view
  linkCreate,
  title,
  children,
  viewFilter,
  //   state
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
}) => {
  return (
    <section>
      {/* header */}
      <PageHeader
        title={title}
        setRefresh={setRefresh}
        refresh={refresh}
      ></PageHeader>
      {/* status product count and navigation */}
      <NavStatus
        filter={filter}
        refresh={refresh}
        linkCreate={linkCreate}
        setFilter={setFilter}
        dataStatus={dataStatus}
      ></NavStatus>
      {/* filter */}
      <Filter
        filter={filter}
        handleMultiple={handleMultiple}
        checkedStates={checkedStates}
        viewFilter={viewFilter}
        setFilter={setFilter}
      />
      {/* Table */}
      <Table
        data={data}
        filter={filter}
        handleCheckAll={handleCheckAll}
        isCheckAll={isCheckAll}
        HeaderTable={HeaderTable}
        loading={loading}
      >
        {children}
      </Table>
      {/* pagination */}
      <Pagination setPagination={setPagination} pagination={pagination} />
    </section>
  );
};

export default LayoutListShop;
