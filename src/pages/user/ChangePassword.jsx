import { Form, Formik } from "formik";
import InputField from "../../components/field/InputField";
import toast from "react-hot-toast";
import { changePasswordByUser } from "../../service/User";
import Swal from "sweetalert2";
import { isObjectEmptyOrNull } from "../../helpers/utils";

const ChangePassword = () => {
  const handleSubmit = async (values,  formikBag) => {
    if (isObjectEmptyOrNull(values)) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (values.password_new !== values.password_new_confirm) {
      toast.error("Xác nhận mật khẩu không khớp");
      return;
    }
    try {
      const res = await changePasswordByUser(values);
      if (res.status === 200) {
        formikBag.resetForm();
        Swal.fire({
          title: "Đổi mật khẩu thành công",
          text: "Mật khẩu này sẽ dùng đăng nhập cho lần tiếp theo",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Đổi mật khẩu thất bại",
        text: "Mật khẩu của bạn không đúng",
        icon: "error",
      });
    }
  };
  return (
    <>
      <section className=" bg-white p-5 rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Đổi mật khẩu
        </h2>
        <Formik
          initialValues={{
            password_old: "",
            password_new: "",
            password_new_confirm: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="">
              <div className="mt-3">
                <InputField
                  type="password"
                  name="password_old"
                  placeholder="Mật khẩu hiện tại"
                  label="Mật khẩu"
                ></InputField>
              </div>
              <div className="mt-3">
                <InputField
                  name="password_new"
                  label="Mật khẩu mới"
                  placeholder="Mật khẩu mới"
                  type="password"
                ></InputField>
              </div>
              <div className="mt-3">
                <InputField
                  name="password_new_confirm"
                  label="Xác nhận mật khẩu"
                  placeholder="Xác nhận mật khẩu"
                  type="password"
                ></InputField>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none "
              >
                Xác nhận
              </button>
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
};

export default ChangePassword;
