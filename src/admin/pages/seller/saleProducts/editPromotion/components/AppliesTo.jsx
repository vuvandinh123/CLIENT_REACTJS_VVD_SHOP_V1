/* eslint-disable react/prop-types */
import { formatPrice } from "../../../../../../utils";

const AppliesTo = ({ data }) => {
  return (
    <div className="mb-4">
      <div className="w-full rounded-lg bg-white p-5  shadow-md">
        <h3 className="text-xl font-bold capitalize">Áp dụng cho</h3>
        <p className="mt-2 mb-4 text-sm font-medium text-gray-400">
          Sản phẩm áp dụng giảm giá này.
        </p>
        <div className="mb-5"></div>
        <div>
          <div className="grid grid-cols-12 items-center justify-center border-b p-3 bg-gray-100 hover:bg-gray-100 rounded-md">
            <div className="col-span-1">
              <img
                src={data.thumbnail}
                className="max-h-[50px] w-[50px]"
                alt=""
              />
            </div>
            <div className="col-span-7">
              <p className="text-ecl">{data.product_name}</p>
            </div>
            <div className="col-span-2 text-center">{data.quantity} cái</div>
            <div className="col-span-1">{formatPrice(data.price || 0)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliesTo;
