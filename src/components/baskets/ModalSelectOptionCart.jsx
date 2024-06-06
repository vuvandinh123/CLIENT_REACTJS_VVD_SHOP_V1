/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import useGetProductById from "../../hooks/useGetProductById";
import Variants from "../../pages/productDetail/components/Variants";
import Skeleton from "react-loading-skeleton";
import { formatPrice } from "../../utils";
import { setIsOpenSelectOptions } from "../../redux/slice/selectCartSlice";
import toast from "react-hot-toast";
import { setIsOpenCart } from "../../redux/slice/cartSlice";
import useSelectOptionProduct from "../../hooks/useSelectOptionProduct";
import QuantityOptionProduct from "../common/QuantityOptionProduct";
import { addToCart } from "../../service/Cart";
const ModalSelectOptionCart = () => {
  const { cartId, isOpen } = useSelector((state) => state.selectCart);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { data, src, setSrc, setData, loading } = useGetProductById(cartId);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  });
  const { options, variantSelect, setVariantSelect } = useSelectOptionProduct({
    data,
    setData,
  });
  const fnToCart = async (data) => {
    const res = await addToCart(data);
    if (res.status === 200) {
      dispatch(setIsOpenSelectOptions({ isOpen: false }));
    }
  };
  const handleClickToCart = async () => {
    if (!options.variant.code) {
      toast.error("Please select variant !");
      return;
    }
    setIsSubmit(true);
    const newCart = {
      productId: data.id,
      code: options.variant.code,
      quantity: quantity,
    };
    setTimeout(() => {
      setIsSubmit(false);
      fnToCart(newCart);
      if (window.screen.width > 768) {
        dispatch(setIsOpenCart(true));
      } else {
        toast.success("Thêm vào giỏ hàng thành công");
      }
    }, 1000);
  };
  const handleClickImage = (e) => {
    const src = e.target.src;
    setSrc(src);
  };
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div
        onClick={() => dispatch(setIsOpenSelectOptions({ isOpen: false }))}
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity z-30"
      ></div>
      <div className="fixed flex flex-col justify-between w-[700px] min-h-[550px] p-5 bg-white z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <div>
          <div className="flex justify-between items-center border-b pb-5">
            <h3 className="uppercase font-bold text-lg">Options for you</h3>
            <span
              className="cursor-pointer"
              onClick={() =>
                dispatch(setIsOpenSelectOptions({ isOpen: false }))
              }
            >
              <IoClose size={30}></IoClose>
            </span>
          </div>
          <div className="grid grid-cols-2 mt-5">
            <div className="col-span-1 gap-3">
              <div className="p-3">
                <div>
                  {loading ? (
                    <Skeleton width={"300px"} height={"200px"}></Skeleton>
                  ) : (
                    <img src={src} alt="" />
                  )}
                </div>
                <ul className="flex flex-row overflow-auto justify-center mt-3 gap-2">
                  {loading
                    ? Array(3)
                        .fill(0)
                        .map((item, index) => (
                          <Skeleton
                            key={index}
                            width={"70px"}
                            height={"70px"}
                          />
                        ))
                    : null}
                  {!loading && data.imageUrls
                    ? data.imageUrls?.map((item) => (
                        <li
                          key={item.id}
                          className={`border shrink-0 w-[70px] h-[70px]  rounded-md p-[1px] overflow-hidden border-gray-200 cursor-pointer ${
                            item === src ? "!border-blue-500" : ""
                          }`}
                        >
                          <img
                            onClick={handleClickImage}
                            className="w-[70px] h-[70px] object-contain"
                            src={item}
                            alt=""
                          />
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
            <div className="col-span-1 border-l px-5">
              <p className="font-bold text-lg text_ecl-2">
                {loading ? (
                  <Skeleton width={"300px"} height={"20px"}></Skeleton>
                ) : (
                  data.name
                )}
              </p>
              <p className="text-red-500 mt-3 font-bold text-md">
                {loading ? (
                  <Skeleton width={"80px"} height={"20px"}></Skeleton>
                ) : (
                  data.price && formatPrice(data?.price)
                )}
              </p>
              {loading ? (
                <>
                  <Skeleton width={"300px"} height={"50px"}></Skeleton>
                  <Skeleton width={"300px"} height={"50px"}></Skeleton>
                </>
              ) : data.variant?.productVariants?.length > 0 ? (
                <Variants
                  value={variantSelect}
                  setValue={setVariantSelect}
                  data={data.variant}
                ></Variants>
              ) : (
                <p className="text-gray-400">No variant</p>
              )}
              {loading ? (
                <Skeleton
                  className="mt-10"
                  width={"300px"}
                  height={"50px"}
                ></Skeleton>
              ) : (
                <QuantityOptionProduct
                  setQuantity={setQuantity}
                  quantity={quantity}
                  qty={data.quantity}
                ></QuantityOptionProduct>
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <Skeleton className="" width={"100%"} height={"50px"}></Skeleton>
        ) : (
          <button
            onClick={handleClickToCart}
            disabled={isSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 flex gap-2 item-center justify-center px-3 py-3 relative rounded-lg text-white uppercase font-bold text-md"
          >
            {isSubmit ? (
              <span className="flex gap-2">
                Adding...{" "}
                <div className="w-5 h-5 border-4 border-gray-200 rounded-full animate-spin border-t-transparent"></div>{" "}
              </span>
            ) : (
              "Add to cart"
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default ModalSelectOptionCart;
