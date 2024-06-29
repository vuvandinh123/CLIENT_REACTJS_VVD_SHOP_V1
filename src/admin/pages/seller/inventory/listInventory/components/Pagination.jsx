/* eslint-disable react/prop-types */
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = (props) => {
  const { setPagination, pagination } = props;
  const { page, total, totalProduct } = pagination;
  //   sự kiện next trang và prev trang
  const handlePrev = () => {
    if (page === 1) return;
    setPagination({ ...pagination, page: page - 1 });
  };
  const handleNext = () => {
    if (page === total) return;
    setPagination({ ...pagination, page: page + 1 });
  };
  const handleClickPage = (page) => {
    setPagination({ ...pagination, page: page });
  };
  //   sự kiện thay đổi số lượng hiển thị limit
  const handleChangeLimit = (e) => {
    setPagination({ ...pagination, limit: e.target.value });
  };
  return (
    <>
      <nav className="mt-3 flex w-full items-center justify-between">
        <ul className="flex">
          <li>
            <span
              onClick={handlePrev}
              className="border-blue-gray-100 bg-transparent text-blue-gray-500 hover:bg-light-300 mx-1 flex h-9 w-9 cursor-pointer  items-center justify-center rounded-full border p-0 text-sm transition duration-150 ease-in-out"
              href="#"
              aria-label="Previous"
            >
              <FaAngleLeft></FaAngleLeft>
            </span>
          </li>
          {Array(total)
            .fill(0)
            .map((_, index) => {
              if (index < page - 3) {
                return "";
              } else if (index > page + 1) {
                return "";
              } else {
                return (
                  <span
                    onClick={() => handleClickPage(index + 1)}
                    key={index}
                    className={`mx-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full  transition duration-150 ease-in-out ${
                      index + 1 === page
                        ? "bg-gradient-to-tr from-pink-600 to-pink-400 p-0 text-sm  text-white shadow-md shadow-pink-500/20"
                        : "border-blue-gray-100 bg-gray-100  text-blue-gray-500 hover:bg-light-300 border transition"
                    }`}
                    href="#"
                  >
                    {index + 1}
                  </span>
                );
              }
            })}
          <li>
            <span
              onClick={handleNext}
              className="border-blue-gray-100 bg-transparent text-blue-gray-500 hover:bg-light-300 mx-1 flex h-9 w-9 cursor-pointer   items-center justify-center rounded-full border p-0 text-sm transition duration-150 ease-in-out"
              aria-label="Next"
            >
              <FaAngleRight></FaAngleRight>
            </span>
          </li>
        </ul>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-700 me-3">
            Trang <span className="text-[#000]">{page}</span> của{" "}
            <span className="text-[#000]">{total}</span>
          </span>
          <span className="text-sm">-</span>
          {/* page size */}
          <span className="text-sm flex items-center gap-3 text-gray-700 ms-3">
            Hiển thị
            <div>
              <select
                className="rounded-md border  bg-white  px-2 py-2 outline-none "
                name=""
                onChange={handleChangeLimit}
                id=""
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            {" / "}
            <span className="text-[#000] mx-2">{totalProduct}</span> Sản phẩm
          </span>
        </div>
      </nav>
    </>
  );
};

export default Pagination;
