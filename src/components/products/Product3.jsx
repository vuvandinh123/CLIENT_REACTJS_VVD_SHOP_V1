import { formatPriceVND } from "../../utils";
import { AiOutlineCheck, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import Title from "../common/Title";
import { Link } from "react-router-dom";
import ImageLoader from "../common/ImageLoader";
import PropTypes from "prop-types";

const Product3 = ({ data }) => {
  return (
    <>
      <div className="p-1">
        <div className="flex bg-white">
          <div className="relative group p-1">
            <div className="pt-2 w-[150px] overflow-hidden md:w-[180px]">
              <Link
                to={`/products/${data.slug}-${data.id}`}
                className="block relative h-[160px]"
              >
                <ImageLoader
                  src={data?.thumbnail}
                  className={` duration-400 object-contain`}
                  alt={"image"}
                />
              </Link>
            </div>

            <div className="absolute top-20 right-2 opacity-0 group-hover:top-10 group-hover:opacity-100 transition-all duration-500 ">
              <div className="w-9 h-9 hover:bg-[#4459ff] hover:text-white bg-white group/t  cursor-pointer mb-1 relative flex justify-center items-center rounded-full bg-transparent border">
                <AiOutlineHeart />
                <Title title={"Add wishlist"} />
              </div>
              <div className="w-9 h-9 cursor-pointer hover:bg-[#4459ff] hover:text-white group/t bg-white mb-1 flex justify-center items-center rounded-full bg-transparent border">
                <FiLayers />
                <Title title={"Add compare"} />
              </div>
              <div className="w-9 h-9 cursor-pointer hover:bg-[#4459ff] hover:text-white group/t bg-white mb-1 flex justify-center items-center rounded-full bg-transparent border">
                <AiOutlineEye />
                <Title title={"Quick view"} />
              </div>
            </div>
            <div className="absolute top-5 font-bold text-[12px] left-0 px-2 py-1 text-white bg-[#1edd4b]">
              NEW
            </div>
          </div>
          <div className="py-5 px-2 flex flex-col">
            <h3 className="h-10">
              <Link
                to={`/products/${data.slug}`}
                className="font-[500px] text_ecl-2"
              >
                {data.name}
              </Link>
            </h3>
            <div className="flex items-center gap-2 md:my-3 my-1">
              <div className="flex items-center gapx-3 text-yellow-400">
                {Array(5)
                  .fill(0)
                  .map((item, index) => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`md:h-5 h-3 w-3 md:w-5`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      key={index}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <span className="text-gray-400 text-[12px]">
                ({data?.review || 0} review)
              </span>
            </div>
            <h4 className="text-[#3741ff] font-bold text-xl ">
              {formatPriceVND(data?.price)}
            </h4>
            <div className={`mt-2 flex justify-between items-center`}>
              <div className="flex items-center text-[#1c8e24] text-[13px] ">
                {" "}
                <AiOutlineCheck className="me-2" /> Còn{" "}
                <span className="text-black ms-2">
                  {" "}
                  <span className="font-bold">{data.quantity}</span> Sản phẩm
                </span>
              </div>
              <div className="text-gray-800 text-[13px]">{data.province}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Product3.propTypes = {
  data: PropTypes.object,
};
export default Product3;
