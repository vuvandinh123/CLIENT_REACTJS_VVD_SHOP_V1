// lib
import { Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
// components
import DiscountCode from "./DiscountCode";
import AppliesTo from "./AppliesTo";
import DateTime from "./DateTime";
import Summary from "./Summary";
import PageHeader from "../../../components/common/PageHeader";
import Loader from "../../../components/common/Loader";
import SubmitButton from "./SubmitButton";
import {
  createDiscount,
  getDiscountByIdOnShop,
  updateDiscount,
} from "../../../service/Discount";
// schame
import { initDiscount, initDiscountNew } from "../../../data/initValueFormik";
import { discountSchema } from "../../../data/schema";
import { useApiCall } from "../../../../hooks";

const EditDiscount = () => {
  const [productIds, setProductIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useApiCall(async () => {
    const response = await getDiscountByIdOnShop(id);
    console.log(response);
    setProductIds(() => response.data.products.map((item) => item.id));
    return response.data;
  });
  // Thêm dữ liệu
  const postAPi = async (id, values) => {
    if (values.applies_to === "specific") {
      values.productIds = productIds;
    }
    setIsLoading(true);
    const res = await updateDiscount(id, values);
    if (res.status === 200) {
      toast("Discount updated", { type: "success" });
      navigate("/admin/discounts");
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  const handleSubmit = async (values) => {
    if (isSaveDraft) {
      postAPi(id, { ...values, is_active: 1 });
    } else {
      postAPi(id, { ...values, is_active: 2 });
    }
  };
  if (loading) return <Loader></Loader>;
  return (
    <div className="mt-5">
      {/* Loading */}
      {isLoading && <Loader></Loader>}
      {/* Page Header */}
      <PageHeader
        title={"Thêm mới mã giảm giá"}
        setRefresh={setRefresh}
        refresh={refresh}
      ></PageHeader>
      {/* content */}
      <div>
        <div>
          <Formik
            initialValues={initDiscountNew(data)}
            validationSchema={discountSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <div className=" mt-3 flex items-center justify-between gap-2">
                <div>
                  <Link
                    to={"/admin/products"}
                    className="flex ms-3 px-2 py-2 hover:text-gray-900 hover:underline text-gray-600 items-center gap-2  "
                  >
                    <FaAngleLeft></FaAngleLeft> Quay lai
                  </Link>
                </div>
                {/* Submit */}
                <SubmitButton setIsSaveDraft={setIsSaveDraft}></SubmitButton>
              </div>
              <div className="mt-5 grid h-full grid-cols-12 gap-5">
                <div className="col-span-9 grid gap-5">
                  <DiscountCode></DiscountCode>
                  <AppliesTo
                    productIds={productIds}
                    setProductIds={setProductIds}
                    products={data.products}
                  ></AppliesTo>
                  <DateTime></DateTime>
                </div>
                <div className="col-span-3 grid gap-5">
                  <Summary></Summary>
                </div>
              </div>
              <div className=" flex items-center justify-end">
                <SubmitButton setIsSaveDraft={setIsSaveDraft}></SubmitButton>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditDiscount;
