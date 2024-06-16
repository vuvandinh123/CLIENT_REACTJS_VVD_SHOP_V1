import { Pagination } from "keep-react";
import { CaretLeft, CaretRight, DotsThree } from "phosphor-react";
import { setUrlSearchParam } from "../../../utils";

const PaginationShop = ({ limit, page, totalPage, setPagination }) => {
  const handleClickPage = (page) => {
    setPagination((prev) => ({ ...prev, page: page }));
    setUrlSearchParam("page", page);
  };
  const handleClickNexPage = (page) => {
    setPagination((prev) => ({ ...prev, page: page }));
    setUrlSearchParam("page", page);
  };
  const handleClickPrevPage = (page) => {
    setPagination((prev) => ({ ...prev, page: page }));
    setUrlSearchParam("page", page);
  };
  return (
    <div>
      <Pagination className="w-max px-5" shape="circle">
        <Pagination.Navigator
          onClick={() => handleClickPrevPage(page - 1)}
          shape="circle"
        >
          <CaretLeft size={18} />
        </Pagination.Navigator>
        <Pagination.List>
          {Array(totalPage)
            .fill(1)
            .map((item, index) => {
              const pageItem = index + 1;
              // Chỉ hiển thị các trang đầu tiên, các trang cuối cùng và trang hiện tại nếu nó ở giữa
              if (
                pageItem <= 3 || // Hiển thị 5 trang đầu tiên
                pageItem > totalPage - 3 || // Hiển thị 3 trang cuối cùng
                (pageItem >= page - 1 && pageItem <= page + 1) // Hiển thị các trang gần trang hiện tại
              ) {
                return (
                  <Pagination.Item
                    onClick={() => handleClickPage(pageItem)}
                    active={pageItem === page}
                    className={`${pageItem === page && "bg-blue-500"}`}
                    key={pageItem}
                  >
                    {pageItem}
                  </Pagination.Item>
                );
              }

              // Hiển thị dấu ... ở giữa các trang
              if (
                (pageItem === 6 && page > 5) || // Dấu ... sau trang 5 nếu trang hiện tại lớn hơn 8
                (pageItem === totalPage - 3 && page < totalPage - 4) // Dấu ... trước trang cuối cùng nếu trang hiện tại nhỏ hơn tổng số trang trừ 4
              ) {
                return (
                  <Pagination.Item key={pageItem}>
                    <DotsThree size={20} />
                  </Pagination.Item>
                );
              }

              return null;
            })}
        </Pagination.List>

        <Pagination.Navigator
          onClick={() => handleClickNexPage(page + 1)}
          shape="circle"
        >
          <CaretRight size={18} />
        </Pagination.Navigator>
      </Pagination>
    </div>
  );
};

export default PaginationShop;
