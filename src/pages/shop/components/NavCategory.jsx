/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useApiCall } from "../../../hooks";
import { getCategoryInShop } from "../../../service/Category";
import { setUrlSearchParam } from "../../../utils";

const NavCategory = ({ shopId, category, setCategory }) => {
  const [categories, setCategories] = useState([]);
  const { loading } = useApiCall(async () => {
    const [categories] = await Promise.all([getCategoryInShop(shopId)]);
    setCategories(categories.data);
  }, [shopId]);
  const handleClickCategory = (id) => {
    setUrlSearchParam("cat", id);
    setCategory(id);
  };
  return (
    <div className="bg-white mt-2 pt-5 px-3">
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            <span
              onClick={() => handleClickCategory("ALL")}
              className={`${
                category === "ALL" ? "border-blue-500 text-blue-500" : ""
              } shrink-0 border-b-2 cursor-pointer hover:border-blue-500 hover:text-blue-500  px-1 pb-4 text-sm font-medium `}
            >
              Tất cả sản phẩm
            </span>
            {categories.map((item) => (
              <span
                key={item.id}
                onClick={() => handleClickCategory(item.id + "")}
                className={`${
                  item.id?.toString() === category + ""
                    ? "border-blue-500 text-blue-500"
                    : ""
                } shrink-0 border-b-2 cursor-pointer hover:border-blue-500 hover:text-blue-500 px-1 pb-4 text-sm font-medium `}
              >
                {item.name}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavCategory;
