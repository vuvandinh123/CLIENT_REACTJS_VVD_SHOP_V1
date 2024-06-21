import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApiCall, useDropdown } from "../../../hooks";
import lodash, { debounce } from "lodash";
import { AppURL } from "../../../api/AppURL";
import { ImageLoader } from "../../common";
import Skeleton from "react-loading-skeleton";
import { getSearchProducts } from "../../../service/Product";
import { formatPriceVND } from "../../../utils";
import { getAllCategoryShow } from "../../../service/Category";

const Search = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [idCategory, setIdCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const searchRef = useRef(null);
  const dropdowRef = useRef(null);
  const containerRef = useRef(null);

  // GET categories
  const category = useApiCall(async () => {
    const res = await getAllCategoryShow();
    return res.data;
  }, []);
  // categories is optional
  const categorySearch = category?.data || [];
  const { dropdow: activeSearch, setDropdow: setActiveSearch } = useDropdown(
    false,
    dropdowRef,
    containerRef
  );
  useEffect(() => {
    setLoading(true);
    const fetchDataSearch = debounce(async () => {
      const params = {
        search: search,
        categoryId: idCategory,
      };
      const response = await getSearchProducts(params);
      setSearchData(response?.data);
      setLoading(false);
      setNoData(response?.data?.length === 0);
    }, 800);
    fetchDataSearch();
    return () => {};
  }, [search, idCategory]);
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    console.log(search);
    if (search === "") return;
    setActiveSearch(false);
    if (searchRef.current) {
      searchRef.current.blur();
    }
    if (idCategory == "ALL") {
      navigate("/search?q=" + search);
    } else {
      navigate("/search?cat=" + idCategory + "&q=" + search);
    }
  };
  const handleFocusSearch = () => {
    setActiveSearch(true);
  };
  const hanldeChangeSearch = lodash.debounce((e) => {
    setSearch(e.target.value);
  }, 300);

  return (
    <>
      <div className="hidden lg:block w-full z-30 bg-white relative">
        <form action="" onSubmit={handleSubmitSearch} method="get">
          <div
            ref={containerRef}
            className="flex items-center w-full  justify-center"
          >
            <div className="border rounded-s-md border-[#e5e8ec] w-[60%] h-12 flex">
              <select
                className="px-3 text-[#212529] hidden md:block bg-transparent  outline-0 w-[150px]"
                name="category"
                id=""
                onChange={(e) => setIdCategory(e.target.value)}
              >
                <option className="text-[#212529]" value="all">
                  Tất cả danh mục
                </option>
                {categorySearch &&
                  categorySearch.length > 0 &&
                  categorySearch?.map((item) => (
                    <option
                      key={item.id}
                      className="text-[#212529]"
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
              <input
                type="text"
                onChange={hanldeChangeSearch}
                onFocus={handleFocusSearch}
                onBlur={() => {
                  setTimeout(() => {
                    setActiveSearch(false);
                  }, 300);
                }}
                ref={searchRef}
                defaultValue={search}
                placeholder="Tìm kiếm sản phẩm..."
                className="px-3 text-[14px] py-2 rounded-xl w-full  outline-0"
              />
            </div>
            <button className="bg-[#2b38d1] uppercase font-bold text-white hover:bg-[#2b39d1bd] px-10 py-[13px] rounded-e-md">
              Tìm
            </button>
          </div>
        </form>

        {search.length > 0 && activeSearch && (
          <>
            <div
              ref={dropdowRef}
              className="absolute border overflow-scroll max-h-[450px]  z-50 rounded-md  right-32 left-32  p-3 bg-white"
            >
              {searchData?.length > 0 &&
                !noData &&
                !loading &&
                searchData?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b p-3 gap-2"
                  >
                    <div className="relative shrink-0 w-[60px]">
                      <Link className="" to={`/products/${item.slug}-${item.id}`}>
                        <ImageLoader
                          className={"w-[60px]"}
                          src={item.thumbnail}
                        />
                      </Link>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-[15px]">
                        <Link
                          to={`/products/${item.slug}-${item.id}`}
                          className="hover:text-[#2b38d1] text-ecl transition-all"
                        >
                          {item.name}
                        </Link>
                      </h4>
                      <h5 className="text-red-500 mt-2 font-bold">
                        {formatPriceVND(item.price)}
                      </h5>
                    </div>
                  </div>
                ))}
              {loading &&
                Array(5)
                  .fill(1)
                  .map((item, index) => (
                    <div key={index} className="flex border-b p-3 gap-2">
                      <div className="relative">
                        <Skeleton width={60} height={60} />
                      </div>
                      <div className="mt-2">
                        <h4 className="text-[15px]">
                          <Skeleton width={250} height={20} />
                        </h4>
                        <h5 className="text-red-500 mt-2 font-bold">
                          <Skeleton width={100} height={20} />
                        </h5>
                      </div>
                    </div>
                  ))}
              {noData && (
                <p className="text-gray-400 text-center text-[17px]">
                  Không tìm thấy sản phẩm
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Search;
