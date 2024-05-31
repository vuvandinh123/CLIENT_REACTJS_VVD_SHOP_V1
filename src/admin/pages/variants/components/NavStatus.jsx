/* eslint-disable react/prop-types */

import { RiAddCircleFill } from "react-icons/ri";
import { useApiCall } from "../../../../hooks";
import { getCountStatusProduct } from "../../../service/Product";
import { Link } from "react-router-dom";

const NavStatus = (props) => {
  // props
  const { filter, setFilter, refresh } = props;

  // gọi api lấy ra số lượng các trạng thái của sản phẩm theo trạng thái [all,active,unactive,trash]
  const { data: dataStatus } = useApiCall(
    async () => {
      const response = await getCountStatusProduct({});
      return response.data;
    },
    [refresh],
    {}
  );
  //   sự kiện
  const handleClickActive = () => {
    setFilter({ ...filter, active: "2" });
  };
  const handleClickUnActive = () => {
    setFilter({ ...filter, active: "1" });
  };
  const handleClickAll = () => {
    setFilter({ ...filter, active: "all" });
  };
  const handleClickTrash = () => {
    setFilter({ ...filter, active: "0" });
  };
  return (
    <div className="flex mt-5 justify-between items-center px-2">
      <div>
        <ul className="flex items-center gap-3">
          <li
            onClick={handleClickAll}
            className={`hover:underline cursor-pointer hover:text-blue-500 ${
              filter.active === "all" && "text-blue-500"
            }`}
          >
            Tất cả sản phẩm ( {dataStatus?.countTotal || 0} )
          </li>
          <li>|</li>
          <li
            onClick={handleClickActive}
            className={`hover:underline cursor-pointer hover:text-blue-500 ${
              filter.active === "2" && "text-blue-500"
            }`}
          >
            {" "}
            Hiển thị ( {dataStatus?.countActive || 0} )
          </li>
          <li>|</li>
          <li
            onClick={handleClickUnActive}
            className={`hover:underline cursor-pointer hover:text-blue-500 ${
              filter.active === "1" && "text-blue-500"
            }`}
          >
            {" "}
            Nháp ( {dataStatus?.countUnActive || 0} )
          </li>
          <li>|</li>
          <li
            onClick={handleClickTrash}
            className={`hover:underline cursor-pointer hover:text-blue-500 ${
              filter.active === "0" && "text-blue-500"
            }`}
          >
            Thùng rác ( {dataStatus?.countTrash || 0} )
          </li>
        </ul>
      </div>
      <Link
        to="/admin/products/create"
        className="px-3 flex items-center gap-2 py-2 bg-blue-500 text-white rounded-md"
      >
        <RiAddCircleFill></RiAddCircleFill> Thêm mới
      </Link>
    </div>
  );
};

export default NavStatus;
