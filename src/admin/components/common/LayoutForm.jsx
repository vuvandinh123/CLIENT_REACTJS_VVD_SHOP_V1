/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
// icons
import { FaAngleLeft } from "react-icons/fa6";
// components
import Loader from "./Loader";
import { Link } from "react-router-dom";
import PageHeader from "./PageHeader";
import SubmitButton from "./SubmitButton";

const LayoutForm = (props) => {
  const {
    children,
    handleSubmit,
    isLoading,
    setRefresh,
    setIsSaveDraft,
    initValues,
    validateSchema,
    linkBack,
    title,
  } = props;
  return (
    <div>
      {isLoading && <Loader />}
      <PageHeader title={title} setRefresh={setRefresh}></PageHeader>
      <Formik
        initialValues={initValues}
        validationSchema={validateSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <div className=" mt-3 flex items-center justify-between gap-2">
            <div>
              <Link
                to={linkBack || "#"}
                className="flex ms-3 px-2 py-2 hover:text-gray-900 hover:underline text-gray-600 items-center gap-2  "
              >
                <FaAngleLeft></FaAngleLeft> Quay lại
              </Link>
            </div>
            {/* Submit */}
            <SubmitButton setIsSaveDraft={setIsSaveDraft}></SubmitButton>
          </div>
          {/* content */}
          <div className="mt-5 ">{children}</div>
          {/* submit */}
          <div className="flex justify-end">
            <SubmitButton setIsSaveDraft={setIsSaveDraft}></SubmitButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LayoutForm;
