import { FiLayers } from "react-icons/fi";
import { AiOutlineCheck, AiOutlineEye } from "react-icons/ai";
import { ImageLoader, Title } from "../common";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ChangePrice from "../common/ChangePrice";
import { BsCartPlus } from "react-icons/bs";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { setIsOpenCart } from "../../redux/slice/cartSlice";
import Fav from "./Fav";
import { setIsOpenSelectOptions } from "../../redux/slice/selectCartSlice";
import { addToCart } from "../../service/Cart";
import { useState } from "react";
import { formatPriceVND, getCookieAuth } from "../../utils";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const Product = ({ deals, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClickToCart = async () => {
    const { userId } = getCookieAuth();
    if (!userId) {
      Swal.fire({
        title: "Bạn cần đăng nhập",
        text: "Bạn cần đăng nhập để thêm giỏ hàng",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không",
        confirmButtonText: "Đăng nhập",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
      return;
    }
    setIsDisabled(true);
    if (data.type === "single") {
      const newCart = { productId: data.id };
      await addToCart(newCart);

      // dispatch(byToCart(newCart));
      if (window.screen.width > 768) {
        dispatch(setIsOpenCart(true));
      } else {
        toast.success("Thêm vào giỏ hàng thành công");
      }
    } else {
      dispatch(setIsOpenSelectOptions({ isOpen: true, id: data.id }));
    }
    setIsDisabled(false);
  };

  return (
    <>
      <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
        <div className="mx-1 flex h-full flex-col  justify-between  group rounded-md overflow-hidden relative  bg-white ">
          <div className="px-5">
            <div className="cursor-pointer relative min-h-[177px] pb-[75%]  flex items-center justify-center">
              {data?.thumbnail ? (
                <>
                  <Link to={`/products/${data?.slug}-${data?.id}`}>
                    <ImageLoader
                      src={data.thumbnail}
                      className={`${
                        data?.imageUrls &&
                        data?.imageUrls[1] &&
                        "lg:group-hover:hidden"
                      }   lg:group-hover:scale-105 absolute left-0 right-0 top-2 bottom-0 object-cover transition-all duration-300`}
                    />
                    {data?.imageUrls && data?.imageUrls[1] && (
                      <img
                        className="!hidden  absolute left-0 right-0 top-2 bottom-0  lg:group-hover:!block transition-all duration-500"
                        onError={(e) => {
                          e.target.src = data?.imageUrls[0];
                        }}
                        src={data?.imageUrls[1]}
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
                data?.discount ? "bg-[#f92e2e]" : "bg-[#35ff1a]"
              } absolute top-5 z-0 font-bold text-[12px] left-0 px-2 py-1 text-white `}
            >
              {data?.discount ? (
                <span>-{data.discount?.toFixed(0)}%</span>
              ) : (
                "Mới"
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
                <Link
                  to={`/products/${data?.slug}-${data?.id}`}
                  className="font-medium "
                >
                  {data?.name}
                </Link>
              ) : (
                <Skeleton width="100%" height="30px" />
              )}
            </h3>
            <div className="flex items-center mt-2 gap-2">
              {data?.rating ? (
                <>
                  <div className="flex items-center gapx-3 text-yellow-400">
                    {Array(5)
                      .fill(0)
                      .map((item, index) => {
                        if (index < Math.floor(data?.rating)) {
                          return (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 md:w-4 w-3 md:h-4"
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
                  <span className="text-gray-800 text-[12px]">
                    Đã bán {data.sold}
                  </span>
                </>
              ) : (
                <Skeleton width="120px" height="10px" />
              )}
            </div>
            <div className="flex items-center gap-3 mt-2">
              {data?.price ? (
                <>
                  <span
                    className={`${
                      data.fix_price ? "text-red-500" : "text-[#2b38d1]"
                    } text-[1rem] font-bold`}
                  >
                    {formatPriceVND(data.price)}
                  </span>
                  {data?.fix_price && (
                    <span className="text-gray-400 line-through text-[12px] font-semibold ">
                      {formatPriceVND(data.fix_price)}
                    </span>
                  )}
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
                  style={{
                    width: data?.quantity
                      ? `${(data?.sold / data?.quantity) * 100}%`
                      : "0%",
                  }}
                  className="bg-red-500 absolute top-0 left-0 bottom-0 w-10 rounded-xl"
                ></span>
              </div>
              <p className="text-gray-500 mt-3">
                Đã bán:{" "}
                <span className="text-black font-bold">
                  {data?.sold}/{data?.quantity}{" "}
                </span>{" "}
                sản phẩm
              </p>
            </div>
            <div className={`${deals ? "hidden" : "block"} mt-5 h-2`}>
              <div className="flex items-center justify-between text-[#1c8e24] ">
                {" "}
                <div className="flex items-center text-[10px] justify-between text-[#1c8e24]  ">
                  <AiOutlineCheck className="me-2" /> Còn{" "}
                  <span className="text-black ms-2">
                    {" "}
                    {data?.quantity} Sản phẩm
                  </span>
                </div>
                <span className="text-black text-[10px]">{data?.province}</span>
              </div>
            </div>
            <button
              onClick={handleClickToCart}
              type="button"
              disabled={isDisabled}
              className="bg-[#2b38d1] capitalize absolute mt-5 text-white py-2  left-2 right-2 lg:py-2 lg:px-8 rounded-full transition-all flex items-center justify-center gap-2"
            >
              {}
              {isDisabled ? (
                <div className="w-5 h-5 border-4 border-white rounded-full animate-spin border-t-transparent"></div>
              ) : data.type === "single" ? (
                "Thêm giỏ hàng"
              ) : (
                "Chọn biến thể"
              )}
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
