/* eslint-disable react/prop-types */
import { Modal } from "keep-react";
import { Check } from "phosphor-react";
import { Link } from "react-router-dom";

const CheckoutSuccess = ({ isOpen }) => {
  return (
    <div>
      <Modal isOpen={isOpen}>
        <Modal.Body className="flex w-[30rem] flex-col items-center p-6 lg:p-8">
          <Modal.Icon className="h-20 w-20 border border-success-100 bg-success-50 text-success-500">
            <Check size={60} />
          </Modal.Icon>
          <Modal.Content className="my-4 text-center">
            <h3 className="mb-2 text-body-1 font-bold text-metal-900">
              Đặt hàng thành công
            </h3>
            <p className="mx-auto max-w-xs text-body-4 font-normal text-metal-600">
              Đơn hàng của bạn sẽ được giao đến bạn từ 1 đến 3 ngày tới
            </p>
          </Modal.Content>
          <Modal.Footer>
            <Link to={"/user/purchase"} className="bg-green-500 rounded-md font-bold text-white px-5 py-3">
              Xem chi tiết đơn hàng
            </Link>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CheckoutSuccess;
