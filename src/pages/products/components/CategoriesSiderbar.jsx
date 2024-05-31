import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const CategoriesSiderbar = ({ data, loading }) => {
  return (
    <>
      <h3 className="font-bold uppercase "> product category</h3>
      <ul className="mt-5">
        <label htmlFor={"all"} className=" cursor-pointer">
          <div className="my-2">
            <Link
              to={`/categories/all`}
              className="text-gray-500 py-1 pt-[2px] block hover:pl-1 hover:transition-all duration-100 hover:text-[#1a40ff]"
            >
              All
            </Link>
          </div>
        </label>
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
              <div className="my-2">
                <Link
                  to={`/categories/${item.slug}`}
                  className="text-gray-500 py-1 pt-[2px] block hover:pl-1 hover:transition-all duration-100 hover:text-[#1a40ff]"
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
