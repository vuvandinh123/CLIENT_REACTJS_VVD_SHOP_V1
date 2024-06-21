import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useFav from "../../hooks/useFav";
import { ChangePrice, ImageLoader, Offcanvas } from "../common";
import { formatPriceVND } from "../../utils";

const Favourite = ({ isOpen, setIsOpen }) => {
  const { data, handleClickRemoveFavourite } = useFav();
  const handleClickViewFav = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Offcanvas isOpen={isOpen} label={"Yêu thích"} setIsOpen={setIsOpen}>
        {data?.length === 0 && (
          <div className="flex justify-center mt-10 h-full">
            <div>
              <svg
                width={119}
                height={119}
                viewBox="0 0 119 119"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.0346 89.8707C13.6486 78.2693 3 61.7359 3 40.4386C3 23.1205 16.9553 9.10938 34.1613 9.10938C44.3615 9.10938 53.3849 14.0413 59.0455 21.6635C64.706 14.0413 73.7854 9.10938 83.9297 9.10938C90.3749 9.10938 96.3717 11.0707 101.36 14.4895"
                  stroke="#D7DBE0"
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M113.633 31.0229C114.586 33.9934 115.091 37.188 115.091 40.4946C115.091 79.7265 78.7732 102.873 62.52 108.478C60.6144 109.15 57.4759 109.15 55.5704 108.478C51.9274 107.245 47.3318 105.115 42.3438 102.145"
                  stroke="#D7DBE0"
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M115.091 3L3 115.091"
                  stroke="#D7DBE0"
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h1 className="text-center mt-3 text-gray-500">
                Wishlist is empty.
              </h1>
            </div>
          </div>
        )}
        {data?.length > 0 && (
          <>
            <div className="max-h-[80%] overflow-scroll">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b items-center p-3"
                >
                  <div className="flex gap-3">
                    <div className="w-[90px] flex-shrink-0">
                      <Link to={`/products/${item.slug}-${item.id}`}>
                        <ImageLoader src={item.thumbnail} />
                      </Link>
                    </div>
                    <div className="mt-2">
                      <h3>
                        <Link
                          className="text_ecl-2 hover:text-blue-500 transition-all"
                          to={`/products/${item.slug}-${item.id}`}
                        >
                          {item.name}
                        </Link>
                      </h3>
                      <h4 className="text-[#2b38d1] font-bold mt-2 text-[16px]">
                        {formatPriceVND(item.price)}
                      </h4>
                    </div>
                  </div>

                  <div
                    onClick={() => handleClickRemoveFavourite(item.id)}
                    className=""
                  >
                    <i className="fa-regular cursor-pointer hover:text-red-500 p-3 fa-trash-can"></i>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#F1F5F6] p-4">
              <div className=" h-[100vh]">
                <Link
                  onClick={handleClickViewFav}
                  to={"/wishlist"}
                  className="w-full flex items-center justify-center  bg-blue-500 duration-300 text-white transition-all uppercase border rounded-full py-3 font-bold mb-3"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
          </>
        )}
      </Offcanvas>
    </div>
  );
};
Favourite.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  favRef: PropTypes.object,
};
export default Favourite;
