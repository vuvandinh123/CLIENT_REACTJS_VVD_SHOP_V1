import { useParams } from "react-router-dom";
import { useApiCall } from "../../hooks";
import { getProductUserShop } from "../../service/Product";
import { useEffect, useState } from "react";
import { Loader } from "../../components/common";
import ShopDetail from "./components/ShopDetail";
import NavCategory from "./components/NavCategory";
import { getUrlSearchParam } from "../../utils";
import LayoutProduct2 from "../../components/products/LayoutProduct2";
import PaginationShop from "./components/Pagination";

const Shop = () => {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [category, setCategory] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 24,
    totalPage: 1,
  });
  useEffect(() => {
    const cat = getUrlSearchParam("cat");
    const page = getUrlSearchParam("page");
    const newCategory = cat ? cat : "ALL";
    const newPage = page ? Number(page) : 1;
    setCategory(newCategory);
    setPagination((prev) => ({ ...prev, page: newPage }));
    setInitialLoad(false);
  }, []);

  const { loading } = useApiCall(async () => {
    if (initialLoad) return;
    const [products] = await Promise.all([
      getProductUserShop(shopId, {
        category: category,
        page: pagination.page,
        limit: pagination.limit,
      }),
    ]);
    const { page, limit, totalPage } = products.options.pagination;
    setProducts(products.data);
    setPagination({
      page: Number(page),
      limit,
      totalPage: totalPage ?? 1,
    });
  }, [shopId, category, pagination.page]);
  return (
    <div className="bg-gray-100">
      {loading && <Loader></Loader>}
      <div className=" max-w-[1410px] relative py-5 px-5 mx-auto">
        <ShopDetail shopId={shopId}></ShopDetail>
        <div className="">
          <NavCategory
            category={category}
            setCategory={setCategory}
            shopId={shopId}
          ></NavCategory>
          <div className=" mt-2">
            <LayoutProduct2 loading={loading} data={products} />
          </div>
          <div className="flex bg-white rounded-md mt-5 py-5 justify-end items-end w-full">
            <PaginationShop
              page={pagination.page}
              limit={pagination.limit}
              totalPage={pagination.totalPage}
              pagination={pagination}
              setPagination={setPagination}
            ></PaginationShop>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
