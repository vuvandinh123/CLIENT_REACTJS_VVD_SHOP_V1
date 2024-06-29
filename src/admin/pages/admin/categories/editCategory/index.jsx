/* eslint-disable react/prop-types */
import { useState } from "react";
// icons
import {
  initEditCategory,
} from "../../../../data/initValueFormik";
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
  getAllCategoryAdminSelectParent,
  getCategoryById,
  updateCategory,
} from "../../../../service/Category";
import { uploadImages } from "../../../../service/Upload";
import { useNavigate, useParams } from "react-router-dom";
import { buildMenuTree } from "../../../../../helpers/utils";
import CateSelected from "../../../../components/cateSelected";
import { extractNumberFromSlug } from "../../../../../utils";
import Loader from "../../../../components/common/Loader";

const EditCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({});
  const { slug } = useParams();
  const id = extractNumberFromSlug(slug);
  // init state
  const [refresh, setRefresh] = useState(false);
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [isParent, setIsParent] = useState(0);
  // Lấy tất cả danh mục
  useApiCall(async () => {
    const [res1, res2] = await Promise.all([
      getAllCategoryAdminSelectParent(),
      getCategoryById(id),
    ]);
    setCategories(buildMenuTree(res1.data, 0));
    setData(res2.data);
    setImage(res2.data?.thumbnail);
    setLoading(false);
    if (res2.data?.parent_id != 0) {
      setIsParent("1");
    }
  }, [refresh]);

  const fnSave = async (data) => {
    const res = await updateCategory(id, data);
    if (res.status === 200) {
      toast.success("Sửa danh mục thành công");
      navigate("/admin/categories");
    }
  };
  // submit form
  const handleSubmit = async (values) => {
    if (!Number(isParent)) {
      values.parent_id = 0;
    }
    // check image
    if (!image) {
      toast.error("Vui lòng chọn ảnh đại diện");
      return;
    }
    setLoading(true);
    // upload image
    try {
      if (typeof image === "string") {
        values.thumbnail = image;
      } else {
        const files = await uploadImages([image]);
        values.thumbnail = files.data[0]?.url;
      }
      if (isSaveDraft) {
        fnSave({ ...values, is_active: 1 });
      } else {
        fnSave({ ...values, is_active: 2 });
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi, xin vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <LayoutForm
      title="Sửa danh mục"
      initValues={initEditCategory(data)}
      isLoading={loading}
      handleSubmit={handleSubmit}
      validateSchema={categorySchema}
      linkBack={"/admin/categories"}
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
                value={isParent}
                onChange={(e) => setIsParent(e.target.value)}
              >
                <option value="0">Không</option>
                <option value="1">Có</option>
              </select>
              {isParent === "1" && (
                <div className="h-[500px] overflow-auto">
                  <CateSelected
                    name="parent_id"
                    data={categories}
                  ></CateSelected>
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

export default EditCategory;
