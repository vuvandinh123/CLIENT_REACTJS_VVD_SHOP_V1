import { useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import { Field, Form, Formik } from "formik";
import TextFiled from "../../../components/fields/TextFiled";
import NumberFiled from "../../../components/fields/NumberFiled";
import NotImage from "../../../../assets/imageNotFound.png";
import { initProfile } from "../../../data/initValueFormik";
import useApiCall from "../../../../hooks/useApiCall";
import { getProvider } from "../../../service/Address";
import SelectField2 from "../../../components/fields/SelectField2";
import { getShopByUserId } from "../../../service/Shop";
import { getCookieAuth } from "../../../../utils";
import Loader from "../../../components/common/Loader";
const ProfileShop = () => {
  const [image, setImage] = useState(null);
  const [imageDelete, setImageDelete] = useState([]);
  const [provider, setProvider] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [shop, setShop] = useState({});
  const { loading } = useApiCall(async () => {
    const { userId } = getCookieAuth();
    const res = await getProvider();
    const res2 = await getShopByUserId(userId);
    setProvider(Object.values(res));
    setShop(res2.data);
    setImage(res2.data?.shop_logo);
    return;
  });
  const handleSubmit = (values) => {
    console.log(values);
  };
  if (loading) return <Loader></Loader>;
  return (
    <main className="flex-1 md:p-0 lg:pt-8 lg:px-8  flex flex-col">
      <PageHeader title="Cài đặt"></PageHeader>
      <section className="bg-cream-lighter bg-white rounded-md p-10 mt-5 shadow">
        <div className="md:flex">
          <h2 className="md:w-1/3 font-bold uppercase tracking-wide text-sm sm:text-lg mb-6">
            Quản lý thông tin cửa hàng
          </h2>
        </div>
        <Formik
          initialValues={initProfile(shop)}
          // validationSchema={discountSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form>
            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="uppercase tracking-wide text-sm">
                  Cửa hàng
                </legend>
                <p className="text-xs font-light text-red">
                  Các thông tin về của hàng của bạn
                </p>
                <div className="mt-10 flex justify-center items-center">
                  <div>
                    <label
                      title="Thay đổi ảnh đại diện"
                      className="w-[200px] cursor-pointer block h-[200px] overflow-hidden rounded-full border-dotted border-[5px]"
                    >
                      <img
                        onError={(e) => {
                          e.target.src = NotImage;
                        }}
                        src={
                          typeof image === "string"
                            ? image
                            : image && URL.createObjectURL(image)
                        }
                        alt=""
                      />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>
                    <label htmlFor="" className="block mt-5 text-center">
                      Ảnh đại diện
                    </label>
                  </div>
                </div>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="flex justify-between mb-4 gap-5 grid-cols-2">
                  <div className="basis-1/2">
                    <TextFiled
                      label={"Tên cửa hàng"}
                      name="shop_name"
                      className={"p-3 px-4"}
                      placeholder={"VVD SHOP"}
                    ></TextFiled>
                  </div>
                  <div className="basis-1/2">
                    <TextFiled
                      label={"Tên tài khoản"}
                      disabled
                      name="shop_username"
                      className={"p-3 px-4"}
                      placeholder={"vvdshop"}
                    ></TextFiled>
                  </div>
                </div>

                <div className="mb-4">
                  <NumberFiled
                    label={"Số điện thoại"}
                    name="shop_phone"
                    locaPosition="left"
                    placeholder="0123-456-789"
                    location={"+84"}
                  ></NumberFiled>
                </div>
                <div className="mb-4">
                  <TextFiled
                    label={"Website"}
                    required={false}
                    name="shop_website"
                    className={"p-3 px-4"}
                    placeholder={"https://"}
                  ></TextFiled>
                </div>
                <div className="mb-4">
                  <TextFiled
                    label={"Email"}
                    name="shop_email"
                    className={"p-3 px-4"}
                    placeholder={"shopname@example.com"}
                  ></TextFiled>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor=""
                    className="block mb-2 text-gray-500 font-semibold"
                  >
                    Giới thiệu chung về cửa hàng
                  </label>
                  <Field
                    as="textarea"
                    className="w-full outline-blue-500 border rounded-lg shadow-inner p-4 "
                    placeholder="Enter some text..."
                    rows={6}
                    name="shop_description"
                    defaultValue={""}
                  />
                  <span className="text-xs mb-4 font-thin">
                    Các mô tả về cửa hàng
                  </span>
                </div>
              </div>
            </div>
            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="uppercase tracking-wide text-sm">
                  Vị trí
                </legend>
                <p className="text-xs font-light text-red">
                  Vị trí của cửa hàng
                </p>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <SelectField2
                      name="shop_country"
                      className={"py-4 px-3"}
                      label={"Quốc gia"}
                    >
                      <option selected value="việt nam">
                        Việt Nam
                      </option>
                    </SelectField2>
                  </div>
                  <div className="md:flex-1 md:pl-3">
                    <SelectField2
                      name="shop_province"
                      className={"py-4 px-3"}
                      label={"Tỉnh / Thành phố"}
                    >
                      {provider.map((item) => (
                        <option value={item.name} key={item.code}>
                          ({item.code}) {item.name}
                        </option>
                      ))}
                    </SelectField2>
                    <span className="text-xs mb-4 font-thin">
                      We lied, this isn't required.
                    </span>
                  </div>
                </div>
                <div className="md:flex mb-4">
                  <div className="md:flex-1 ">
                    <TextFiled
                      className={"py-4 px-3"}
                      label={"Địa chỉ "}
                      name="shop_address"
                      placeholder="12/1 Đường số 8 Linh Xuân"
                    ></TextFiled>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="uppercase tracking-wide text-sm">
                  Liên hệ
                </legend>
                <p className="text-xs font-light text-red">
                  Các thông tin chủ cửa hàng
                </p>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="flex justify-between mb-4 gap-5 grid-cols-2">
                  <div className="basis-1/2">
                    <TextFiled
                      label={"Họ đệm"}
                      name="user_last_name"
                      className={"p-3 px-4"}
                      placeholder={"Họ đệm"}
                    ></TextFiled>
                  </div>
                  <div className="basis-1/2">
                    <TextFiled
                      label={"Tên"}
                      name="user_first_name"
                      className={"p-3 px-4"}
                      placeholder={"Tên"}
                    ></TextFiled>
                  </div>
                </div>

                <div className="mb-4">
                  <NumberFiled
                    label={"Số điện thoại"}
                    name="user_phone"
                    locaPosition="left"
                    placeholder="0123-456-789"
                    location={"+84"}
                  ></NumberFiled>
                </div>
                <div className="mb-4">
                  <NumberFiled
                    label={"Căn cước công dân"}
                    name="shop_cccd"
                    disabled
                    // locaPosition="left"
                    placeholder="068 123 456 789"
                    // location={"+84"}
                  ></NumberFiled>
                </div>
                <div className="mb-4">
                  <TextFiled
                    label={"Email"}
                    name="user_email"
                    className={"p-3 px-4"}
                    placeholder={"vudinh@example.com"}
                  ></TextFiled>
                </div>
              </div>
            </div>

            <div className="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
              <div className="md:flex-1 px-3 text-center md:text-right mt-5">
                <button className="px-10 py-3 bg-green-500 text-white font-bold hover:bg-green-600 rounded-lg">
                  Lưu
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </section>
    </main>
  );
};

export default ProfileShop;
