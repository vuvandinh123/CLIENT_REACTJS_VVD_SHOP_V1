import { AiOutlineCheck } from "react-icons/ai";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ChangePrice from "../common/ChangePrice";
import { setIsOpenCart } from "../../redux/slice/cartSlice";
import { AppURL } from "../../api/AppURL";
import { toast } from "react-toastify";
import { addToCart } from "../../service/Cart";
import { setIsOpenSelectOptions } from "../../redux/slice/selectCartSlice";
import { formatPriceVND, getCookieAuth } from "../../utils";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const Product2 = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClickToCart = async () => {
    const { userId } = getCookieAuth();
    if (!userId) {
      toast.error("Vui lòng đăng nhập để tiếp tục");
      navigate("/auth/login");
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
    <div className="flex bg-white justify-between p-5">
      <div className="flex gap-5">
        <div className="group flex-shrink-0 w-[200px] h-[160px] overflow-hidden">
          <Link to={`/products/${data.slug}-${data.id}`}>
            <img
              className="w-full h-full  group-hover:scale-105 transition-all duration-400"
              src={data.thumbnail}
              alt=""
            />
          </Link>
        </div>
        <div className="mt-5">
          <h3 className="text-[#212529] font-semibold mb-2 md:text-lg">
            <Link to={`/products/${data.slug}-${data.id}`} className="block">
              {data.name}
            </Link>
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gapx-3 text-yellow-500">
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
                  <span className="text-gray-800 ms-2 text-[12px]">
                    Đã bán {data.sold}
                  </span>
                </>
              ) : (
                <Skeleton width="120px" height="10px" />
              )}
            </div>
          </div>
          <ul className="mt-2 text-blue-500">
            <li>{data?.province}</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 shrink-0">
        <p className="flex items-center gap-3 text-green-500">
          <AiOutlineCheck /> Còn hàng
        </p>
        <p className="font-bold text-xl text-blue-600 mt-3">
          {formatPriceVND(data?.price)}
        </p>
        <button
          onClick={handleClickToCart}
          disabled={isDisabled}
          className="rounded-full shrink-0 px-20 py-3 mt-5 text-white bg-blue-500"
        >
          
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
  );
};
Product2.propTypes = {
  deals: PropTypes.bool,
  data: PropTypes.object,
};
export default Product2;
