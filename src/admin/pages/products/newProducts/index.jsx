// lib
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
// components
import Media from "./components/Media";
import SearchEngine from "./components/SearchEngine";
import Category from "./components/Category";
import General from "./components/General";
import PageHeader from "../../../components/common/PageHeader";
import Variant from "../components/Variant";
// hooks
import { useApiCall } from "../../../../hooks";
// service
import { getAllBrandByCategory } from "../../../service/Brand";
import {
  getAllCategoryAdminSelect,
} from "../../../service/Category";
import { uploadImages } from "../../../service/Upload";
import { addProduct } from "../../../service/Product";
// utils
import { checkSpecs, convertToFirestoreData } from "../../../../utils";
import Loader from "../../../components/common/Loader";
// init data
import { initNewProduct } from "../../../data/initValueFormik";
import { productSchema } from "../../../data/schema";
import { FaAngleLeft } from "react-icons/fa6";
import SubmitButton from "../components/SubmitButton";
import { buildMenuTree } from "../../../../helpers/utils";

const NewProducts = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // trạng thái
  const [refresh, setRefresh] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [spec, setSpec] = useState([{ name: "", value: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [option, setOption] = useState([]);
  const [variant, setVariant] = useState([]);
  const [typeProduct, setTypeProduct] = useState("single");
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const [categories, setCategories] = useState([]);
  // Lấy tất cả danh mục
  useApiCall(async () => {
    const res = await getAllCategoryAdminSelect();
    setCategories(buildMenuTree(res.data, 0));
  }, [refresh]);
  // Lấy tất cá thương hiệu theo danh mục
  const { data: brands } = useApiCall(async () => {
    if (!categoryId) return [];
    const response = await getAllBrandByCategory(categoryId);
    return response.data;
  }, [categoryId, refresh]);

  // function submit
  const fnSubmit = async (values) => {
    setIsLoading(true);
    const newOption = [...option];
    newOption.push(variant);
    const newVariant = convertToFirestoreData(newOption);
    try {
      if (!images || images.length === 0) {
        toast("Please upload at least one image", { type: "error" });
        return;
      }
      const files = await uploadImages(images);
      if (files.data.length === 0) {
        toast("Something went wrong", { type: "error" });
        return;
      }
      const product = { ...values };
      product.files = files.data;
      product.variant = newVariant;
      product.spec = checkSpecs(spec);
      product.thumbnail = files.data[0].url;
      const NewProduct = await addProduct(product);
      if (NewProduct) {
        toast("Thêm sản phẩm thành công", { type: "success" });
        navigate("/admin/products");
      }
    } catch (e) {
      console.log(e);
      toast("Something went wrong", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  // kiểm tra lưu nháp và lưu hiện thị 1 nháp 2 hiển thị
  const handleSubmit = async (values) => {
    if (isSaveDraft) {
      fnSubmit({ ...values, is_active: 1 });
    } else {
      fnSubmit({ ...values, is_active: 2 });
    }
  };
  return (
    <div>
      {isLoading && <Loader />}
      <PageHeader
        title={t("admin.newProduct.title")}
        setRefresh={setRefresh}
      ></PageHeader>
      <Formik
        initialValues={initNewProduct}
        validationSchema={productSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <div className=" mt-3 flex items-center justify-between gap-2">
            <div>
              <Link
                to={"/admin/products"}
                className="flex ms-3 px-2 py-2 hover:text-gray-900 hover:underline text-gray-600 items-center gap-2  "
              >
                <FaAngleLeft></FaAngleLeft> {t("admin.editProduct.back")}
              </Link>
            </div>
            {/* Submit */}
            <SubmitButton setIsSaveDraft={setIsSaveDraft}></SubmitButton>
          </div>
          <div className="mt-5 grid h-full grid-cols-12 gap-5">
            <div className="col-span-9 grid gap-5">
              <General />
              <Media images={images} setImages={setImages} />
              <SearchEngine />
              <Variant
                variant={variant}
                setVariant={setVariant}
                option={option}
                setOption={setOption}
              />
            </div>
            {/* siderbar product */}
            <div className="col-span-3 grid gap-5">
              <Category
                setCategoryId={setCategoryId}
                spec={spec}
                setSpec={setSpec}
                brands={brands}
                categories={categories}
                typeProduct={typeProduct}
                setTypeProduct={setTypeProduct}
              />
            </div>
          </div>
          {/* submit */}
          <SubmitButton setIsSaveDraft={setIsSaveDraft}></SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default NewProducts;
