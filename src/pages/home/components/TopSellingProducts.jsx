import { PlacehoderCard } from "../../../components/common";
import PropTypes from "prop-types";
import { useApiCall } from "../../../hooks";
import { getAllCategoryShow } from "../../../service/Category";
import Product from "../../../components/products/Product";
import { getHotCategory } from "../../../service/Product";
import { useState } from "react";
const TopSellingProducts = () => {
  const [category, setCategory] = useState(null);
  const { data: categories } = useApiCall(async () => {
    const res = await getAllCategoryShow();
    const splitCate = res.data.slice(0, 10);
    const arr = splitCate.map((item) => item.id);
    const id = arr[Math.floor(Math.random() * arr.length)];
    setCategory(id);
    return splitCate;
  }, []);
  const { data: products, loading } = useApiCall(async () => {
    if (category) {
      const res2 = await getHotCategory({ categoryId: category });
      return res2.data;
    }
    return [];
  }, [category]);

  return (
    <div>
      <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 items-center">
        <div className="flex items-center">
          <p className="text-base uppercase font-bold text-[#000]">
            Danh mục nổi bật
          </p>
        </div>
        <div>
          <div className="text-sm leading-4">
            <ul className="flex justify-center items-center gap-5">
              {categories?.map((item, index) => (
                <li key={index}>
                  <span
                    onClick={() => setCategory(item.id)}
                    className={`hover:text-[#4369ff] ${
                      item.id === category && "text-[#4369ff]"
                    } cursor-pointer`}
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="my-2 relative group/arrow">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-2">
          {!loading
            ? products &&
              products.length > 0 &&
              products?.map((item, index) => {
                return <Product data={item} key={index} deals={false} />;
              })
            : Array(6)
                .fill(null)
                .map((item, index) => <PlacehoderCard key={index} />)}
        </div>
      </div>
    </div>
  );
};
TopSellingProducts.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};
export default TopSellingProducts;
