/* eslint-disable react/prop-types */
import { useState } from "react";
// icons
import { initNewBrand, initNewCategory } from "../../../../data/initValueFormik";
// components
import LayoutForm from "../../../../components/common/LayoutForm";
// schame
import { brandSchema, categorySchema } from "../../../../data/schema";
import TextFiled from "../../../../components/fields/TextFiled";
import TinyEditor from "../../../../components/fields/TinyEditor";
import toast from "react-hot-toast";
import { useApiCall } from "../../../../../hooks";
import {
  createCategory,
  getAllCategoryAdminSelectParent,
} from "../../../../service/Category";
import { useNavigate } from "react-router-dom";
import { buildMenuTree } from "../../../../../helpers/utils";
import CateSelected from "../../../../components/cateSelected";
import { createBrand } from "../../../../service/Brand";

const NewBrand = () => {
  const navigate = useNavigate();
  // init state
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const [loading, setLoading] = useState(false);
  // Lấy tất cả danh mục
  useApiCall(async () => {
    const res = await getAllCategoryAdminSelectParent();
    setCategories(buildMenuTree(res.data, 0));
  }, [refresh]);

  const fnSaveCreate = async (data) => {
    const res = await createBrand(data);
    if (res.status === 201) {
      toast.success("Tạo thương hiệu thành công");
      navigate("/admin/brands");
    }
  };
  // submit form
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (isSaveDraft) {
        fnSaveCreate({ ...values, is_active: 1 });
      } else {
        fnSaveCreate({ ...values, is_active: 2 });
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi, xin vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };
  return (
    <LayoutForm
      title="Thêm thương hiệu"
      initValues={initNewBrand}
      isLoading={loading}
      handleSubmit={handleSubmit}
      validateSchema={brandSchema}
      linkBack={"/admin/brands"}
      setRefresh={setRefresh}
      setIsSaveDraft={setIsSaveDraft}
    >
      <main className="mb-5">
        <div className="  grid grid-cols-12 gap-5">
          <div className=" rounded-lg col-span-8 shadow-md p-5 bg-white">
            <TextFiled
              name="name"
              label="Tên thương hiệu"
              placeholder="Tên thương hiệu"
            ></TextFiled>
            <div className="mt-5">
              <label
                htmlFor=""
                className="block font-semibold ms-1 mb-2 text-gray-500"
              >
                Mô tả
              </label>
              <TinyEditor
                name="description"
                label="Mô tả"
                placeholder="Mô tả"
              ></TinyEditor>
            </div>
          </div>
          <div className="col-span-4 overflow-auto rounded-lg shadow-md bg-white p-5">
            <div>
              <label className="block font-semibold ms-1 mb-2 text-gray-500">
                Danh mục
              </label>
              <div className="h-[500px] overflow-auto">
                <CateSelected name="category_id" data={categories}></CateSelected>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutForm>
  );
};

export default NewBrand;
