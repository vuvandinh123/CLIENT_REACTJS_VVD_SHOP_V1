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
  customStatus,
  title,
  children,
  addFilter,
  // bool
  isBtnCreated,
  isCheckBox,
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
        customStatus={customStatus}
        isBtnCreated={isBtnCreated}
        refresh={refresh}
        linkCreate={linkCreate}
        setFilter={setFilter}
        dataStatus={dataStatus}
      ></NavStatus>
      {/* filter */}
      <Filter
        filter={filter}
        handleMultiple={handleMultiple}
        isCheckBox={isCheckBox}
        checkedStates={checkedStates}
        addFilter={addFilter}
        setFilter={setFilter}
      />
      {/* Table */}
      <Table
        data={data}
        isCheckBox={isCheckBox}
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
