import SlickCround from "../../../components/common/SlickCround";
import Product3 from "../../../components/products/Product3";
import { PlacehoderCard } from "../../../components/common";
import PropTypes from "prop-types";
const TopSellingProducts = ({ data, loading }) => {
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
  return (
    <div>
      <div className="flex">
        <img
          className="w-1/2"
          src="https://demo-uminex.myshopify.com/cdn/shop/files/banner_1_3.jpg?v=1672388551&width=2000"
          alt=""
        />
        <img
        className="w-1/2"
          src="https://demo-uminex.myshopify.com/cdn/shop/files/banner_1_2.jpg?v=1672388539&width=2000"
          alt=""
        />
      </div>
      <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 items-center">
        <div className="flex items-center">
          <p className="text-base uppercase font-bold text-[#000]">
            Danh mục nổi bật
          </p>
        </div>
        <div>
          <div className="text-sm leading-4">
            <ul className="flex justify-center items-center gap-5">
              <li>
                <a className="hover:text-[#4369ff]" href="">
                  All product
                </a>
              </li>
              <li>
                <a className="hover:text-[#4369ff]" href="">
                  Smartphone
                </a>
              </li>
              <li>
                <a className="hover:text-[#4369ff]" href="">
                  Ipad
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="my-2 relative group/arrow">
        {!loading && data ? (
          <SlickCround settings={settings}>
            {data.length > 0 &&
              data?.map((item, index) => (
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
TopSellingProducts.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};
export default TopSellingProducts;
