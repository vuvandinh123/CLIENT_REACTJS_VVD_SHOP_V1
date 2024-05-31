import { useState } from "react";
import PropTypes from "prop-types";
import { formathDate } from "../../utils";
const DiscountCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseMove={() => setOpen(true)}
      onMouseOut={() => setOpen(false)}
    >
      <div className="w-max cursor-pointer border border-dashed border-red-500 rounded-sm text-red-500 px-3 py-1 bg-red-100">
        {data.code}{" "}
        <span className="font-bold ms-3">
          -{data.value}
          {data.type_price === "fixed_amount" ? "đ" : "%"}
        </span>
      </div>
      <div
        className={`absolute z-50 before:content-[''] after:content-[''] after:block after:absolute after:left-0 after:right-0 after:h-3 after:bg-transparent after:top-0 after:-translate-y-full before:block  before:absolute  before:z-10 before:border-b-[10px] before:border-b-red-500 before:left-8 before:-translate-y-full before:border-l-transparent before:border-r-transparent before:border-l-[10px] before:border-r-[10px]  top-full mt-3 left-0 transition-all duration-200  ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-10 invisible"
        }`}
      >
        <div className="container bg-gradient-to-r from-red-400 to-violet-500 text-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <div className="text-3xl font-bold mb-4">Special Offer!</div>
          <div className="text-md mb-4">
            Get{" "}
            <span className="text-yellow-400 font-bold">
              {data.value} {data.type_price === "fixed_amount" ? "đ" : "%"} OFF
            </span>{" "}
            your purchase!
          </div>
          <div className="text-md mb-2">Use coupon code:</div>
          <div className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
            <span className="text-2xl font-semibold">{data.code}</span>
            <button className="bg-blue-800 ms-3 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Copy
            </button>
          </div>
          <div className="text-sm mt-4">
            <p>
              Valid until{" "}
              <span className="font-semibold">{formathDate(data.end_date)}</span>
            </p>
            <p>Terms and conditions apply.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
DiscountCard.propTypes = {
  data: PropTypes.object,
};
export default DiscountCard;
