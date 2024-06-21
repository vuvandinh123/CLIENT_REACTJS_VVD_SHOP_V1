import LayoutUser from "./components/LayoutUser";
import TabOrder from "./components/TabOrder";
import CardOrder from "./components/CardOrder";
import { useApiCall, useScrollTop } from "../../hooks";
import { getOrderByUser } from "../../service/Order";
import { useState } from "react";
import nodata from "../../assets/nodata.png";
import { Loader } from "../../components/common";
import { useNavigate } from "react-router-dom";
const OrderDetail = () => {
  useScrollTop();
  const [type, setType] = useState("ALL");
  const { data, loading } = useApiCall(async () => {
    const res = await getOrderByUser({ type });
    return res.data;
  }, [type]);
  const navigate = useNavigate();
  const handleClickOrder = async (index) => {
    const item = data[index];
    const product = item.products.map((item) => {
      return {
        ...item,
        id: item.product_id,
        name: item.product_name,
        price: item.product_price,
        amount: Number(item.product_price) * item.quantity,
      };
    });
    const checkout = [
      {
        order: {
          amount: item.products.reduce((total, product) => {
            return total + Number(product.product_price) * product.quantity;
          }, 0),
          discount: null,
          products: product,
          shopId: item.id,
        },
      },
    ];
    sessionStorage.setItem("checkout", JSON.stringify(checkout));
    navigate("/checkout");
  };
  return (
    <LayoutUser>
      {loading && <Loader></Loader>}
      <div className="bg-white pt-5 px-5 rounded-lg">
        <TabOrder type={type} setType={setType}></TabOrder>
      </div>
      <div className="mt-2 ">
        {data?.map((item, index) => (
          <CardOrder
            index={index}
            handleClickOrder={handleClickOrder}
            key={index}
            data={item}
          ></CardOrder>
        ))}
        {data?.length === 0 && (
          <div className="flex min-h-[350px] rounded-md bg-white justify-center items-center">
            <div className="flex items-center flex-col">
              <img className="w-[200px]" src={nodata} alt="" />
              <p className="text-center text-gray-500 mt-5 uppercase">
                Không tìm thấy đơn hàng nào
              </p>
            </div>
          </div>
        )}
      </div>
    </LayoutUser>
  );
};

export default OrderDetail;
