/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// icons

import { FaAngleLeft } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import PageHeader from "../../../components/common/PageHeader";
import { initNewPromotion } from "../../../data/initValueFormik";
import AppliesTo from "./components/AppliesTo";
import toast from "react-hot-toast";
import { createInventoryLog } from "../../../service/InventoryLogs";
import { RiDraftLine } from "react-icons/ri";

const NewInventory = () => {
  const [refresh, setRefresh] = useState(false);
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const [listProductCheck, setListProductCheck] = useState([]);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    // formath giá
    const list = listProductCheck.map((item) => ({
      product_id: item.id,
      import_price: item.import_price,
      quantity: item.quantity,
      variant: item.variant || {},
    }));
    if (list.length === 0) {
      toast.error("Vui lòng chọn sản phẩm");
      return;
    }
    for (const item of list) {
      if (item.import_price === "" || item.quantity === "") {
        toast.error("Vui lòng nhập đầy đủ thông tin");
        return;
      }
    }
    const data = {
      note: note,
      product: list,
    };
    const res = await createInventoryLog(data);
    if (res.status === 201) {
      toast.success("Nhập hàng thành công");
      navigate("/admin/inventory");
      return;
    }
  };
  const { t } = useTranslation();

  return (
    <div>
      {/* {isLoading && <Loader />} */}
      <PageHeader
        title={"Nhập thêm sản phẩm"}
        setRefresh={setRefresh}
      ></PageHeader>
      <Formik
        initialValues={initNewPromotion}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <div className=" mt-3 flex items-center justify-between gap-2">
            <div>
              <Link
                to={"/admin/inventory"}
                className="flex ms-3 px-2 py-2 hover:text-gray-900 hover:underline text-gray-600 items-center gap-2  "
              >
                <FaAngleLeft></FaAngleLeft> {t("admin.editProduct.back")}
              </Link>
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="rounded-md flex font-bold items-center gap-2 bg-green-500 px-5 py-2 text-white hover:bg-green-600"
            >
              <RiDraftLine></RiDraftLine> {t("admin.editProduct.submit")}
            </button>
          </div>
          {/* content */}
          <div className="mt-5 ">
            <AppliesTo
              listProductCheck={listProductCheck}
              setListProductCheck={setListProductCheck}
            ></AppliesTo>
            <div className="my-5 shadow-md bg-white rounded-md p-5">
              <label
                htmlFor=""
                className="block mb-2 font-semibold text-gray-600"
              >
                Ghi chú{" "}
                <span className="text-[12px] text-gray-400">(option)</span>
              </label>
              <textarea
                name="note"
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú"
                rows={3}
                className="p-3 max-h-[150px] rounded-md border outline-blue-500 w-full"
                id=""
              ></textarea>
            </div>
          </div>
          {/* submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md flex font-bold items-center gap-2 bg-green-500 px-5 py-2 text-white hover:bg-green-600"
            >
              <RiDraftLine></RiDraftLine> {t("admin.editProduct.submit")}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewInventory;
