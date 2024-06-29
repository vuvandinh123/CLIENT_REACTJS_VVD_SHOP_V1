/* eslint-disable react/prop-types */
import { useState } from "react";
// icons
import { initNewCategory } from "../../../data/initValueFormik";
// components
import LayoutForm from "../../../components/common/LayoutForm";
// schame
import { categorySchema } from "../../../data/schema";
import TextFiled from "../../../components/fields/TextFiled";
import TinyEditor from "../../../components/fields/TinyEditor";
import SelectField from "../../../components/fields/SelectField";
import MultipleFile from "../../../components/common/MultipleFile";
import SingleFile from "../../../components/common/SingleFile";
import toast from "react-hot-toast";
import { useApiCall } from "../../../../hooks";
import {
  createCategoryByShop,
  getAllCategoryAdminSelect,
  getAllCategoryWithParentId,
} from "../../../service/Category";
import { uploadImages } from "../../../service/Upload";
import { useNavigate } from "react-router-dom";
import CateItem from "./components/CateItem";
import { buildMenuTree } from "../../../../helpers/utils";

const NewCategory = () => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState({});

  const toggleOpen = (id) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // init state
  const [refresh, setRefresh] = useState(false);
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [cate, setCate] = useState([]);
  const [listId, setListId] = useState([{ parent_id: 0 }]);
  // fetch api
  const { data: listCategory } = useApiCall(
    async () => {
      const res = await getAllCategoryAdminSelect();

      setCate(buildMenuTree(res.data, 0));
      return res.data;
    },
    [refresh],
    []
  );
  const fnSaveCreate = async (data) => {
    const res = await createCategoryByShop(data);
    if (res.status === 201) {
      toast.success("Tạo danh mục thành công");
      navigate("/seller/categories");
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
  const handleChangeCategory = (e, index) => {
    setCate(cate.slice(0, index));
    console.log(cate);
    const fetch = async () => {
      const res = await getAllCategoryWithParentId(e.target.value);
      const { data } = res;
      if (data.length > 0) {
        setCate([...cate, [...data]]);
      }
    };
    fetch();
  };
  console.log(cate);
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
            <div>
              <div className="h-[500px] overflow-auto">
                <ul>
                  {cate.map((item, index) => (
                    <CateItem
                      key={item.id}
                      item={item}
                      index={index}
                      isOpen={openItems[index] || false}
                      toggleOpen={toggleOpen}
                    />
                  ))}
                </ul>
              </div>
            </div>
            {/* <SelectField
              label={"Chọn danh mục cha"}
              data={listCategory}
              name="parent_id"
            ></SelectField> */}
            <div>
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
