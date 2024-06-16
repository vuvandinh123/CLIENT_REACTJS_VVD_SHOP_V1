import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { PlacehoderCard } from "../../../components/common";
import PropTypes from "prop-types";
import Product from "../../../components/products/Product";
import { useApiCall } from "../../../hooks";
import { getDailyProduct } from "../../../service/Product";
const FeaturedProducts = () => {
  const { data, loading } = useApiCall(async () => {
    const res = await getDailyProduct();
    return res.data;
  }, []);
  return (
    <div>
      <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 items-center">
        <div className="flex items-center">
          <h5 className="uppercase font-bold text-[16px]">Sản phẩm bán chạy</h5>
        </div>
        <div>
          <div className="text-sm leading-4 flex items-center justify-between">
            <a
              href=""
              className="me-3 hover:text-[#2b38d1] group flex text-[12px] lg:text-[14px]  text-[#5a5a5a]"
            >
              Xem tất cả{" "}
              <MdKeyboardDoubleArrowRight className="text-[18px]  ms-1 group-hover:translate-x-2 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[100%]  relative group/arrow mt-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-2">
          {!loading
            ? data &&
              data.length > 0 &&
              data?.map((item, index) => {
                return <Product data={item} key={index} deals={false} />;
              })
            : Array(5)
                .fill(null)
                .map((item, index) => <PlacehoderCard key={index} />)}
        </div>
      </div>
    </div>
  );
};
FeaturedProducts.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};
export default FeaturedProducts;
