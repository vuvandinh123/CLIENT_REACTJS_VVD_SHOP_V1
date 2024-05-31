import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { PlacehoderCard } from "../../../components/common";
import SlickCround from "../../../components/common/SlickCround";
import { settingSlick } from "../../../helpers";
import PropTypes from "prop-types";
import Product from "../../../components/products/Product";
const FeaturedProducts = ({ data, loading }) => {
  const settings = settingSlick(5);
  return (
    <div>
      <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 items-center">
        <div className="flex items-center">
          <h5 className="uppercase font-bold text-[16px]">Feature Products</h5>
        </div>
        <div>
          <div className="text-sm leading-4 flex items-center justify-between">
            <a
              href=""
              className="me-3 hover:text-[#2b38d1] group flex text-[12px] lg:text-[14px]  text-[#5a5a5a]"
            >
              View all{" "}
              <MdKeyboardDoubleArrowRight className="text-[18px]  ms-1 group-hover:translate-x-2 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
      <div className=" max-w-[100%] relative group/arrow mt-5">
        {!loading && (
          <SlickCround settings={settings}>
            {!loading
              ? data &&
                data.length > 0 &&
                data?.map((item, index) => {
                  return <Product data={item} key={index} deals={false} />;
                })
              : Array(5)
                  .fill(null)
                  .map((item, index) => <PlacehoderCard key={index} />)}
          </SlickCround>
        )}
      </div>
    </div>
  );
};
FeaturedProducts.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};
export default FeaturedProducts;
