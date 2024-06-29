/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// icons

import { FaAngleLeft } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import PageHeader from "../../../../components/common/PageHeader";
import {
  initEditPromotion,
  initNewPromotion,
} from "../../../../data/initValueFormik";
import SubmitButton from "../../products/components/SubmitButton";
import FormPromotion from "./components/FormPromotion";
import AppliesTo from "./components/AppliesTo";
import toast from "react-hot-toast";
import {
  createPromotion,
  getPromotionById,
  updatePromotion,
} from "../../../../service/Promotion";
import { promotionSchema } from "../../../../data/schema";
import { useApiCall } from "../../../../../hooks";
import Loader from "../../../../components/common/Loader";

const ModalAddPromotion = () => {
  const [refresh, setRefresh] = useState(false);
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useApiCall(async () => {
    const response = await getPromotionById(id);
    return response.data;
  });
  const postUpdate = async (id, data) => {
    const res = await updatePromotion(id, data);
    if (res.status === 200) {
      toast.success("Cập nhật khuyến mãi thành công");
      navigate("/seller/sale-products");
      setRefresh(!refresh);
      return;
    }
  };
  const handleSubmit = async (values) => {
    // formath giá
    if (isSaveDraft) {
      postUpdate(id, { ...values, is_active: 1 });
    } else {
      postUpdate(id, { ...values, is_active: 2 });
    }
  };
  const { t } = useTranslation();
  if (loading) return <Loader></Loader>;
  return (
    <div>
      {/* {isLoading && <Loader />} */}
      <PageHeader
        title={"Chỉnh sửa khuyến mãi cho sản phẩm"}
        setRefresh={setRefresh}
      ></PageHeader>
      <Formik
        initialValues={initEditPromotion(data)}
        validationSchema={promotionSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <div className=" mt-3 flex items-center justify-between gap-2">
            <div>
              <Link
                to={"/seller/products"}
                className="flex ms-3 px-2 py-2 hover:text-gray-900 hover:underline text-gray-600 items-center gap-2  "
              >
                <FaAngleLeft></FaAngleLeft> {t("admin.editProduct.back")}
              </Link>
            </div>
            {/* Submit */}
            <SubmitButton setIsSaveDraft={setIsSaveDraft}></SubmitButton>
          </div>
          {/* content */}
          <div className="mt-5 ">
            <AppliesTo data={data}></AppliesTo>
            <FormPromotion></FormPromotion>
          </div>
          {/* submit */}
          <SubmitButton setIsSaveDraft={setIsSaveDraft}></SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ModalAddPromotion;
