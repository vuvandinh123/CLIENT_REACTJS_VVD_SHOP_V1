/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Order from "./Order";
import CardOrder from "./CardOrder";
import { useCart, useScrollTop } from "../../hooks";
import { Loader } from "../../components/common";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/common/Breadcrumb";
import { getCookieAuth } from "../../utils";
import toast from "react-hot-toast";
const CartPage = () => {
  useScrollTop();
  const { isOpen } = useSelector((state) => state.cart);
  const [productIds, setProductIds] = useState({});
  const [productDiscount, setProductDiscount] = useState({});
  const [total, setTotal] = useState(0);
  const [checkout, setCheckout] = useState([]);
  const {
    handleClickDeleteCartItem,
    hanldeClickPlus,
    hanldeClickMinus,
    loading,
    setRefresh,
    refresh,
    data,
  } = useCart(isOpen);
  useEffect(() => {
    setProductDiscount({});
  }, [productIds]);
  // calculate total amount
  useEffect(() => {
    const calculateTotalAmount = (item) =>
      item.products.reduce((total, product) => {
        const isProductSelected = productIds[item.id]?.some(
          (selectedProduct) =>
            selectedProduct.id === product.id &&
            selectedProduct.code === product.code
        );
        if (isProductSelected) {
          return total + Number(product.amount);
        }
        return total;
      }, 0);

    const findSelectedProducts = (item) =>
      item.products.filter((product) =>
        productIds[item.id]?.some(
          (selectedProduct) =>
            selectedProduct.id === product.id &&
            selectedProduct.code === product.code
        )
      );

    const orders = data?.map((item) => ({
      order: {
        shopId: item.id,
        amount: calculateTotalAmount(item),
        discount: productDiscount[item.id] ?? null,
        products: findSelectedProducts(item),
      },
    }));

    setCheckout(orders);
  }, [productIds, data, productDiscount]);

  const navigate = useNavigate();

  // handle checkout
  const handleClickCheckout = (e) => {
    e.preventDefault();
    const qty = checkout.reduce(
      (acc, item) => acc + item.order.products.length,
      0
    );
    if (qty == 0) {
      toast.error("Vui lòng chọn ít nhất 1 sản phẩm");
      return;
    }
    const { userId } = getCookieAuth();
    if (!userId) {
      toast.error("Vui lòng đăng nhận");
      navigate("/auth/login");
      return;
    }
    sessionStorage.setItem("checkout", JSON.stringify(checkout));
    navigate("/checkout");
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
        <div className="flex  flex-col-reverse md:flex-row gap-10">
          <div className="basis-3/4">
            <div className="py-5 border bg-blue-50 px-3 rounded-md grid grid-cols-12 items-center">
              <div className="uppercase col-span-7 font-bold">Sản phẩm</div>
              <div className="uppercase hidden col-span-2 md:block  basis-1/5 font-bold text-center">
                Số lượng
              </div>
              <div className="uppercase hidden col-span-2 md:block basis-1/5 font-bold text-center">
                Số tiền
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
                Tiếp tục mua sắm
              </Link>
              <button
                // onClick={deleteCartAll}
                className="px-10 w-full md:w-max mt-2 py-3 bg-blue-500 text-white uppercase rounded-full"
              >
                Xóa giỏ hàng
              </button>
            </div>
            <div className="mt-20">
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="uppercase font-bold text-base">
                  THÊM GHI CHÚ ĐƠN HÀNG
                </label>
                <textarea
                  placeholder="Bạn cần chúng tôi giúp gì ?"
                  name=""
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
              checkout={checkout}
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
