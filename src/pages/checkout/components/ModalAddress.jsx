/* eslint-disable react/prop-types */
"use client";
import { useEffect, useState } from "react";
import { Button, Modal } from "keep-react";
import InputField from "../../../components/field/InputField";
import SelectField from "../../../components/field/SelectField";
import { getAllNations } from "../../../service/Nation";
import { getAllProvinces } from "../../../service/Provinces";
import { Form, Formik } from "formik";
import { Loader } from "../../../components/common";
import { createUserAddressOrder } from "../../../service/UserAddressOrder";
import toast from "react-hot-toast";
import { isObjectEmptyOrNull } from "../../../helpers/utils";

export const ModalAddress = ({ isOpen, setIsOpen }) => {
  const [nations, setNations] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nation, setNation] = useState(null);
  const fetchProvinces = async (nationId) => {
    const res = await getAllProvinces(nationId);
    setProvinces(res.data);
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllNations();
      setNations(res.data);
      setNation(res.data[0].id);
      fetchProvinces(res.data[0].id);
      setLoading(false);
    })();
  }, []);
  const handleChangeNation = async (e) => {
    console.log(e.target.value);
    await fetchProvinces(e.target.value);
  };

  const handleSubmit = async (values) => {
    if (isObjectEmptyOrNull(values)) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const res = await createUserAddressOrder(values);
    if (res.status === 201) {
      setIsOpen(false);
      toast.success("Thêm địa chỉ thành công");
    }
  };
  if (loading) {
    <Loader></Loader>;
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Body className="space-y-3 w-[800px] h-[500px]">
          <Formik
            initialValues={{
              address_detail: "",
              nation_id: nations[0]?.id,
              province_id: "",
              first_name: "",
              last_name: "",
              phone: "",
            }}
            // validationSchema={{

            // }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className="w-full">
              <h1 className="text-xl uppercase text-center mb-5">
                Thêm địa chỉ nhận hàng
              </h1>
              <Modal.Content>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField
                    name="last_name"
                    label="Họ đệm"
                    placeholder="Vũ Văn"
                  ></InputField>
                  <InputField
                    name="first_name"
                    label="Tên"
                    placeholder="A"
                  ></InputField>
                  <InputField
                    label="Số điện thoại"
                    name="phone"
                    type="number"
                    placeholder="123-456-789"
                  ></InputField>
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="example@.com"
                  ></InputField>
                  <label htmlFor="nations">
                    <span className="block mb-2">Quốc gia</span>
                    <select
                      className="w-full bg-gray-50 p-2.5 bg-white rounded-md outline-blue-500 border"
                      onChange={handleChangeNation}
                      name=""
                      id=""
                    >
                      {nations?.map((nation, index) => (
                        <option value={nation.id} key={index}>
                          {nation.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <SelectField name="province_id" label={"Tỉnh / Thành phố"}>
                    <option value="" selected disabled>
                      Chọn tỉnh / thành phố
                    </option>
                    {provinces?.map((province, index) => (
                      <option value={province.id} key={index}>
                        {province.name}
                      </option>
                    ))}
                  </SelectField>
                  <div className="col-span-2">
                    <InputField
                      label="Đị̣a chỉ"
                      name="address_detail"
                      placeholder="123 Main St"
                    ></InputField>
                  </div>
                </div>
              </Modal.Content>
              <Modal.Footer>
                <div className="flex w-full gap-3 items-center justify-end">
                  <Button
                    onClick={() => setIsOpen(false)}
                    size="sm"
                    variant="outline"
                    color="secondary"
                  >
                    Hủy
                  </Button>
                  <Button type="submit" size="sm" color="primary">
                    Thêm
                  </Button>
                </div>
              </Modal.Footer>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
