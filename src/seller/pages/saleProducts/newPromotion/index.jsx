/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// icons

import { FaAngleLeft } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import PageHeader from "../../../components/common/PageHeader";
import { initNewPromotion } from "../../../data/initValueFormik";
import SubmitButton from "../../products/components/SubmitButton";
import FormPromotion from "./components/FormPromotion";
import AppliesTo from "./components/AppliesTo";
import toast from "react-hot-toast";
import { createPromotion } from "../../../service/Promotion";
import { promotionSchema } from "../../../data/schema";

const ModalAddPromotion = () => {
  const [refresh, setRefresh] = useState(false);
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const [productIds, setProductIds] = useState([]);
  const navigate = useNavigate();
  const postCreate = async (data, productIds) => {
    const res = await createPromotion({ ...data, productIds });
    if (res.status === 201) {
      toast.success("Thêm khuyến mãi thành công");
      navigate("/seller/sale-products");
      setRefresh(!refresh);
      return;
    }
  };
  const handleSubmit = async (values) => {
    // formath giá
    if (productIds.length === 0) {
      toast.error("Vui lòng chọn sản phẩm");
      return;
    }
    if (isSaveDraft) {
      postCreate({ ...values, is_active: 1 }, productIds);
    } else {
      postCreate({ ...values, is_active: 2 }, productIds);
    }
  };
  const { t } = useTranslation();

  return (
    <div>
      {/* {isLoading && <Loader />} */}
      <PageHeader
        title={"Thêm khuyến mãi cho sản phẩm"}
        setRefresh={setRefresh}
      ></PageHeader>
      <Formik
        initialValues={initNewPromotion}
        validationSchema={promotionSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <div className=" mt-3 flex items-center justify-between gap-2">
            <div>
              <Link
                to={"/admin/sale-products"}
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
            <FormPromotion
              productIds={productIds}
              setProductIds={setProductIds}
            ></FormPromotion>
            <AppliesTo
              productIds={productIds}
              setProductIds={setProductIds}
            ></AppliesTo>
          </div>
          {/* submit */}
          <SubmitButton setIsSaveDraft={setIsSaveDraft}></SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ModalAddPromotion;
