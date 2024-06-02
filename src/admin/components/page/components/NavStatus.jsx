/* eslint-disable react/prop-types */

import { RiAddCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const NavStatus = ({
  filter,
  setFilter,
  dataStatus = {},
  linkCreate,
  customStatus,
  isBtnCreated = true,
}) => {
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
  //
  return (
    <div className="flex mt-5 justify-between items-center px-2">
      <div className="">
        {customStatus ? (
          customStatus
        ) : (
          <ul className="flex items-center gap-3">
            <li
              onClick={handleClickAll}
              className={`hover:underline cursor-pointer hover:text-blue-500 ${
                filter.active === "all" && "text-blue-500"
              }`}
            >
              Tất cả ( {dataStatus?.countTotal || 0} )
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
        )}
      </div>
      {isBtnCreated && (
        <Link
          to={linkCreate || "#"}
          className="px-3 flex items-center gap-2 py-2 bg-blue-500 text-white rounded-md"
        >
          <RiAddCircleFill></RiAddCircleFill> Thêm mới
        </Link>
      )}
    </div>
  );
};

export default NavStatus;
