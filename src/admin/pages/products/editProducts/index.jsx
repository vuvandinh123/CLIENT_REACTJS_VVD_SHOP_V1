// lib
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";

import { Link, useNavigate, useParams } from "react-router-dom";
// components

import Variant from "../components/Variant";
import General from "./components/General";
import Media from "./components/Media";
import SearchEngine from "./components/SearchEngine";
import Category from "./components/Category";
import PageHeader from "../../../components/common/PageHeader";
import SubmitButton from "../components/SubmitButton";
import Loader from "../../../components/common/Loader";

// hooks
import { useApiCall } from "../../../../hooks";
// service
import {
  getAllCategoryAdminSelect,
} from "../../../service/Category";
import { getAllBrandByCategory } from "../../../service/Brand";
import { uploadImages } from "../../../service/Upload";
import {
  deleteImages,
  editProduct,
  getImagesById,
  getProductById,
} from "../../../service/Product";
import {
  checkSpecs,
  convertToFirestoreData,
  extractNumberFromSlug,
} from "../../../../utils";
import { FaAngleLeft } from "react-icons/fa6";
// init data
import { initProductEdit } from "../../../data/initValueFormik";
import { productSchema } from "../../../data/schema";
import { buildMenuTree } from "../../../../helpers/utils";
const EditProducts = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { slug } = useParams();
  // lấy id product trong url
  const id = extractNumberFromSlug(slug);
  // trạng thái
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const [imagesDelete, setImagesDelete] = useState([]);
  const [spec, setSpec] = useState([{ name: "", value: "" }]);
  const [images, setImages] = useState([]);
  const [option, setOption] = useState([]);
  const [variant, setVariant] = useState([]);
  const [typeProduct, setTypeProduct] = useState("single");
  const { data, loading } = useApiCall(
    async () => {
      const response = await getProductById(id);
      const image = await getImagesById(id);
      if (response.data.spec.length > 0) {
        setSpec(() => {
          return response.data?.spec?.map((item) => {
            return {
              name: item.name,
              value: item.value,
            };
          });
        });
      }
      if (response.data?.variant?.productVariants) {
        setVariant(response.data?.variant?.productVariants);
      }
      if (response.data?.variant?.variant) {
        setOption(response.data?.variant?.variant);
      }
      setImages(image.data);
      return response.data;
    },
    [refresh],
    {}
  );
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
  }, [categoryId]);
  // xóa hinh ảnh
  const imageDeletes = async () => {
    try {
      await deleteImages(imagesDelete);
    } catch (error) {
      console.log(error);
    }
  };
  const fnSubmit = async (values) => {
    setIsLoading(true);
    const newOption = [...option];
    newOption.push(variant);
    const newVariant = convertToFirestoreData(newOption);
    const newImage = images.filter(
      (image) => Object.prototype.toString.call(image) === "[object File]"
    );
    if (imagesDelete.length > 0) {
      await imageDeletes();
    }
    try {
      if (!images || images.length === 0) {
        toast("Please upload at least one image", { type: "error" });
        return;
      }

      const files = await uploadImages(newImage);
      const product = { ...values };
      product.files = files.data;
      product.spec = checkSpecs(spec);
      product.variant = newVariant;
      product.thumbnail = files.data[0]?.url
        ? files.data[0]?.url
        : images[0].image_path;
      const editProduct2 = await editProduct(id, product);
      if (editProduct2) {
        toast("Cập nhật thành công", { type: "success" });
        navigate("/admin/products");
      }
    } catch (e) {
      console.log(e);
      toast("Something went wrong", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  // cập nhật sản phẩm
  const handleSubmit = async (values) => {
    if (isSaveDraft) {
      fnSubmit({ ...values, is_active: 1 });
    } else {
      fnSubmit({ ...values, is_active: 2 });
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {isLoading && <Loader></Loader>}
      <PageHeader
        title={t("admin.newProduct.title")}
        setRefresh={setRefresh}
      ></PageHeader>

      <Formik
        initialValues={initProductEdit(data)}
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
              <Media
                images={images}
                setImages={setImages}
                imagesDelete={imagesDelete}
                setImagesDelete={setImagesDelete}
              />
              <SearchEngine />
              <Variant
                variant={variant}
                setVariant={setVariant}
                option={option}
                setOption={setOption}
              />
            </div>
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
          <SubmitButton setIsSaveDraft={setIsSaveDraft}></SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProducts;
