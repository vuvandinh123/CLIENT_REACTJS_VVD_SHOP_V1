/* eslint-disable react/prop-types */
import CategoriesSiderbar from "./components/CategoriesSiderbar";
import Filter from "./components/Filter";
import Featured from "./components/Featured";
const SidebarFilter = ({
  categories,
  categoryId,
  handleCheckboxChange,
  province,
  params,
  setParams,
  brands,
}) => {
  return (
    <div className="basis-1/5 hidden lg:block min-h-[100vh] bg-white p-5">
      <div className="border-b pb-5">
        <CategoriesSiderbar
          catgoryId={categoryId}
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
          <p className="uppercase text-red-500 mb-2 text-[12px]">Top Camaras</p>
          <h6 className="text-2xl">LAP TOP</h6>
          <h6 className="uppercase text-red-500 text-2xl">macboox m1</h6>
          <p>
            Just from <span>129.000 đ</span>
          </p>
          <button className="w-full py-2 mt-5 font-bold  text-black border-[3px]  rounded-full">
            XEM NGAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
