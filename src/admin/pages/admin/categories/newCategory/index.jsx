/* eslint-disable react/prop-types */
import { useState } from "react";
// icons
import { initNewCategory } from "../../../../data/initValueFormik";
// components
import LayoutForm from "../../../../components/common/LayoutForm";
// schame
import { categorySchema } from "../../../../data/schema";
import TextFiled from "../../../../components/fields/TextFiled";
import TinyEditor from "../../../../components/fields/TinyEditor";
import SingleFile from "../../../../components/common/SingleFile";
import toast from "react-hot-toast";
import { useApiCall } from "../../../../../hooks";
import {
  createCategory,
  getAllCategoryAdminSelectParent,
} from "../../../../service/Category";
import { uploadImages } from "../../../../service/Upload";
import { useNavigate } from "react-router-dom";
import { buildMenuTree } from "../../../../../helpers/utils";
import CateSelected from "../../../../components/cateSelected";

const NewCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // init state
  const [refresh, setRefresh] = useState(false);
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [isParent, setIsParent] = useState(0);
  // Lấy tất cả danh mục
  useApiCall(async () => {
    const res = await getAllCategoryAdminSelectParent();
    setCategories(buildMenuTree(res.data, 0));
  }, [refresh]);
  
  const fnSaveCreate = async (data) => {
    const res = await createCategory(data);
    if (res.status === 201) {
      toast.success("Tạo danh mục thành công");
      navigate("/admin/categories");
    }
  };
  // submit form
  const handleSubmit = async (values) => {
    if(!Number(isParent)){
      values.parent_id = 0;
    }
    console.log(values);

    // check image
    if (!image) {
      toast.error("Vui lòng chọn ảnh đại diện");
      return;
    }
    setLoading(true);
    // upload image
    try {
      const files = await uploadImages([image]);
      values.thumbnail = files.data[0]?.url;
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
      title="Thêm danh mục"
      initValues={initNewCategory}
      isLoading={loading}
      handleSubmit={handleSubmit}
      validateSchema={categorySchema}
      linkBack={"/seller/categories"}
      setRefresh={setRefresh}
      setIsSaveDraft={setIsSaveDraft}
    >
      <main className="mb-5">
        <div className="  grid grid-cols-12 gap-5">
          <div className=" rounded-lg col-span-8 shadow-md p-5 bg-white">
            <TextFiled
              name="name"
              label="Tên danh mục"
              placeholder="Tên danh mục"
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
                Cấp cha
              </label>
              <select
                className="w-full px-2 py-3 rounded-md bg-white border outline-none"
                name=""
                id=""
                onChange={(e) => setIsParent(e.target.value)}
              >
                <option value="0">Không</option>
                <option value="1">Có</option>
              </select>
              {isParent === "1" && (
                <div className="h-[500px] overflow-auto">
                  <CateSelected name="parent_id" data={categories}></CateSelected>
                </div>
              )}
            </div>
            <div className="">
              <label
                className="block font-semibold ms-1 mb-2 text-gray-500 mt-5"
                htmlFor=""
              >
                Hình đại diện
              </label>
              <SingleFile image={image} setImage={setImage}></SingleFile>
            </div>
          </div>
        </div>
      </main>
    </LayoutForm>
  );
};

export default NewCategory;
