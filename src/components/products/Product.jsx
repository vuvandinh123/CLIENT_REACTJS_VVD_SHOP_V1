import { FiLayers } from "react-icons/fi";
import { AiOutlineCheck, AiOutlineEye } from "react-icons/ai";
import { ImageLoader, Title } from "../common";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ChangePrice from "../common/ChangePrice";
import { BsCartPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { byToCart, setIsOpenCart } from "../../redux/slice/cartSlice";
import Fav from "./Fav";
import { setIsOpenSelectOptions } from "../../redux/slice/selectCartSlice";
const Product = ({ deals, data }) => {
  const dispatch = useDispatch();
  const handleClickToCart = () => {
    if (data.type === "single") {
      const newCart = {
        name: data.name,
        price: data.price,
        id: data.id,
        image: data?.imageUrls[0],
        shop_id: data.shop_id,
        slug: data.slug,
      };
      dispatch(byToCart(newCart));
      if (window.screen.width > 768) {
        dispatch(setIsOpenCart(true));
      } else {
        toast.success("Thêm vào giỏ hàng thành công");
      }
    } else {
      dispatch(setIsOpenSelectOptions({isOpen:true,id:data.id}))
    }
  };

  return (
    <>
      <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
        <div className="mx-1 flex h-full flex-col justify-between  group rounded-md overflow-hidden relative  bg-white ">
          <div className="px-5">
            <div className="cursor-pointer relative min-h-[177px] flex items-center justify-center">
              {data?.thumbnail ? (
                <>
                  <Link to={`/products/${data?.slug}`}>
                    <ImageLoader
                      src={data.thumbnail}
                      className={
                        "lg:group-hover:hidden   lg:group-hover:scale-105 transition-all duration-300"
                      }
                    />
                    {data.imageUrls[0] && (
                      <img
                        className="!hidden    lg:group-hover:!block lg:group-hover:scale-105 transition-all duration-500"
                        src={data?.imageUrls[0]}
                        alt=""
                      />
                    )}
                  </Link>
                </>
              ) : (
                <Skeleton width="100%" height="177px" />
              )}
            </div>
            <div
              className={`${
                data?.discount?.length > 0 ? "bg-[#f92e2e]" : "bg-[#35ff1a]"
              } absolute top-5 z-0 font-bold text-[12px] left-0 px-2 py-1 text-white `}
            >
              {data?.discount?.length > 0 && data.discount ? (
                <span>-{data.discount[0].discount_percent}%</span>
              ) : (
                "new"
              )}
            </div>
            <div className="absolute  z-30 md:top-20 top-10 right-2 md:opacity-0 md:group-hover:top-5 md:group-hover:opacity-100 transition-all duration-500 ">
              <Fav data={data} />
              <div className="w-9 h-9 cursor-pointer hover:bg-[#4459ff] hover:text-white group/t bg-white mb-1 flex justify-center items-center rounded-full bg-transparent border">
                <FiLayers />
                <Title title={"Add compare"} />
              </div>
              <div className="w-9 h-9 hidden md:flex cursor-pointer hover:bg-[#4459ff] hover:text-white group/t bg-white mb-1 justify-center items-center rounded-full bg-transparent border">
                <AiOutlineEye />
                <Title title={"Quick view"} />
              </div>
              <div
                onClick={handleClickToCart}
                className="w-9 h-9  flex md:hidden cursor-pointer hover:bg-[#4459ff] hover:text-white group/t bg-white mb-1 justify-center items-center rounded-full bg-transparent border"
              >
                <BsCartPlus />
                <Title title={"Add to cart"} />
              </div>
            </div>
          </div>
          <div className="px-[10px] relative left-0 lg:group-hover:-mt-12 lg:group-hover:pb-16 pb-5 transition-all duration-500 mt-0 z-20 py-3 bg-white">
            <h3 className="text-[15px] text-ellipsis h-10 w-full line-clamp-2 leading-[1.2em] max-h-[2.4em]  overflow-hidden ">
              {data?.name ? (
                <Link to={`/products/${data?.slug}`} className="font-medium ">
                  {data?.name}
                </Link>
              ) : (
                <Skeleton width="100%" height="30px" />
              )}
            </h3>
            <div className="flex items-center mt-2 gap-2">
              {!data?.start ? (
                <>
                  <div className="flex items-center gapx-3 text-yellow-400">
                    {Array(5)
                      .fill(0)
                      .map((item, index) => {
                        if (index < 3) {
                          return (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 md:w-5 w-3 md:h-5"
                              viewBox="0 0 20 20"
                              fill="#ff8400b9"
                              key={index}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          );
                        } else {
                          return (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 md:w-5 w-3 md:h-5"
                              viewBox="0 0 20 20"
                              fill="#E5E5DE"
                              key={index}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          );
                        }
                      })}
                  </div>
                  <span className="text-gray-400 text-[12px]">(1 review)</span>
                </>
              ) : (
                <Skeleton width="120px" height="10px" />
              )}
            </div>
            <div className="flex items-center gap-3">
              {data?.price ? (
                <>
                  <ChangePrice
                    price={data?.price}
                    className="text-[#3741ff] font-bold text-base mt-1"
                  />
                  <span className="text-gray-300 font-semibold text-xs mt-1 line-through">
                    $300.00
                  </span>
                </>
              ) : (
                <Skeleton width="100px" height="20px" />
              )}
            </div>
            <div className={`${deals ? "block" : "hidden"}`}>
              <div
                className={`h-2 mt-3 rounded-xl relative flex bg-[#00000016] `}
              >
                <span
                  style={{ width: data?.quantity + "%" }}
                  className="bg-red-500 absolute top-0 left-0 bottom-0 w-10 rounded-xl"
                ></span>
              </div>
              <p className="text-gray-500 mt-3">
                Sold:{" "}
                <span className="text-black font-bold">
                  {data?.quantity}/100{" "}
                </span>{" "}
                products
              </p>
            </div>
            <div className={`${deals ? "hidden" : "block"} mt-6 h-2`}>
              <div className="flex items-center text-[#1c8e24] text-[12px] ">
                {" "}
                <AiOutlineCheck className="me-2" /> In stock{" "}
                <span className="text-black ms-2">
                  {" "}
                  {data?.quantity} Products
                </span>
              </div>
            </div>
            <button
              onClick={handleClickToCart}
              className="bg-[#2b38d1] capitalize absolute mt-5 text-white py-2  left-2 right-2 lg:py-2 lg:px-8 rounded-full transition-all"
            >
              {data.type === "single" ? "Add To Cart" : "Select options"}
            </button>
          </div>
        </div>
      </SkeletonTheme>
      
    </>
  );
};

Product.propTypes = {
  deals: PropTypes.bool,
  data: PropTypes.object,
};
export default Product;
