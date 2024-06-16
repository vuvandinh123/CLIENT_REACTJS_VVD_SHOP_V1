import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useApiCall, useFilter, useScrollTop } from "../../hooks";
import ModalMB from "./components/ModalMB";
import LayoutProduct from "../../components/products/LayoutProduct";
import { extractNumberFromSlug } from "../../utils";
import { getCategoryById, getCategoryFilter } from "../../service/Category";
import { getProductByCategory } from "../../service/Product";
import { getProvinceByProducts } from "../../service/Provinces";
import SidebarFilter from "../../components/common/products/SidebarFilter";
const Products = () => {
  useScrollTop();
  const searchParams = new URLSearchParams(window.location.search);
  const location2 = useLocation();
  const [totalProduct, setTotalProduct] = useState(0);
  const limit = searchParams.get("limit");
  const sortBy = searchParams.get("sortBy");
  const minPrice = searchParams.get("min");
  const maxPrice = searchParams.get("max");

  const { slug } = useParams();
  // lấy id danh mục
  const id = extractNumberFromSlug(slug);
  const brand = searchParams.get("brand")?.split(",") || [];
  const [params, setParams] = useState({
    brand: brand,
    sortBy: sortBy || "featured",
    price: { min: minPrice || null, max: maxPrice || null },
    limit: Number(limit) || 20,
    stars: 1,
    province: [],
  });
  // filter params
  useFilter(params);
  const { data: province } = useApiCall(async () => {
    const res = await getProvinceByProducts(1);
    return res.data;
  });
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
  const { data: category } = useApiCall(
    async () => {
      const res = await getCategoryById(id);
      return res.data;
    },
    [],
    {}
  );
  const categories = useApiCall(
    async () => {
      const res = await getCategoryFilter(id);

      return res.data;
    },
    [],
    {}
  );
  // fetch data brands
  const brands = useApiCall(async () => {
    return await [];
  }, []);
  // fetch data products
  const products = useApiCall(async () => {
    console.log(params.sortBy, "sortBy");
    const res = await getProductByCategory(id, params);
    setTotalProduct(res.options.count);
    return res.data;
  }, [
    slug,
    location2.search,
    params.price,
    params.stars,
    params.sortBy,
    params.province,
  ]);
  return (
    <div className="bg-[#F1F5F6]">
      <div className="bg-[url(https://demo-uminex.myshopify.com/cdn/shop/files/bg_breadcrumbs_1920x.png?v=1684232545)] h-36 text-white flex justify-center items-center flex-col gap-y-3">
        <h2 className="text-4xl font-semibold">{category.name}</h2>
        <div>
          <ul className="flex items-center gap-x-2">
            <li>
              <a href="">Trang chủ</a>
            </li>
            <li>/</li>
            <li>
              <a href="">{category.name}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto">
        <div className=" md:hidden">
          <ModalMB
            handleCheckboxChange={handleCheckboxChange}
            params={params}
            brands={brands.data?.data?.data}
            setParams={setParams}
          />
        </div>
        <div className="flex gap-x-5">
          {/* <div className="basis-1/5 hidden lg:block min-h-[100vh] bg-white p-5">
            <div className="border-b pb-5">
              <CategoriesSiderbar
                catgoryId={id}
                data={categories.data}
                loading={categories.loading}
              />
            </div>
            <Filter
              handleCheckboxChange={handleCheckboxChange}
              filter={params}
              province={province}
              price={params.price}
              params={params}
              brands={brands.data?.data?.data}
              setFilter={setParams}
            />
            <div className="border-b pb-5 mt-5">
              <Featured />
            </div>
            <div className="border-b pb-5 mt-5 relative">
              <div>
                <div>
                  <img
                    className="w-full"
                    src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_8_180x.jpg?v=1676309988"
                    alt=""
                  />
                </div>
              </div>
              <div className="absolute top-1/4 left-5">
                <p className="uppercase text-red-500 mb-2 text-[12px]">
                  Top Camaras
                </p>
                <h6 className="text-2xl">LAP TOP</h6>
                <h6 className="uppercase text-red-500 text-2xl">macboox m1</h6>
                <p>
                  Just from <span>$129.00</span>
                </p>
                <button className="w-full py-2 mt-5 font-bold  text-black border-[3px]  rounded-full">
                  SHOW NOW
                </button>
              </div>
            </div>
          </div> */}
          <SidebarFilter handleCheckboxChange={handleCheckboxChange} categories={categories} categoryId={id} province={province} params={params} brands={brands} setParams={setParams}></SidebarFilter>
          <div className="lg:basis-4/5">
            <LayoutProduct
              filter={params}
              setFilter={setParams}
              loading={products.loading}
              data={products.data}
            />
            <div className="flex items-center justify-center mt-10">
              {products.data.length < totalProduct && (
                <button
                  onClick={handleLoadMore}
                  disabled={products.loading}
                  className="px-10 flex items-center gap-3 py-3 hover:shadow-md hover:bg-blue-500 transition-all duration-200 hover:text-white border-2  rounded-md bg-slate-200  "
                >
                  {products.loading ? (
                    <span>Loading ...</span>
                  ) : (
                    <span>
                      Xem thêm ({totalProduct - products.data.length}) sản phẩm
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

export default Products;
