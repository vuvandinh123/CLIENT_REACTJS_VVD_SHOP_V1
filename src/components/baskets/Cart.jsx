import shiping from "../../../public/shiping.svg";
import { Offcanvas } from "../common";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useCart } from "../../hooks";
import cartempty from "../../../public/svg/cartempty.svg";
import CartItem from "./CartItem";
const Cart = ({ isOpen, setIsOpen }) => {
  const {
    handleClickDeleteCartItem,
    hanldeClickPlus,
    hanldeClickMinus,
    totalPrice,
    data,
  } = useCart(isOpen);

  const couponRef = useRef(null);
  const iconCouponRef = useRef(null);
  const [isOpenCoupon, setIsOpenCoupon] = useState(false);

  return (
    <>
      <div>
        <Offcanvas isOpen={isOpen} setIsOpen={setIsOpen} label="Giỏ hàng">
          <div className={data.length > 0 ? "" : "hidden"}>
            <div className="overflow-y-scroll max-h-[260px]">
              {data?.length > 0 &&
                data?.map((item) => {
                  return item?.products.map((item2, index2) => {
                    return (
                      <CartItem
                        key={index2}
                        handleClickDeleteCartItem={handleClickDeleteCartItem}
                        hanldeClickPlus={hanldeClickPlus}
                        hanldeClickMinus={hanldeClickMinus}
                        data={item2}
                      ></CartItem>
                    );
                  });
                })}
            </div>
            <div className="py-5 mt-3 px-5  border-b">
              <div className=" relative">
                <div
                  style={{
                    width:
                      (totalPrice / 5000) * 100 >= 100
                        ? "100%"
                        : (totalPrice / 5000) * 100 + "%",
                  }}
                  className={`ship h-[6px]  rounded-md bg-red-500`}
                ></div>
                <span className="absolute right-0 -top-[10px] flex items-center justify-center z-20  w-7 h-7 bg-red-500 rounded-full ">
                  <img src={shiping} alt="" />
                </span>
              </div>
              <p className="mt-5">
                {/* {5000 - totalPrice <= 0 ? (
                  <>Congratulations! You've got </>
                ) : (
                  <>Spend ${(5000 - totalPrice).toFixed(2)} more and get</>
                )} */}
                <span className="text-red-600"> Free Shipping!</span>{" "}
              </p>
            </div>
            <div>
              <ul className="flex justify-between ">
                <li className="border-e border-b group w-1/4 py-5 flex justify-center">
                  <svg
                    className="group-hover:text-[#2b38d1]"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8642 1.18519V0.691358C10.8642 0.296296 10.5679 0 10.1728 0C9.77778 0 9.48148 0.395062 9.48148 0.691358V1.08642H5.03704V0.691358C5.03704 0.395062 4.74074 0 4.34568 0C3.95062 0 3.65432 0.395062 3.65432 0.691358V1.18519C1.28395 1.38272 0 2.96296 0 5.4321V11.6543C0 14.4198 1.58025 16 4.34568 16H10.1728C12.9383 16 14.5185 14.4198 14.5185 11.6543V5.4321C14.5185 2.96296 13.2346 1.38272 10.8642 1.18519ZM4.34568 3.55556C4.64198 3.55556 5.03704 3.25926 5.03704 2.8642V2.46914H9.48148V2.8642C9.48148 3.25926 9.87654 3.55556 10.1728 3.55556C10.4691 3.55556 10.8642 3.25926 10.8642 2.8642V2.46914C12.4444 2.66667 13.1358 3.65432 13.1358 5.4321V11.6543C13.1358 13.7284 12.1481 14.6173 10.1728 14.6173H4.34568C2.27161 14.6173 1.38272 13.6296 1.38272 11.6543V5.33333C1.38272 3.55556 2.07407 2.5679 3.65432 2.37037V2.76543C3.65432 3.25926 3.95062 3.55556 4.34568 3.55556Z"
                      fill="#212529"
                    ></path>
                    <path
                      d="M4.34565 8.00021H10.1728C10.4691 8.00021 10.8642 7.70391 10.8642 7.30885C10.8642 6.91379 10.4691 6.61749 10.1728 6.61749H4.34565C3.95059 6.61749 3.6543 6.91379 3.6543 7.30885C3.6543 7.70391 4.04936 8.00021 4.34565 8.00021Z"
                      fill="#212529"
                    ></path>
                    <path
                      d="M7.30862 10.2715H4.34565C3.95059 10.2715 3.6543 10.5678 3.6543 10.9628C3.6543 11.3579 4.04936 11.6542 4.34565 11.6542H7.30862C7.60491 11.6542 7.99998 11.3579 7.99998 10.9628C7.99998 10.5678 7.60491 10.2715 7.30862 10.2715Z"
                      fill="#212529"
                    ></path>
                  </svg>
                </li>
                <li className="border-e border-b g w-1/4 py-5 flex justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.14355 10.375C9.14355 10.0298 8.86374 9.75 8.51855 9.75C8.17337 9.75 7.89355 10.0298 7.89355 10.375V12.875C7.89355 13.2202 8.17337 13.5 8.51855 13.5C8.86374 13.5 9.14355 13.2202 9.14355 12.875V10.375Z"
                      fill="#111111"
                    ></path>
                    <path
                      d="M2.26855 9.75C1.92337 9.75 1.64355 10.0298 1.64355 10.375V12.875C1.64355 14.5981 3.04543 16 4.76855 16H12.2686C13.9917 16 15.3936 14.5981 15.3936 12.875V10.375C15.3936 10.0298 15.1137 9.75 14.7686 9.75C14.4234 9.75 14.1436 10.0298 14.1436 10.375V12.875C14.1436 13.9089 13.3024 14.75 12.2686 14.75H4.76855C3.73468 14.75 2.89355 13.9089 2.89355 12.875V10.375C2.89355 10.0298 2.61374 9.75 2.26855 9.75Z"
                      fill="#111111"
                    ></path>
                    <path
                      d="M2.39355 8.75H14.6436C15.6774 8.75 16.5186 7.90887 16.5186 6.875V5.625C16.5186 4.59113 15.6774 3.75 14.6436 3.75H12.5572C12.7707 3.38197 12.8936 2.95519 12.8936 2.5C12.8936 1.1215 11.7721 0 10.3936 0C9.6474 0 8.97702 0.329 8.51855 0.849031C8.06009 0.329 7.38971 0 6.64355 0C5.26505 0 4.14355 1.1215 4.14355 2.5C4.14355 2.95519 4.26643 3.38197 4.4799 3.75H2.39355C1.35968 3.75 0.518555 4.59113 0.518555 5.625V6.875C0.518555 7.90887 1.35968 8.75 2.39355 8.75ZM10.3936 1.25C11.0828 1.25 11.6436 1.81075 11.6436 2.5C11.6436 3.18925 11.0828 3.75 10.3936 3.75H9.14355V2.5C9.14355 1.81075 9.7043 1.25 10.3936 1.25ZM5.39355 2.5C5.39355 1.81075 5.9543 1.25 6.64355 1.25C7.3328 1.25 7.89355 1.81075 7.89355 2.5V3.75H6.64355C5.9543 3.75 5.39355 3.18925 5.39355 2.5ZM1.76855 5.625C1.76855 5.28038 2.04893 5 2.39355 5H7.89355V5.625C7.89355 5.97019 8.17337 6.25 8.51855 6.25C8.86374 6.25 9.14355 5.97019 9.14355 5.625V5H14.6436C14.9882 5 15.2686 5.28038 15.2686 5.625V6.875C15.2686 7.21962 14.9882 7.5 14.6436 7.5H2.39355C2.04893 7.5 1.76855 7.21962 1.76855 6.875V5.625Z"
                      fill="#111111"
                    ></path>
                  </svg>
                </li>
                <li className="border-e border-b g w-1/4 py-5 flex justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.2447 2.65861L9.37764 0.435045C8.3142 -0.145015 6.76737 -0.145015 5.8006 0.435045L1.93353 2.65861C0.870091 3.23867 0 4.68882 0 5.94562V10.1027C0 11.3595 0.870091 12.713 1.93353 13.3897L5.8006 15.6133C6.28399 15.9033 6.96073 16 7.63746 16C8.3142 16 8.89426 15.9033 9.47432 15.6133L13.3414 13.3897C14.4048 12.8097 15.2749 11.3595 15.2749 10.1027V5.84894C15.1782 4.68882 14.3082 3.23867 13.2447 2.65861ZM6.28399 1.49849C6.57402 1.30514 7.0574 1.20846 7.54079 1.20846C8.02417 1.20846 8.41088 1.30514 8.79758 1.49849L12.6647 3.72205C12.9547 3.81873 13.148 4.10876 13.3414 4.39879L11.2145 5.65559L5.22054 2.07855L6.28399 1.49849ZM2.41692 3.62538L4.06042 2.65861L10.0544 6.13897L7.54079 7.6858L1.6435 4.30212C1.83686 4.01208 2.12689 3.81873 2.41692 3.62538ZM2.41692 12.2296C1.74018 11.8429 1.06344 10.7795 1.06344 10.006V5.84894C1.06344 5.65559 1.06344 5.46224 1.16012 5.26888L6.96073 8.65257V14.6465C6.6707 14.6465 6.47734 14.5498 6.28399 14.4532L2.41692 12.2296ZM14.0181 10.006C14.0181 10.7795 13.4381 11.8429 12.6647 12.2296L8.79758 14.3565C8.60423 14.4532 8.41088 14.5498 8.12085 14.5498V8.65257L10.6344 7.20242V8.84592C10.6344 9.13595 10.9245 9.42598 11.2145 9.42598C11.5045 9.42598 11.7946 9.13595 11.7946 8.84592V6.52568L13.9215 5.26888C13.9215 5.55891 14.0181 5.75227 14.0181 5.84894V10.006Z"
                      fill="#515D66"
                    ></path>
                  </svg>
                </li>
                <li
                  ref={iconCouponRef}
                  onClick={() => {
                    setIsOpenCoupon(true);
                  }}
                  className="border-e cursor-pointer border-b g w-1/4 py-5 flex justify-center"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 16C6.2136 15.9883 5.93327 15.9091 5.67938 15.7681C5.42549 15.6272 5.20443 15.428 5.03226 15.1852L4.33333 14.1481C4.1942 13.9584 3.99607 13.8272 3.77419 13.7778C3.66481 13.772 3.55586 13.7962 3.45791 13.8481C3.35995 13.9 3.2763 13.9778 3.21505 14.0741C2.23656 15.1852 1.46774 15.1111 1.04839 14.963C0.629032 14.8148 0 14.2963 0 12.6667V4.2963C0 1.03704 0.908602 0 3.84409 0H9.15591C10.6935 0 11.5323 0.222222 12.1613 0.888889C12.7903 1.55556 13 2.51852 13 4.2963V12.6667C13 14.2963 12.371 14.8148 11.9516 14.963C11.5323 15.1111 10.8333 15.1852 9.78495 14.0741C9.7237 13.9778 9.64005 13.9 9.54209 13.8481C9.44414 13.7962 9.33519 13.772 9.22581 13.7778C9.11105 13.786 8.99997 13.8241 8.90244 13.8887C8.8049 13.9533 8.72392 14.0424 8.66667 14.1481L7.96774 15.1111C7.8098 15.3747 7.59356 15.5934 7.33779 15.7483C7.08201 15.9032 6.79443 15.9896 6.5 16ZM3.77419 12.6667H3.84409C4.11063 12.6807 4.37017 12.762 4.60113 12.9037C4.83209 13.0454 5.02781 13.2435 5.17204 13.4815L5.87097 14.5185C5.93365 14.6257 6.02112 14.7142 6.12508 14.7755C6.22904 14.8369 6.34606 14.869 6.46505 14.869C6.58404 14.869 6.70106 14.8369 6.80503 14.7755C6.90899 14.7142 6.99646 14.6257 7.05914 14.5185L7.75806 13.5556C8.09253 13.1219 8.56462 12.8322 9.08602 12.7407C9.35035 12.7402 9.61175 12.7993 9.85279 12.9143C10.0938 13.0292 10.309 13.1974 10.4839 13.4074C11.043 14 11.3925 14.0741 11.4624 14C11.5323 13.9259 11.8118 13.4815 11.8118 12.7407V4.2963C11.8118 2.88889 11.672 2.07407 11.2527 1.62963C10.8333 1.18519 10.2043 1.11111 9.01613 1.11111H3.84409C1.53763 1.11111 1.04839 1.62963 1.04839 4.2963V12.6667C1.04839 13.4074 1.25806 13.8519 1.39785 13.9259C1.53763 14 1.8871 13.9259 2.37634 13.3333C2.55577 13.1292 2.77183 12.9651 3.01186 12.8507C3.25189 12.7362 3.51106 12.6736 3.77419 12.6667Z"
                      fill="#515D66"
                    ></path>
                    <path
                      d="M4.40357 9.33342C4.27392 9.33089 4.14963 9.2782 4.05411 9.18527C3.95253 9.07701 3.89551 8.93054 3.89551 8.77786C3.89551 8.62518 3.95253 8.47871 4.05411 8.37045L8.24765 3.92601C8.29659 3.86574 8.35674 3.81682 8.42433 3.78232C8.49193 3.74782 8.56552 3.72848 8.64049 3.7255C8.71546 3.72253 8.79021 3.73599 8.86005 3.76504C8.92989 3.79409 8.99332 3.8381 9.04637 3.89432C9.09942 3.95055 9.14095 4.01777 9.16836 4.09179C9.19577 4.16581 9.20847 4.24503 9.20566 4.32449C9.20285 4.40395 9.1846 4.48193 9.15205 4.55357C9.1195 4.62521 9.07334 4.68896 9.01647 4.74082L4.82292 9.18527C4.69542 9.26743 4.55208 9.31807 4.40357 9.33342Z"
                      fill="#515D66"
                    ></path>
                    <path
                      d="M8.59736 9.48148C8.412 9.48148 8.23422 9.40344 8.10315 9.26452C7.97207 9.12561 7.89844 8.9372 7.89844 8.74074C7.89844 8.54428 7.97207 8.35587 8.10315 8.21696C8.23422 8.07804 8.412 8 8.59736 8C8.78273 8 8.9605 8.07804 9.09158 8.21696C9.22265 8.35587 9.29629 8.54428 9.29629 8.74074C9.29629 8.9372 9.22265 9.12561 9.09158 9.26452C8.9605 9.40344 8.78273 9.48148 8.59736 9.48148Z"
                      fill="#515D66"
                    ></path>
                    <path
                      d="M4.40348 5.40732C4.3101 5.41386 4.21648 5.39919 4.12888 5.36428C4.04128 5.32937 3.96173 5.27503 3.89555 5.20489C3.82938 5.13476 3.7781 5.05045 3.74516 4.95761C3.71222 4.86477 3.69838 4.76555 3.70456 4.66658C3.69838 4.56761 3.71222 4.46838 3.74516 4.37554C3.7781 4.2827 3.82938 4.19839 3.89555 4.12826C3.96173 4.05812 4.04128 4.00378 4.12888 3.96887C4.21648 3.93396 4.3101 3.91929 4.40348 3.92584C4.49687 3.91929 4.59049 3.93396 4.67809 3.96887C4.76569 4.00378 4.84524 4.05812 4.91141 4.12826C4.97759 4.19839 5.02886 4.2827 5.0618 4.37554C5.09474 4.46838 5.10859 4.56761 5.10241 4.66658C5.10859 4.76555 5.09474 4.86477 5.0618 4.95761C5.02886 5.05045 4.97759 5.13476 4.91141 5.20489C4.84524 5.27503 4.76569 5.32937 4.67809 5.36428C4.59049 5.39919 4.49687 5.41386 4.40348 5.40732Z"
                      fill="#515D66"
                    ></path>
                  </svg>
                </li>
              </ul>
            </div>
            <div className="bg-[#F1F5F6] p-4">
              <div className="flex items-center justify-between gap-10">
                <p className="font-bold">SUBTOTAL</p>
                <div className="my-2 text-end">
                  <p className="my-2 text-end">
                    Buy 3 products 5% discount{" "}
                    <span className="text-[#2b38d1]">(- $99.30)</span>
                  </p>
                  <p className="text-red-600 text-[18px] font-bold">
                    {/* ${totalPrice.toFixed(2)} */}
                  </p>
                </div>
              </div>
              <div className="mt-5 h-[100vh]">
                <Link
                  to={"/cart"}
                  className="w-full block text-center  hover:bg-blue-500 duration-300 hover:text-white transition-all uppercase bg-white border rounded-full py-3 font-bold mb-3"
                >
                  XEM GIỎ HÀNG
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="mt-10 flex flex-col items-center gap-3">
              <img src={cartempty} alt="" />
              <p>Giỏ hàng trống.</p>
              <div className="mt-10">
                <Link
                  to={"/"}
                  onClick={() => setIsOpen(false)}
                  className="bg-[#2b38d1] text-white py-3 uppercase transition-all hover:bg-[#00094d] px-10 font-bold rounded-full "
                >
                  Quay lại
                </Link>
              </div>
            </div>
          </div>
          <div
            onClick={() => setIsOpenCoupon(false)}
            className={`absolute top-0 left-0 right-0 bottom-0 bg-[#00000050] cursor-crosshair z-20 ${
              isOpenCoupon ? "visible opacity-100" : "invisible opacity-0"
            }`}
          ></div>
          <div
            ref={couponRef}
            className={`bg-[#F1F5F6] ${
              isOpenCoupon ? "!h-[300px] !bottom-10 opacity-100 " : ""
            } transition-all  duration-300 z-50 absolute border shadow-2xl flex flex-col gap-3 p-5 h-[0px] opacity-100 overflow-hidden -bottom-10  right-0 left-0`}
          >
            <p className="font-bold">Add a discount code:</p>
            <p className="text-gray-400 ">
              Coupon code will work on checkout page.
            </p>
            <input
              type="text"
              className="border outline-none pt-3 px-5 py-2 rounded-full"
              placeholder="Coupon code"
            />
            <button className="bg-[#2b38d1] text-white py-3 transition-all hover:bg-[#00094d] px-10 font-bold rounded-full mt-5">
              SAVE
            </button>
            <button
              onClick={() => setIsOpenCoupon(false)}
              className=" text-black py-3 transition-all px-10 rounded-full "
            >
              CANCEL
            </button>
          </div>
        </Offcanvas>
      </div>
    </>
  );
};
Cart.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
export default Cart;
