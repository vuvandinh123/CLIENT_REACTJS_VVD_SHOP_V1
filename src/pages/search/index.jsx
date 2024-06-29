/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LayoutProduct from "../../components/products/LayoutProduct";
import SidebarFilter from "../../components/common/products/SidebarFilter";
import { getSearchProducts } from "../../service/Product";
import { useApiCall, useScrollTop } from "../../hooks";
import { getAllCategoryShow } from "../../service/Category";
import { getProvinceByProducts } from "../../service/Provinces";
import { getUrlSearchParam } from "../../utils";

const Search = () => {
  useScrollTop();
  const q = getUrlSearchParam("q") || "";
  const catId = getUrlSearchParam("cat") || "ALL";
  const location2 = useLocation();
  const [totalProduct, setTotalProduct] = useState(0);
  // lấy id danh mục
  const [params, setParams] = useState({
    brand: [],
    sortBy: "featured",
    price: { min: null, max: null },
    limit: Number(10) || 20,
    search: q,
    stars: 1,
    province: [],
  });
  // filter params
  const { data: province } = useApiCall(async () => {
    const res = await getProvinceByProducts(1);
    return res.data;
  }, []);
  const handleCheckboxChange = (value, isChecked, name) => {
    if (name == "brand") {
      setParams((item) => {
        if (isChecked) {
          if (!item.brand.includes(value)) {
            return {
              ...item,
              brand: [...item.brand, value],
            };
          }
        } else {
          return {
            ...item,
            brand: item.brand.filter((item) => item !== value),
          };
        }
        return item;
      });
    }
  };
  const handleLoadMore = () => {
    setParams({
      ...params,
      limit: params.limit + 10,
    });
  };
  // fetch data category
  const categories = useApiCall(
    async () => {
      const res = await getAllCategoryShow();
      return res.data;
    },
    [],
    {}
  );
  // fetch data brands
  const brands = [];
  // fetch data products
  const { data, loading } = useApiCall(async () => {
    const res = await getSearchProducts({
      ...params,
      search: q,
      categoryId: catId,
    });
    window.scrollTo(0, 0, { behavior: "smooth" });
    setTotalProduct(res.options.count);
    return res.data;
  }, [
    location2.search,
    params.price,
    params.stars,
    params.sortBy,
    params.limit,
    q,
    params.province,
  ]);
  return (
    <div className="bg-[#F1F5F6] pb-10">
      <div className="bg-[url(https://demo-uminex.myshopify.com/cdn/shop/files/bg_breadcrumbs_1920x.png?v=1684232545)] h-36 text-white flex justify-center items-center flex-col gap-y-3">
        <h2 className="text-2xl font-semibold">
          {totalProduct} KẾT QUẢ CHO {`"${q}"`}
        </h2>
        <div>
          <ul className="flex items-center gap-x-2">
            <li>
              <Link to={"/"} href="">
                Trang chủ
              </Link>
            </li>
            <li>/</li>
            <li>
              <a href="">Tìm kiếm</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-3 mx-auto">
        <div className="flex gap-x-5">
          <SidebarFilter
            handleCheckboxChange={handleCheckboxChange}
            categories={categories}
            categoryId={catId || 2}
            province={province}
            params={params}
            brands={brands}
            setParams={setParams}
          ></SidebarFilter>
          <div className="py-3 lg:basis-4/5 max-w-[1410px] px-3 mx-auto">
            <LayoutProduct
              loading={loading}
              params={params}
              setFilter={setParams}
              data={data}
            />
            <div className="flex items-center justify-center mt-10">
              {data.length < totalProduct && (
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-10 flex items-center gap-3 py-3 hover:shadow-md hover:bg-blue-500 transition-all duration-200 hover:text-white border-2  rounded-md bg-slate-200  "
                >
                  {loading ? (
                    <span>Loading ...</span>
                  ) : (
                    <span>
                      Xem thêm ({totalProduct - data.length}) sản phẩm
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
