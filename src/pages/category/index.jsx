import { Link } from "react-router-dom";
import { useApiCall } from "../../hooks";
import { getAllCategoryShow } from "../../service/Category";
const CategoryPage = () => {
  const { data } = useApiCall(async () => {
    const res = await getAllCategoryShow();
    return res.data;
  }, []);
  return (
    <div className="bg-[#F1F5F6]">
      <div className="bg-[url(https://demo-uminex.myshopify.com/cdn/shop/files/bg_breadcrumbs_1920x.png?v=1684232545)] h-36 text-white flex justify-center items-center flex-col gap-y-3">
        <h2 className="text-4xl font-semibold uppercase">Danh mục</h2>
        <div>
          <ul className="flex items-center gap-x-2">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>/</li>
            <li>
              <a href="">Danh mục</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto">
        <div className="flex items-center flex-wrap">
          {data?.length > 0 &&
            data?.map((item, index) => (
              <div key={index} className="lg:w-1/4  md:w-1/3 sm:w-1/2 w-full ">
                <div className="bg-white relative m-1 p-5 rounded-md ">
                  <div className="h-[290px] overflow-hidden  z-30 group relative ">
                    <Link to={`/categories/${item.slug}-${item.id}`}>
                      <img
                        width={"290px"}
                        className="group-hover:scale-105 z-10 relative h-full  transition-all duration-500 w-full"
                        src={item.thumbnail}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div>
                    <h2 className="text-center my-2 uppercase">
                      <Link to={`categories/${item.id}`}>{item.name}</Link>
                    </h2>
                    <p className="text-gray-500 text-center text-[12px]">
                      <span>{item.total_product}</span> Sản phẩm
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
