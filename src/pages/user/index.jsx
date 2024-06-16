/* eslint-disable react/prop-types */
import LayoutUser from "./components/LayoutUser";
import { FaEdit, FaSave } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import InputField from "../../components/field/InputField";
import { useApiCall } from "../../hooks";
import { getUserByEdit, updateUser } from "../../service/User";
import { Loader } from "../../components/common";
import toast from "react-hot-toast";
import { MdCancel, MdDriveFolderUpload } from "react-icons/md";
import { uploadImages } from "../../admin/service/Upload";
import moment from "moment/moment";
import { getUrlSearchParam } from "../../utils";

const User = () => {
  const [isEdit, setEdit] = useState(true);
  const [image, setImage] = useState(null);
  const edit = getUrlSearchParam("edit");
  useEffect(() => {
    if (edit) {
      setEdit(false);
    }
  }, [edit]);
  const { data, loading } = useApiCall(
    async () => {
      const res = await getUserByEdit();
      return res.data;
    },
    [],
    {}
  );
  const handleSubmitEditUser = async (values) => {
    if (isEdit) {
      return;
    }
    const { day, month, year } = values;
    values.birthday = `${day}/${month}/${year}`;
    if (image) {
      const res = await uploadImages([image]);
      values.image = res.data[0].url;
    }
    const res = await updateUser(values);
    if (res.status === 200) {
      toast.success("Cập nhật thành công");
      setEdit(true);
    }
  };
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  if (loading)
    return (
      <LayoutUser>
        <div className="h-[600px] bg-white rounded-lg p-5">
          <Loader></Loader>
        </div>
      </LayoutUser>
    );
  return (
    <LayoutUser>
      <Formik
        initialValues={{
          gender: data.gender?.toString() || "",
          first_name: data.firstName || "",
          last_name: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          day: data.birthday?.split("/")[0] || "",
          month: data.birthday?.split("/")[1] || "",
          year: data.birthday?.split("/")[2] || "",
        }}
        onSubmit={handleSubmitEditUser}
      >
        <Form>
          <div className="bg-white shadow-md p-5 rounded-md">
            <div className="border-b flex justify-between items-center pb-5">
              <div>
                <h3 className="text-base font-bold uppercase">Hồ sơ của tôi</h3>
                <p className="text-gray-500">
                  Quản lý thông tin hồ sơ để bảo mật tài khoản
                </p>
              </div>
              <div className="flex gap-3">
                <span
                  href="#"
                  onClick={() => setEdit(!isEdit)}
                  className="-mt-2 flex items-center gap-2 text-md font-bold text-white cursor-pointer bg-yellow-500 rounded-full px-5 py-2 hover:bg-yellow-600"
                >
                  {!isEdit ? (
                    <span className="flex gap-2 items-center">
                      <MdCancel></MdCancel> Hủy
                    </span>
                  ) : (
                    <span className="flex gap-2 items-center">
                      <FaEdit></FaEdit> Sửa
                    </span>
                  )}
                </span>
                {
                  !isEdit && (
                    <button
                    type="submit"
                    className="-mt-2 flex items-center gap-2 text-md font-bold text-white cursor-pointer bg-green-500 rounded-full px-5 py-2 hover:bg-green-600"
                  >
                    <FaSave></FaSave> Lưu
                  </button>
                  )
                }
               
              </div>
            </div>
            <div>
              <div className="grid grid-cols-12">
                <div className="col-span-3">
                  <div className="w-full flex flex-col h-full justify-between p-4 bg-white">
                    <div>
                      <div className="w-full p-8 mx-2 relative flex justify-center">
                        <img
                          id="showImage"
                          className="max-w-xs rounded-md w-32 items-center border"
                          src={image ? URL.createObjectURL(image) : data.image}
                          alt
                        />
                        {isEdit ? (
                          <></>
                        ) : (
                          <label
                            htmlFor="image"
                            className="block absolute bottom-3 "
                          >
                            <MdDriveFolderUpload
                              className=" cursor-pointer text-gray-600 rounded-full shadow-sm border-dashed border-2 border-blue-500 bg-gray-100 w-10 h-10 p-2"
                              size={20}
                            ></MdDriveFolderUpload>
                            <input
                              onChange={handleChangeImage}
                              className="hidden"
                              type="file"
                              accept="image/*"
                              name="image"
                              id="image"
                            />
                          </label>
                        )}
                      </div>
                      <div>
                        {!isEdit && (
                          <p className="text-center text-gray-500">
                            Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      {" "}
                      <p className="text-gray-500 text-center">
                        Thơì gian tạo tài khoản:
                      </p>
                      <p className="text-gray-500 text-center">
                        {moment(data.created_at).format("hh:mm DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-9">
                  <div className="w-full border-l  p-4 bg-white ">
                    <div className="rounded  p-6">
                      <div className="pb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-full">
                            <InputField
                              label={"Họ Đệm"}
                              disabled={isEdit}
                              className={`rounded-md ${
                                isEdit ? "border-none !bg-gray-50" : " "
                              }`}
                              name="last_name"
                            ></InputField>
                          </div>
                          <div className="w-full">
                            <InputField
                              label={"Tên"}
                              disabled={isEdit}
                              className={`rounded-md ${
                                isEdit ? "border-none !bg-gray-50" : " "
                              }`}
                              name="first_name"
                            ></InputField>
                          </div>
                        </div>
                      </div>
                      <div className="pb-4">
                        <InputField
                          label={"Email"}
                          disabled
                          type={"email"}
                          className={`rounded-md ${
                            isEdit
                              ? "border-none !bg-gray-50"
                              : " cursor-not-allowed "
                          }`}
                          name="email"
                        ></InputField>
                      </div>
                      <div className="pb-4">
                        <InputField
                          label={"Số điện thoại"}
                          disabled={isEdit}
                          type={"number"}
                          className={`rounded-md ${
                            isEdit ? "border-none !bg-gray-50" : " "
                          }`}
                          name="phone"
                        ></InputField>
                      </div>
                      <div className="pb-4 ">
                        <label
                          htmlFor=""
                          className="text-gray-700 mb-3 block font-semibold"
                        >
                          Giới tính
                        </label>
                        <div className="flex items-center gap-5">
                          <label className="flex gap-3" htmlFor="gender-nam">
                            <Field
                              disabled={isEdit}
                              value="1"
                              type={"radio"}
                              className="w-5 h-5"
                              id="gender-nam"
                              name="gender"
                            ></Field>
                            Nam
                          </label>
                          <label className="flex gap-3" htmlFor="gender-nu">
                            <Field
                              disabled={isEdit}
                              type={"radio"}
                              value="0"
                              className="w-5 h-5"
                              id="gender-nu"
                              name="gender"
                            ></Field>
                            Nữ
                          </label>
                          <label className="flex gap-3" htmlFor="gender-khac">
                            <Field
                              disabled={isEdit}
                              type={"radio"}
                              value="2"
                              className="w-5 h-5"
                              id="gender-khac"
                              name="gender"
                            ></Field>
                            Khác
                          </label>
                        </div>
                      </div>
                      <div className="pb-4">
                        <label
                          htmlFor="birthday"
                          className="mb-3 block text-gray-700 font-semibold"
                        >
                          Ngày tháng năm sinh
                        </label>
                        <div className="">
                          <div className="flex items-center gap-5">
                            <Field
                              as="select"
                              disabled={isEdit}
                              className={` outline-blue-500 w-[100px] border  py-3 text-center bg-gray-50 rounded-md ${
                                isEdit ? "border-none !bg-gray-50" : " "
                              }`}
                              name="day"
                            >
                              {Array(31)
                                .fill(0)
                                .map((_, index) => (
                                  <option key={index} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                            </Field>
                            <Field
                              as="select"
                              disabled={isEdit}
                              className={` outline-blue-500 w-[100px] border  py-3 text-center bg-gray-50 rounded-md ${
                                isEdit ? "border-none !bg-gray-50" : " "
                              }`}
                              name="month"
                            >
                              {Array(12)
                                .fill(0)
                                .map((_, index) => (
                                  <option key={index} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                            </Field>
                            <Field
                              as="select"
                              name="year"
                              className={` outline-blue-500 w-[100px] border  py-3 text-center bg-gray-50 rounded-md ${
                                isEdit ? "border-none !bg-gray-50" : " "
                              }`}
                              id="year"
                            >
                              {Array(100)
                                .fill(0)
                                .map((_, index) => (
                                  <option key={index} value={2024 - index}>
                                    {2024 - index}
                                  </option>
                                ))}
                            </Field>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </LayoutUser>
  );
};

export default User;
