/* eslint-disable react-hooks/exhaustive-deps */
import Sidebar from "./components/Sidebar";
import Address from "./components/Address";
import DeliveryMethod from "./components/DeliveryMethod";
import { useScrollTop } from "../../hooks";
import { Steps } from "keep-react";
import { Form, Formik } from "formik";
import PaymentMethod from "./components/PaymentMethod";
import { useEffect, useState } from "react";
import { addOrderByUser, addOrderWithMomo } from "../../service/Order";
import toast from "react-hot-toast";
import CheckoutSuccess from "./CheckoutSuccess";
import { getSessionStorage, isObjectEmptyOrNull } from "../../helpers/utils";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  useScrollTop();
  const [cost, setCost] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const data = getSessionStorage("checkout");
    if (!data) {
      toast.error(
        "sản không có sản phẩm nào được chọn vui lòng quay lại giỏ hàng"
      );
      navigate("/cart");
    }
    const leng = data?.flatMap((item) => item.order.products).length;
    if (leng === 0) {
      toast.error(
        "sản không có sản phẩm nào được chọn vui lòng quay lại giỏ hàng"
      );
      navigate("/cart");
    }
  }, []);
  const handleSubmitCheckOut = async (values) => {
    const dataString = sessionStorage.getItem("checkout");
    if (isObjectEmptyOrNull(values)) {
      toast.error("Vui lòng chọn đầy đủ thông tin");
      return;
    }
    const data = JSON.parse(dataString);
    const formatData = { checkout: values, orders: data };
    if (values.payment_method === "momo") {
      const res = await addOrderWithMomo(formatData);
      if (res.status === 200) {
        const { token, secretKey } = res.data;
        window.location.href = `http://localhost:8080/v1/momo?token=${token}&secretKey=${secretKey}`;
      }
      return;
    }
    const res = await addOrderByUser(formatData);
    if (res.status === 200) {
      sessionStorage.removeItem("checkout");
      toast.success("Đặt hàng thành công");
      setIsCheckout(true);
    }
  };
  return (
    <div className="">
      <div className=" h-36 mt-10 text-black flex justify-center items-center flex-col gap-y-3">
        <h2 className="text-4xl font-semibold uppercase"></h2>
        <div>
          <Steps stepType="number">
            <Steps.Item
              numberOfSteps={1}
              completed
              title="Giỏ hàng"
              description="Chọn và quản lý giỏ hàng và sử dụng mã khuyến mại"
            />
            <Steps.Item
              numberOfSteps={2}
              active
              title="Thanh toán"
              description="Điền hoặc chọn địa chỉ nhận hàng và chọn phương thức thanh toán"
            />
            <Steps.Item
              numberOfSteps={3}
              title="Hoàn thành"
              description="Kiểm tra lại các thông tin và đơn hàng và xác nhận đặt hàng"
            />
          </Steps>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto">
        <section className="bg-white py-8 antialiased  md:py-16">
          <Formik
            initialValues={{
              address_id: "",
              delivery_id: "",
              payment_method: "",
            }}
            onSubmit={handleSubmitCheckOut}
          >
            <Form>
              <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                <div className="min-w-0 flex-1 space-y-8">
                  <Address name="address_id"></Address>
                  <PaymentMethod></PaymentMethod>
                  <DeliveryMethod setCost={setCost}></DeliveryMethod>
                </div>
                <Sidebar cost={cost}></Sidebar>
              </div>
            </Form>
          </Formik>
        </section>
      </div>
      <CheckoutSuccess isOpen={isCheckout}></CheckoutSuccess>
    </div>
  );
};

export default CheckoutPage;
