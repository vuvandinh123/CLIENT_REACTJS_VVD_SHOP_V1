/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const CategoriesSiderbar = ({ data, loading, catgoryId }) => {
  return (
    <>
      <h3 className="font-bold uppercase ">Danh mục liên quan</h3>
      <ul className="mt-5">
        {loading && <div>Loading...</div>}
        {!loading &&
          data &&
          data.length > 0 &&
          data?.map((item) => (
            <label
              key={item.id}
              htmlFor={item.name}
              className=" cursor-pointer"
            >
              <div className="my-1">
                <Link
                  to={`/categories/${item.slug}-${item.id}`}
                  className={`text-gray-500 capitalize py-1 flex items-center pt-[2px] hover:pl-2 hover:transition-all duration-100 hover:text-[#1a40ff] relative ${
                    catgoryId == item.id
                      ? "text-[#1a40ff] pl-2 before:content-[''] before:block before:h-full   before:bg-[#1a40ff] before:w-[1px] before:absolute before:left-0 before:translate-y-[-50%] before:top-1/2  before:transition-all before:duration-300 "
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            </label>
          ))}
      </ul>
    </>
  );
};
CategoriesSiderbar.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};
export default CategoriesSiderbar;
