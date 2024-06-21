/* eslint-disable react/prop-types */
import { useState } from "react";
import { useApiCall } from "../../../../hooks";
import TextFiled from "../../../components/fields/TextFiled";
import { getProvider } from "../../../service/Address";
import SelectField2 from "../../../components/fields/SelectField2";
import { Link } from "react-router-dom";
import { isObjectEmptyOrNull } from "../../../../helpers/utils";
import toast from "react-hot-toast";
import { getAllProvinces } from "../../../../service/Provinces";
import { getAllNations } from "../../../../service/Nation";
import { uploadImages } from "../../../service/Upload";

const AddressForm = ({ setTab, data, setData }) => {
  const [idNation, setIdNation] = useState("1");
  const { data: nations } = useApiCall(async () => {
    const res = await getAllNations();
    return res.data;
  }, []);
  const { data: provider } = useApiCall(async () => {
    const res = await getAllProvinces(idNation);
    console.log(res);
    return res.data;
  }, [idNation]);
  const handleClickSubmit =async () => {
   
    // validate
    if (isObjectEmptyOrNull(data)) {
      toast.error("Vui điền đầy đủ thông tin");
      return;
    }
    setTab("create");
  };
  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="mb-5">
        <div className="text-2xl font-bold text-center">VVD SHOP</div>
        <p className="text-gray-500 text-center font-light">
          Địa chỉ của cửa hàng bạn giúp khách hàng có thể lọc chọn nơi gần nhất
          đề mua !
        </p>
      </div>
      <div className="md:flex mb-8">
        <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
          <div className="md:flex mb-4">
            <div className="md:flex-1 md:pr-3">
              <label
                htmlFor=""
                className="block mb-2 font-semibold text-gray-600"
              >
                Quốc gia
              </label>
              <select
                onChange={(e) => {
                  setData({ ...data, shop_nation_id: e.target.value });
                  setIdNation(e.target.value);
                }}
                defaultValue={data.shop_nation}
                className="w-full rounded-md  border  bg-white px-3 py-4 outline-blue-400 "
                name="shop_nation"
                id=""
              >
                {nations.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:flex-1 md:pl-3">
              <label
                htmlFor=""
                className="block mb-2 font-semibold text-gray-600"
              >
                Tỉnh / Thành phố
              </label>
              <select
                onChange={(e) =>
                  setData({ ...data, shop_province_id: e.target.value })
                }
                defaultValue={data.shop_province}
                value={data.shop_province}
                className="w-full rounded-md  border  bg-white px-3 py-4 outline-blue-400 "
                name="shop_province"
                id=""
              >
                <option value="">Chọn tỉnh / Thành phố</option>
                {provider.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>

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
                onChange={(e) => {
                  setData({
                    ...data,
                    shop_address: e.target.value,
                  });
                }}
                value={data.shop_address}
                name="shop_address"
                placeholder="12/1 Đường số 8 Linh Xuân"
              ></TextFiled>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <button
            onClick={() => setTab("about")}
            type="button"
            className="inline-block shrink-0 rounded-md border border-gray-300 bg-gray-100 px-12 py-3 text-sm font-medium text-black transition hover:bg-transparent  focus:outline-none focus:ring active:text-blue-500"
          >
            Quay lại
          </button>
          <button
            onClick={handleClickSubmit}
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Tiếp tục
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

export default AddressForm;
