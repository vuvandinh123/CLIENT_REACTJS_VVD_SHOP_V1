import imageHeart from "../../../public/heart.svg";
import imageCart from "../../../public/cart.svg";
import { useRef } from "react";
import { HiOutlineTag } from "react-icons/hi";
import Cart from "../baskets/Cart";
import { useOffcanvas } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "./topbar";
import Search from "./search/Search";
import User from "./user";
import Navigate from "./navigate";
import { Link } from "react-router-dom";
import { setIsOpenCart } from "../../redux/slice/cartSlice";
import { setIsOpenFav } from "../../redux/slice/favouriteSlice";
import logo from "../../../public/logo.svg";
import Favourite from "../baskets/Favourite";
import { formatPriceVND } from "../../utils";
const Header = () => {
  const barsRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { total, qty, isOpen: isOpenCart } = useSelector((state) => state.cart);
  const { qty: qtyFav, isOpen: isOpenFav } = useSelector(
    (state) => state.favourite
  );
  const { isOpen: isOpenMenu, setIsOpen: setIsOpenMenu } = useOffcanvas(
    false,
    menuRef,
    barsRef
  );
  const handleClickShowMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const handleClickShowCart = () => {
    dispatch(setIsOpenCart(!isOpenCart));
  };
  const handleClickShowFav = () => {
    dispatch(setIsOpenFav(!isOpenFav));
  };
  return (
    <>
      <header className="">
        <Topbar />
        <hr />
        <div className="flex max-w-[1410px] px-5 py-5 mx-auto justify-between items-center">
          <div
            ref={barsRef}
            onClick={handleClickShowMenu}
            className="lg:hidden"
          >
            <i className="fa-solid fa-bars text-[25px]"></i>
          </div>
          <div className="w-[200px] shrink-0 gap-1">
            <Link to={"/"}>
              <img className="w-full h-full " src={logo} alt="" />
            </Link>
          </div>
          <Search />
          <div className="flex">
            <User />
            <div
              onClick={handleClickShowFav}
              className="hidden lg:block lg:mr-7 shrink-0 "
            >
              <a href="#" className="relative z-0 top-[6px]  ">
                <img src={imageHeart} alt="" />
                {qtyFav > 0 && (
                  <span className="block -top-2 -right-3 w-5 leading-5 text-center text-white text-[10px] absolute h-5 rounded-full font-bold bg-red-600">
                    {qtyFav}
                  </span>
                )}
              </a>
            </div>
            <div onClick={handleClickShowCart} className="text-center lg:mr-10">
              <a href="#" className="flex items-center ">
                <div className="relative shrink-0 z-0 ">
                  <img src={imageCart} alt="" />
                  {qty > 0 && (
                    <span className="block -top-2 -right-3 w-5 leading-5 text-center text-white text-[10px] absolute h-5 rounded-full font-bold bg-red-600">
                      {qty}
                    </span>
                  )}
                </div>
                <div className="hidden lg:block">
                  <p className="text-[#3c3d3e] w-[100px] tracking-widest font-semibold text-[11px]">
                    Giỏ hàng <HiOutlineTag className="inline" />
                  </p>
                  {
                    <span className="text-[#212529] font-bold text-[14px]">
                      {formatPriceVND(total)}
                    </span>
                  }
                </div>
              </a>
            </div>
          </div>
        </div>
        <hr />
        <Navigate
          menuRef={menuRef}
          setIsOpenMenu={setIsOpenMenu}
          isOpenMenu={isOpenMenu}
        />
        <hr />
        <Cart isOpen={isOpenCart} setIsOpen={handleClickShowCart} />
        <Favourite isOpen={isOpenFav} setIsOpen={handleClickShowFav} />
      </header>
    </>
  );
};

export default Header;
