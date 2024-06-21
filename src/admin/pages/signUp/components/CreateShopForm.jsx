/* eslint-disable react/prop-types */
import TextFiled from "../../../components/fields/TextFiled";
import NumberFiled from "../../../components/fields/NumberFiled";
import NotImage from "../../../../assets/imageNotFound.png";
import { Link } from "react-router-dom";
import { isObjectEmptyOrNull } from "../../../../helpers/utils";
import toast from "react-hot-toast";
import { uploadImages } from "../../../service/Upload";
import { useState } from "react";
import Loader from "../../../components/common/Loader";
const CreateShopForm = ({ setTab, data, handleSubmit, setData }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClickSubmit = async () => {
    // validate
    if (!image) {
      toast.error("Vui lòng thêm ảnh đại diện cho cửa hàng");
      return;
    }
    if (data.shop_phone.length < 9 || data.shop_phone.length > 10) {
      toast.error("Số điện thoại không đúng!");
      return;
    }
    if (
      isObjectEmptyOrNull(data, [
        "shop_website",
        "shop_description",
        "shop_logo",
      ])
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setLoading(true);
    const files = await uploadImages([image]);
    setData({ ...data, shop_logo: files.data[0].url });
    setLoading(false);
    handleSubmit(files.data[0].url);
  };
  return (
    <div className="bg-white p-5 rounded-lg">
      {loading && <Loader></Loader>}
      <div className="mb-5">
        <div className="text-2xl font-bold text-center">VVD SHOP</div>
        <p className="text-gray-500 text-center font-light">
          Tạo các thông tin của cửa hàng khách hàng có thể nhìn thấy chúng !
        </p>
      </div>
      <div className="md:flex mb-8">
        <div className="md:w-1/3 border-r">
          <legend className="uppercase tracking-wide text-sm">Cửa hàng</legend>
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
                  className="w-full h-full object-cover"
                  src={image ? URL.createObjectURL(image) : NotImage}
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
                onChange={(e) => {
                  setData({ ...data, shop_name: e.target.value });
                }}
                value={data.shop_name}
                className={"p-3 px-4"}
                placeholder={"VVD SHOP"}
              ></TextFiled>
            </div>
            <div className="basis-1/2">
              <TextFiled
                label={"Tên tài khoản"}
                onChange={(e) => {
                  setData({ ...data, shop_username: e.target.value });
                }}
                name="shop_username"
                value={data.shop_username}
                className={"p-3 px-4"}
                placeholder={"vvdshop"}
              ></TextFiled>
            </div>
          </div>
          <div className="mb-4">
            <NumberFiled
              label={"Số điện thoại"}
              name="shop_phone"
              className={"p-3 px-4"}
              value={data.shop_phone}
              onChange={(e) => {
                setData({ ...data, shop_phone: e.target.value });
              }}
              locaPosition="left"
              placeholder="0123-456-789"
              location={"+84"}
            ></NumberFiled>
          </div>
          <div className="mb-4">
            <TextFiled
              label={"Website"}
              required={false}
              value={data.shop_website}
              onChange={(e) => {
                setData({ ...data, shop_website: e.target.value });
              }}
              name="shop_website"
              className={"p-3 px-4"}
              placeholder={"https://"}
            ></TextFiled>
          </div>
          <div className="mb-4">
            <TextFiled
              label={"Email"}
              value={data.shop_email}
              onChange={(e) => {
                setData({ ...data, shop_email: e.target.value });
              }}
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
            <textarea
              className="w-full outline-blue-500 border rounded-lg shadow-inner p-4 "
              placeholder="Enter some text..."
              onChange={(e) => {
                setData({ ...data, shop_description: e.target.value });
              }}
              rows={6}
              name="shop_description"
              defaultValue={""}
            ></textarea>
            <span className="text-xs mb-4 font-thin">
              Các mô tả về cửa hàng
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <button
            onClick={() => setTab("address")}
            className="inline-block shrink-0 rounded-md border border-gray-300 bg-gray-100 px-12 py-3 text-sm font-medium text-black transition hover:bg-transparent  focus:outline-none focus:ring active:text-blue-500"
          >
            Quay lại
          </button>
          <button
            onClick={handleClickSubmit}
            type="button"
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Hoàn thành
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Bạn đã có tài khoản
          <Link to={"/admin/login"} className="text-gray-700 ms-3 underline">
            Đăng nhập
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default CreateShopForm;
