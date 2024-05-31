/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LayoutProduct from "../../components/products/LayoutProduct";
import { POST_PRODUCT_SEARCH } from "../../constants/constants";

const Search = () => {
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const searchQuery = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const location2 = useLocation();
  const cat = searchQuery.get("cat") || "all";
  const q = searchQuery.get("q");
  const [params, setParams] = useState({
    sortBy: "Featured",
    page: searchQuery.get("page") || 1,
  });
  const fetchData = async () => {
    const page = searchQuery.get("page");
    const cat = searchQuery.get("cat") || "all";
    const q = searchQuery.get("q");
    const sortBy = searchQuery.get("sortBy");
    const params2 = {
      search: q,
      limit: 20,
      sortBy: sortBy || "Featured",
      page: page || 1,
    };
    setLoading(true);
    const dataPromises = [];
    for (let i = 1; i <= Number(params2.page); i++) {
      const response = await {}
      if (i === 1) {
        setTotalProduct(response.total);
      }
      dataPromises.push(response.data.data);
    }
    const pagesData = await Promise.all(dataPromises);
    const combinedData = pagesData.reduce((acc, data) => [...acc, ...data], []);
    setData(combinedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [cat, q, location2.search, params]);

  const handleLoadMore = () => {
    searchQuery.set("page", params.page + 1);
    navigation(`?${searchQuery.toString()}`);
  };
  return (
    <div className="bg-[#F1F5F6] pb-10">
      <div className="bg-[url(https://demo-uminex.myshopify.com/cdn/shop/files/bg_breadcrumbs_1920x.png?v=1684232545)] h-36 text-white flex justify-center items-center flex-col gap-y-3">
        <h2 className="text-2xl font-semibold">
          {totalProduct} RESULTS FOR {`"${q}"`}
        </h2>
        <div>
          <ul className="flex items-center gap-x-2">
            <li>
              <Link to={"/"} href="">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <a href="">Search</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto">
        <LayoutProduct
          loading={loading}
          params={params}
          setParams={setParams}
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
                <span>Load more ({totalProduct - data.length}) products</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
