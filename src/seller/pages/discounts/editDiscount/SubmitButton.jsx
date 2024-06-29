/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { LiaFirstdraft } from "react-icons/lia";
import { RiDraftLine } from "react-icons/ri";

const SubmitButton = ({ setIsSaveDraft }) => {
  const { t } = useTranslation();
  const handleClickIsDraft = () => {
    setIsSaveDraft(true);
  };
  const handleClickIsSave = () => {
    setIsSaveDraft(false);
  };
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="submit"
        onClick={handleClickIsDraft}
        className="rounded-md flex font-bold items-center gap-2 bg-red-500 px-5 py-2 text-white hover:bg-red-600"
      >
        <LiaFirstdraft></LiaFirstdraft> {t("admin.editProduct.submit2")}
      </button>
      <button
        type="submit"
        onClick={handleClickIsSave}
        className="rounded-md flex font-bold items-center gap-2 bg-green-500 px-5 py-2 text-white hover:bg-green-600"
      >
        <RiDraftLine></RiDraftLine> {t("admin.editProduct.submit")}
      </button>
    </div>
  );
};

export default SubmitButton;
