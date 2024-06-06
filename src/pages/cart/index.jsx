/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Order from "./Order";
import CardOrder from "./CardOrder";
import { useCart, useScrollTop } from "../../hooks";
import { toast } from "react-toastify";
import { Loader } from "../../components/common";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/common/Breadcrumb";
const CartPage = () => {
  useScrollTop();
  const { isOpen } = useSelector((state) => state.cart);
  const [productIds, setProductIds] = useState([]);
  const [productDiscount, setProductDiscount] = useState({});
  const [total, setTotal] = useState(0);
  const {
    handleClickDeleteCartItem,
    hanldeClickPlus,
    hanldeClickMinus,
    loading,
    setRefresh,
    refresh,
    setData,
    data,
  } = useCart(isOpen);
  useEffect(() => {
    const total = data?.reduce(
      (acc, item) =>
        acc +
        item.products?.reduce((acc, item) => {
          if (productIds.includes(item.id)) {
            return acc + Number(item.amount);
          }
          return acc;
        }, 0),
      0
    );
    setTotal(total ?? 0);
  }, [productIds, loading, data]);
  const [checkout, setCheckout] = useState({
    coupon: 0,
    shipping: 1,
    note: "",
    total: 0,
  });
  const navigate = useNavigate();

  const handleClickCheckout = (e) => {
    e.preventDefault();

    // dispatch(
    //   setOrder({
    //     ...checkout,
    //     coupon: dataCoupon ? dataCoupon.id : 0,
    //     shipping: priceShipping,
    //     total: totalCart2,
    //   })
    // );
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (!token) {
      sessionStorage.setItem("url", "/checkout");
      toast.warning("Bạn cần đăng nhập để tiếp tục");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div className="">
      {loading && <Loader></Loader>}
      <div className=" h-36 text-black flex justify-center items-center flex-col gap-y-3">
        <h2 className="text-4xl font-semibold capitalize">Giỏ hàng</h2>
        <div>
          <Breadcrumb data={[{ name: "Giỏ hàng" }]}></Breadcrumb>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-10">
          <div className="basis-3/4">
            <div className="py-5 border bg-blue-50 px-3 rounded-md grid grid-cols-12 items-center">
              <div className="uppercase col-span-5 font-bold">Sản phẩm</div>
              <div className="uppercase hidden col-span-2 md:block  basis-1/5 font-bold text-center">
                Số lượng
              </div>
              <div className="uppercase hidden col-span-2 md:block basis-1/5 font-bold text-center">
                Số tiền
              </div>
              <div className="uppercase hidden md:block col-span-2 basis-1/5 font-bold ">
                VONCHER
              </div>
              <div className="uppercase col-span-1 hidden md:block  font-bold"></div>
            </div>
            <CardOrder
              setTotal={setTotal}
              productDiscount={productDiscount}
              setProductDiscount={setProductDiscount}
              productIds={productIds}
              setProductIds={setProductIds}
              setRefresh={setRefresh}
              setData={setData}
              data={data}
              refresh={refresh}
              handleClickDeleteCartItem={handleClickDeleteCartItem}
              hanldeClickPlus={hanldeClickPlus}
              hanldeClickMinus={hanldeClickMinus}
            />
            <div className="py-5 border-b border-t flex flex-col md:flex-row justify-between items-center">
              <Link
                to={"/categories/all"}
                className="px-10 block w-full md:w-max text-center py-3 bg-blue-500 text-white uppercase rounded-full"
              >
                Continue shopping
              </Link>
              <button
                // onClick={deleteCartAll}
                className="px-10 w-full md:w-max mt-2 py-3 bg-blue-500 text-white uppercase rounded-full"
              >
                DELETE ALL
              </button>
            </div>
            <div className="mt-20">
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="uppercase font-bold text-base">
                  ADD ORDER NOTE
                </label>
                <textarea
                  placeholder="How can we help you ?"
                  name=""
                  onChange={(e) =>
                    setCheckout({ ...checkout, note: e.target.value })
                  }
                  className="rounded-lg outline-none border p-5 focus:border-blue-500"
                  id=""
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="basis-1/4 rounded-xl border-2 border-blue-500 p-2">
            <Order
              totalPrice={total}
              productDiscount={productDiscount}
              amount={2003}
              handleClickCheckout={handleClickCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
