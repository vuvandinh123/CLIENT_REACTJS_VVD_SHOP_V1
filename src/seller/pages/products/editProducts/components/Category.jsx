/* eslint-disable react/prop-types */
import { Field, useFormikContext } from "formik";
import { useEffect } from "react";
import SelectField from "../../../../components/fields/SelectField";
import { useTranslation } from "react-i18next";
import CateSelected from "../../../../components/cateSelected";

const Category = ({ categories, brands, setCategoryId, spec, setSpec }) => {
  // hook
  const { values } = useFormikContext();
  const { t } = useTranslation();

  // nếu categoryId thay đổi thì set lai categoryId
  useEffect(() => {
    setCategoryId(values.categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.categoryId]);

  // thêm mới field
  const addField = () => {
    setSpec([...spec, { name: "", value: "" }]);
  };

  // thay đổi field
  const handleChange = (index, event) => {
    const values = [...spec];
    values[index][event.target.name] = event.target.value;
    setSpec(values);
  };

  // xóa field
  const removeField = (index) => {
    const values = [...spec];
    values.splice(index, 1);
    setSpec(values);
  };
  return (
    <div>
      <div
        className={"w-full bg-white rounded-md shadow-md sm:overflow-auto p-4"}
      >
        <h3 className="font-bold">Product Status</h3>
        <div>
          <div className="my-4">
            <CateSelected data={categories}></CateSelected>
          </div>
          <div className="my-4">
            <SelectField
              name="brandId"
              label={t("admin.newProduct.brand")}
              id="brandId"
              data={brands}
            ></SelectField>
          </div>
          <hr />
          <div className="mt-4">
            <h4 className="mb-3">{t("admin.newProduct.typeProduct")}</h4>
            <div className="mb-4 ">
              <div className="mb-3 flex items-center">
                <Field
                  id="type_product"
                  type="radio"
                  checked={values.type === "single"}
                  value="single"
                  name="type"
                  className="h-4 w-4 border-gray-300  outline-none focus:ring-blue-300"
                />
                <label
                  htmlFor="type_product"
                  className="ml-2 block w-full cursor-pointer text-sm font-medium text-navy-700"
                >
                  {t("admin.newProduct.singleProduct")}
                </label>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <Field
                id="type_product2"
                type="radio"
                value="multiple"
                checked={values.type === "multiple"}
                name="type"
                className="h-4 w-4 border-gray-300  outline-none focus:ring-blue-300"
              />
              <label
                htmlFor="type_product2"
                className="text- ml-2 block w-full cursor-pointer text-sm font-medium text-navy-700"
              >
                {t("admin.newProduct.multiProduct")}
              </label>
            </div>
            <hr />
            <div className="my-5">
              <h4 className="mb-3">{t("admin.newProduct.specifications")}</h4>
              <div className="mt-5">
                {spec &&
                  spec.map((item, i) => (
                    <div key={i} className="mt-3 grid grid-cols-2 gap-x-3">
                      <div>
                        <label
                          htmlFor={"spec" + i}
                          className="mb-2 block text-sm capitalize text-navy-700 ms-2"
                        >
                          {t("admin.newProduct.specName")}
                        </label>
                        <input
                          type={"text"}
                          className={`w-full rounded-md border px-5 py-2 outline-blue-400`}
                          placeholder={t("admin.newProduct.category")}
                          name="name"
                          value={item.name || ""}
                          onChange={(e) => handleChange(i, e)}
                          id={"spec" + i}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={"spec2" + i}
                          className="mb-2 block text-sm capitalize text-navy-700 ms-2"
                        >
                          {t("admin.newProduct.specValue")}
                        </label>
                        <input
                          type={"text"}
                          className={`w-full rounded-md border px-5 py-2 outline-blue-400`}
                          placeholder={t("admin.newProduct.specValue")}
                          value={item.value || ""}
                          onChange={(e) => handleChange(i, e)}
                          name={"value"}
                          id={"spec2" + i}
                        />
                      </div>
                      <div
                        onClick={() => removeField(i)}
                        className="mt-2 cursor-pointer text-sm capitalize text-red-500 ms-2"
                      >
                        {t("admin.newProduct.specRemove")}
                      </div>
                    </div>
                  ))}
                <span
                  onClick={addField}
                  className="mt-4 block cursor-pointer text-sm font-medium text-blue-700 underline ms-2"
                >
                  {t("admin.newProduct.specAdd")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
