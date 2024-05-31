import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "../../hooks";
import { FiMinus, FiPlus } from "react-icons/fi";
import { ChangePrice } from "../../components/common";
import { useEffect, useState } from "react";
import { getCookieAuth } from "../../utils";
import toast from "react-hot-toast";
import { route } from "../../constants";
import { addToDiscount } from "../../service/Discount";
import { AiFillCloseCircle } from "react-icons/ai";

const CardOrder = () => {
  const { cartAr } = useSelector((state) => state.cart);
  const [code, setCode] = useState("");
  const [total, setTotal] = useState(0);
  const [voucher, setVoucher] = useState([]);
  const navigate = useNavigate();
  const { deleteCart, handleQuantityClickPlus, handleQuantityClickMinus } =
    useCart();
  useEffect(() => {
    if (cartAr.length > 0) {
      const amount = cartAr.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
      setTotal(amount);
    }
  }, [cartAr, voucher]);
  console.log(cartAr);
  const handleAddVoucher = async ({ productId, shopId, price }) => {
    const { userId } = getCookieAuth();
    if (!userId) {
      toast.error("Vui lòng đăng nhập để sử dụng chương trình khuyến mãi");
      navigate(route.LOGIN);
      return;
    }
    const newData = {
      code: code,
      product_id: productId,
      price: price,
      shop_id: shopId,
    };
    console.log(newData);
    const isVoucher = voucher.find((item) => item.product_id === productId);
    if (isVoucher) {
      toast.error("Voucher đã tồn tại");
      return;
    }
    try {
      const res = await addToDiscount(newData);
      if (res?.status === 200) {
        toast.success("Thêm voucher thành công");
        setVoucher([
          ...voucher,
          {
            code: code,
            product_id: productId,
            type_price: res.data.type_price,
            amount: res.data.amount,
            value: res.data.value,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }

  };
  return (
    <>
      {cartAr.length > 0 &&
        cartAr.map((item) => {
          let variant = [];
          let amount = 0;
          for (let key in item.variant?.variantSelect) {
            variant.push({
              name: key,
              value: item.variant.variantSelect[key],
            });
          }
          const isVoucher = voucher.find((i) => i.product_id === item.id);
          if (isVoucher) {
            if (isVoucher.type_price === "percent") {
              amount = item.total - (item.total * isVoucher.value) / 100;
            } else {
              amount = item.total - isVoucher.value;
            }
          }
          return (
            <div key={item.id}>
              <div className="py-5 border-b border-t flex   justify-between items-center">
                <div className=" basis-4/5 md:basis-2/5 w-full flex gap-x-3">
                  <div className="w-[100px] flex-shrink-0 overflow-hidden">
                    <Link to={`/products/${item.slug}`}>
                      <img
                        className="w-full  hover:scale-110 transition-all duration-200"
                        src={item.image}
                        alt=""
                      />
                    </Link>
                    <ChangePrice
                      className="font-bold md:hidden md:block text-[14px] tracking-wider text-red-500 mt-3 "
                      price={item.price}
                    />
                  </div>
                  <div>
                    <h5 className="text-base mt-3">
                      <Link
                        to={`/products/${item.slug}-${item.id}`}
                        className="hover:text-blue-500 text_ecl-2"
                      >
                        {item.name}{" "}
                        {variant.length > 0 &&
                          variant.map((item, index) => {
                            return (
                              <span key={index} className="">
                                {item.value + " "}
                              </span>
                            );
                          })}
                      </Link>{" "}
                    </h5>
                    <div className="flex gap-2 items-center mt-2">
                      {variant.length > 0 &&
                        variant.map((item, index) => {
                          return (
                            <p
                              key={index}
                              className="text-sm capitalize text-gray-400"
                            >
                              {item.name}: {item.value}
                            </p>
                          );
                        })}
                    </div>
                    {isVoucher && (
                      <div className="text-red-500 flex items-center text-sm mt-2 gap-2">
                        Down {}
                        {isVoucher?.type_price === "percent" ? (
                          isVoucher.value + "%"
                        ) : (
                          <>
                            <ChangePrice
                              className="font-bold hidden md:block text-[14px] tracking-wider text-red-500 "
                              price={isVoucher.value}
                            />
                          </>
                        )}
                      </div>
                    )}
                    <ChangePrice
                      className="font-bold hidden md:block text-[14px] tracking-wider text-red-500 mt-3 "
                      price={item.price}
                    />
                    <div className="md:hidden  w-24 flex flex-col gap-3">
                      <div className="justify-center my-1  border font-bold flex items-center">
                        <button
                          onClick={() =>
                            handleQuantityClickMinus(
                              item.id,
                              item.qty,
                              item.variant?.code
                            )
                          }
                          className="px-2 group py-1  "
                        >
                          <FiMinus />
                        </button>
                        <input
                          value={item.qty}
                          className="outline-none  py-1 w-10   text-center"
                          type="text"
                        />
                        <button
                          onClick={() => {
                            handleQuantityClickPlus(
                              item.id,
                              item.qty,
                              item.variant?.code
                            );
                          }}
                          className=" px-2 py-1  group"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <div className=" text-left  font-bold ">
                        Total: <ChangePrice price={item.total} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:flex hidden   basis-2/6 justify-between items-center">
                  <div className="justify-center font-bold flex items-center">
                    <button
                      onClick={() =>
                        handleQuantityClickMinus(
                          item.id,
                          item.qty,
                          item.variant?.code
                        )
                      }
                      className="px-2 group py-1  "
                    >
                      <FiMinus />
                    </button>
                    <input
                      value={item.qty}
                      className="outline-none  py-1 w-14   text-center"
                      type="text"
                    />

                    <button
                      onClick={() =>
                        handleQuantityClickPlus(
                          item.id,
                          item.qty,
                          item.variant?.code
                        )
                      }
                      className=" px-2 py-1  group"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <div className="  font-bold mr-7">
                    {isVoucher ? (
                      <>
                        <del className="text-gray-400 text-sm">
                          <ChangePrice price={item.total} />
                        </del>
                        <ChangePrice price={amount} />
                      </>
                    ) : (
                      <ChangePrice price={item.total} />
                    )}
                  </div>
                </div>
                <div className="mr-5 group relative hidden md:block">
                  {isVoucher ? (
                    <div className=" border border-dashed flex  gap-1 items-center text-center bg-no-repeat bg-contain bg-[url('https://img.tenten.vn/t/new-2023/ldp-ten-mien-moi-12102023/images/bgr-code.png')]">
                      <span className="ms-4">{isVoucher?.code}</span>
                      <span
                        onClick={() => {
                          setVoucher(() =>
                            voucher.filter(
                              (item3) =>
                                item3.product_id !== isVoucher.product_id
                            )
                          );
                        }}
                        className="cursor-pointer hover:text-red-600 text-red-400"
                      >
                        <AiFillCloseCircle></AiFillCloseCircle>
                      </span>
                    </div>
                  ) : (
                    <span className="text-red-500 cursor-pointer hover:underline">
                      Add voucher shop
                    </span>
                  )}

                  <div
                    style={{ display: isVoucher ? "none" : "block" }}
                    className="absolute mt-3 invisible opacity-0 transition-all duration-200 translate-y-10 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 top-full right-0 bg-white border rounded-lg shadow-lg p-3 before:content-[''] before:absolute before:w-0 before:h-0 before:border-8 before:border-transparent before:border-b-blue-500 before:top-0 before:right-10 before:translate-y-[-100%]"
                  >
                    <div className="flex gap-2">
                      <input
                        onChange={(e) => setCode(e.target.value)}
                        type="text"
                        placeholder="Enter code"
                        className="border uppercase border-blue-500 rounded-md outline-blue-600 px-3 py-2"
                      />
                      <button
                        onClick={() => {
                          handleAddVoucher({
                            shopId: item.shop_id,
                            productId: item.id,
                            price: item.price,
                          });
                        }}
                        className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-5 flex-shrink-0  font-bold">
                  <span
                    onClick={() => deleteCart(item.id)}
                    className="cursor-pointer hover:text-red-500 transition-all"
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CardOrder;
