/* eslint-disable react/prop-types */
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantityOptionProduct = ({ qty, quantity, setQuantity }) => {
  
  const handleClickMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleClickPlus = () => {
    if (quantity < qty) {
      setQuantity(quantity + 1);
    }
  };
  return (
    <div>
      <div className="">
        <h5 className=" text-gray-400 mb-2">Quantity:</h5>
        <div className="-ms-2 flex items-center gap-5">
          <div className="flex items-center border">
            <button onClick={handleClickMinus} className="px-3 py-1">
              <FaMinus></FaMinus>
            </button>
            <input
              value={quantity}
              className="border text-lg  outline-none py-1 text-center w-16"
              type="text"
            />
            <button onClick={handleClickPlus} className="px-3 py-1">
              <FaPlus></FaPlus>
            </button>
          </div>
          <div>
            <p className="text-gray-400 text-[13px]">
              {qty} pieces available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantityOptionProduct;
