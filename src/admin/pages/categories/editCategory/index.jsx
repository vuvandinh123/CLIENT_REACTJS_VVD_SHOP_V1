/* eslint-disable react/prop-types */
import { useState } from "react";
// icons
import {
  initEditCategory,
  initNewCategory,
} from "../../../data/initValueFormik";
// components
import LayoutForm from "../../../components/common/LayoutForm";
// schame
import { categorySchema } from "../../../data/schema";
import TextFiled from "../../../components/fields/TextFiled";
import TinyEditor from "../../../components/fields/TinyEditor";
import SelectField from "../../../components/fields/SelectField";
import SingleFile from "../../../components/common/SingleFile";
import toast from "react-hot-toast";
import { useApiCall } from "../../../../hooks";
import {
  createCategoryByShop,
  getAllCategoryAdminSelect,
  getCategoryIdByShop,
  updateCategoryByShop,
} from "../../../service/Category";
import { uploadImages } from "../../../service/Upload";
import { useNavigate, useParams } from "react-router-dom";
import { extractNumberFromSlug } from "../../../../utils";
import Loader from "../../../components/common/Loader";
import { deleteImages } from "../../../service/Product";

const EditCategory = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  // get id from slug
  const id = extractNumberFromSlug(slug);
  // init state
  const [refresh, setRefresh] = useState(false);
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageDelete, setImageDelete] = useState([]);
  // fetch api
  const { data, loading: loading2 } = useApiCall(
    async () => {
      try {
        const [res, res2] = await Promise.all([
          getAllCategoryAdminSelect(),
          getCategoryIdByShop(id),
        ]);
        setImage(res2.data?.thumbnail);
        return {
          listCategory: res.data,
          category: res2.data,
        };
      } catch (error) {
        console.log(error);
      }
    },
    [refresh],
    {}
  );
  const fnSaveUpdate = async (data) => {
    const res = await updateCategoryByShop(id,data);
    if (res.status === 200) {
      toast.success("Cập nhật danh mục thành công");
      navigate("/admin/categories");
    }
  };
  // submit form
  const handleSubmit = async (values) => {
    // check image
    if (!image) {
      toast.error("Please upload image");
      return;
    }
    setLoading(true);
    try {
      let files = [];
      if (imageDelete.length > 0) {
        const deletePromise = deleteImages([imageDelete]);
        const uploadPromise = uploadImages([image]);
        // eslint-disable-next-line no-unused-vars
        const [deleted, uploaded] = await Promise.all([deletePromise, uploadPromise]);
        files = uploaded.data;
      }
      values.thumbnail = files.length > 0 && files[0] ? files[0].url : image;
      if (isSaveDraft) {
        fnSaveUpdate({ ...values, is_active: 1 });
      } else {
        fnSaveUpdate({ ...values, is_active: 2 });
      }
    } catch (error) {
      console.log(error);
      toast.error("ĐãXẢy ra lỗi, xin vui lọc thử lại");
    } finally {
      setLoading(false);
    }
  };
  // loading
  if (loading2) return <Loader></Loader>;
  console.log(data?.category);
  return (
    <LayoutForm
      title="Thêm danh mục"
      initValues={initEditCategory(data?.category)}
      isLoading={loading}
      handleSubmit={handleSubmit}
      validateSchema={categorySchema}
      linkBack={"/admin/categories"}
      setRefresh={setRefresh}
      setIsSaveDraft={setIsSaveDraft}
    >
      <main className="mb-5">
        <div className="  grid grid-cols-12 gap-5">
          <div className=" rounded-lg col-span-9 shadow-md p-5 bg-white">
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
          <div className="col-span-3  rounded-lg shadow-md bg-white p-5">
            <SelectField
              label={"Chọn danh mục cha"}
              data={data?.listCategory}
              name="parent_id"
            ></SelectField>
            <div>
              <label
                className="block font-semibold ms-1 mb-2 text-gray-500 mt-5"
                htmlFor=""
              >
                Hình đại diện
              </label>
              <SingleFile
                imageDelete={imageDelete}
                setImageDelete={setImageDelete}
                image={image}
                setImage={setImage}
              ></SingleFile>
            </div>
          </div>
        </div>
      </main>
    </LayoutForm>
  );
};

export default EditCategory;
