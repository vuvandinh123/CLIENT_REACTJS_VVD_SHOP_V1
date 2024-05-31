import { useSelector } from "react-redux";
import Product from "../../components/products/Product";
import { Link } from "react-router-dom";

const Favourite = () => {
  
  const { favAr } = useSelector((state) => state.favourite);
  return (
    <div className="bg-[#F1F5F6] pb-10 w">
      <div className="max-w-[1410px] relative px-5 py-5 mx-auto ">
        <div className="pb-5">
          <ul className="flex items-center gap-x-2">
            <li>
              <Link className="text-gray-500 hover:text-blue-500" to={"/"}>
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <span>wishlist</span>
            </li>
          </ul>
        </div>
        <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 items-center">
          <div className="flex items-center">
            <h5 className="uppercase font-bold text-[16px]">
              YOUR FAVOURITE PRODUCT
            </h5>
          </div>
        </div>
        <div className="py-3 max-w-[1410px] mx-auto">
          {favAr.length > 0 ? (
            <div
              className={` ${"min-[500px]:grid-cols-2 grid min-[600px]:grid-cols-3 min-[900px]:grid-cols-4 min-[1000px]:grid-cols-3 min-[1280px]:grid-cols-4 min-[1400px]:grid-cols-6"}  gap-y-2 mt-3 `}
            >
              {favAr.length > 0 &&
                favAr.map((item) => <Product key={item.id} data={item} />)}
            </div>
          ) : (
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
        </div>
      </div>
    </div>
  );
};

export default Favourite;
