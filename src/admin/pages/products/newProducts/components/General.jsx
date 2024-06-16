/* eslint-disable no-unused-vars */
// components
import TextFiled from "../../../../components/fields/TextFiled";
import PriceFiled from "../../../../components/fields/PriceFiled";
import TinyEditor from "../../../../components/fields/TinyEditor";
// lib
import { useTranslation } from "react-i18next";
// hooks
import { useChangeLang } from "../../../../../hooks";
import NumberFiled from "../../../../components/fields/NumberFiled";

const General = (props) => {
  // thay đổi ngôn ngữ
  const { t } = useTranslation();
  const [lang] = useChangeLang();
  return (
    <>
      <div
        className={"w-full bg-white rounded-md shadow-md sm:overflow-auto p-4"}
      >
        <h3 className="font-bold">{t("admin.newProduct.general")}</h3>
        <div>
          <div className="mt-5">
            <TextFiled
              name="name"
              label={t("admin.newProduct.name")}
              type="text"
              placeholder={t("admin.newProduct.name")}
              id="name"
            ></TextFiled>
          </div>
          <div className="mt-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <PriceFiled
                  name="price"
                  label={t("admin.newProduct.price")}
                  location={"VND"}
                  placeholder="99.99"
                  id="price"
                ></PriceFiled>
              </div>
              <div>
                <NumberFiled
                  name="weight"
                  label={t("admin.newProduct.weight")}
                  location="KG"
                  placeholder={t("admin.newProduct.weight")}
                  id="weight"
                ></NumberFiled>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <TextFiled
              placeholder={t("admin.newProduct.description")}
              label={t("admin.newProduct.description")}
              name="description"
              rows="2"
            ></TextFiled>
          </div>
          <div className="mt-5">
            <h3 className="mb-3 font-bold text-gray-500">
              {t("admin.newProduct.detail")}
            </h3>
            <TinyEditor name="details"></TinyEditor>
          </div>
        </div>
      </div>
    </>
  );
};

export default General;
