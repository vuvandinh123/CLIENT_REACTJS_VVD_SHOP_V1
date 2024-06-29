/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useTranslation } from "react-i18next";
import { useApiCall } from "../../../../hooks";
import { getAllCategory } from "../../../service/Category";
import { debounce, orderBy, sortBy } from "lodash";
import { useRef } from "react";
import toast from "react-hot-toast";

const Filter = (props) => {
  const { filter, setFilter, checkedStates, handleMultiple } = props;
  const { t } = useTranslation();
  const searchRef = useRef(null);
  //  lấy tất cả danh mục
  const { data: categories } = useApiCall(async () => {
    const response = await getAllCategory({});
    return response.data;
  }, []);

  //  function sự kiện
  const handleChangeSearch = debounce(async (e) => {
    setFilter({ ...filter, search: e.target.value });
  }, 500);

  const handleChangeCategory = (e) => {
    setFilter({ ...filter, categoryId: e.target.value });
  };
  const handleChangeOrderBy = (e) => {
    setFilter({ ...filter, sortBy: e.target.value });
  };
  // xóa dữ liệu search
  const handleClickClearSearch = () => {
    setFilter({ ...filter, search: "" });
    searchRef.current.value = "";
  };
  return (
    <div className="px-2 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-md">Chức năng:</h3>
          <button
            onClick={() => {
              if (checkedStates?.length == 0) {
                toast.error("Vui lòng chọn một sản phẩm");
                return;
              }
              handleMultiple(
                filter?.active === "0" ? "delete" : "status",
                filter?.active === "0" ? "2" : "0"
              );
            }}
            className="hover:underline text-red-500 hover:text-red-700"
          >
            {filter?.active === "0" ? "Xóa " : "Thêm vô thùng rác "}({" "}
            {checkedStates?.length} )
          </button>
          {filter?.active === "0" && (
            <button
              onClick={() => {
                if (checkedStates?.length == 0) {
                  toast.error("Vui lòng chọn một sản phẩm");
                  return;
                }
                handleMultiple("status", 2);
              }}
              className="hover:underline hover:text-green-700"
            >
              Hiển thị ( {checkedStates?.length} )
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* sort by name or price */}
          <div>
            <select
              className="px-2 outline-blue-500 py-2 rounded-md bg-white border"
              name=""
              onChange={handleChangeOrderBy}
              defaultValue={""}
              id=""
            >
              <option value="" disabled>
                Sắp xếp theo
              </option>
              <option value="createdAtDesc">Date, new to old</option>
              <option value="createdAtAsc">Date, old to new</option>
              <option value="nameDesc">Alphabetically, Z-A</option>
              <option value="nameAsc">Alphabetically, A-Z</option>
              <option value="priceDesc">Price, high to low</option>
              <option value="priceAsc">Price, low to high</option>
            </select>
          </div>
          {/* filter by category */}
          <div>
            <select
              className="px-2 outline-blue-500 py-2 rounded-md bg-white border"
              name=""
              defaultValue={""}
              onChange={handleChangeCategory}
              id=""
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              <option value="">Tất cả danh mục</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              ref={searchRef}
              onChange={handleChangeSearch}
              className="px-2 outline-blue-500 w-[250px] py-2 rounded-md bg-white border"
            />
            {filter.search.length > 3 && (
              <span
                onClick={handleClickClearSearch}
                className="absolute top-1/2 right-3 -translate-y-1/2 hover:bg-gray-100 p-1 rounded-md"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  className="text-gray-500"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
