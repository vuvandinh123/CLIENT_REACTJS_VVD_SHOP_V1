import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import SlickCround from "../../../components/common/SlickCround";
import PropTypes from "prop-types";
import { PlacehoderCard } from "../../../components/common";
import Product2 from "../../../components/products/Product2";
import { useApiCall } from "../../../hooks";
import { getProductRandom } from "../../../service/Product";
import Product3 from "../../../components/products/Product3";
const Recomended = () => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2, // Số hàng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };
  const { data: products, loading } = useApiCall(async () => {
    const res2 = await getProductRandom();
    return res2.data;
  }, []);
  return (
    <div className="my-10">
      <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 items-center">
        <div className="flex items-center">
          <h5 className="uppercase font-bold text-[16px] text-red-500">Gợi ý hôm nay</h5>
        </div>
        <div>
          <div className="text-sm leading-4 flex items-center justify-between">
            <a
              href=""
              className="me-3 hover:text-[#2b38d1] group flex text-[12px] lg:text-[14px]  text-[#5a5a5a]"
            >
              Xem tất cả
              <MdKeyboardDoubleArrowRight className="text-[18px]  ms-1 group-hover:translate-x-2 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
      <div className=" max-w-[100%] my-2 relative group/arrow mt-2">
        {!loading && products ? (
          <SlickCround settings={settings}>
            {products.length > 0 &&
              products.map((item, index) => (
                <Product3 data={item} key={index} deals={true} />
              ))}
          </SlickCround>
        ) : (
          <SlickCround settings={settings}>
            {Array(4)
              .fill(null)
              .map((item, index) => (
                <PlacehoderCard key={index} />
              ))}
          </SlickCround>
        )}
      </div>
    </div>
  );
};
Recomended.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};
export default Recomended;
