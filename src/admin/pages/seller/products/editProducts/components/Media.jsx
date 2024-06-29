/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import MultipleFile from "../../../../../components/common/MultipleFile";
const Media = ({images,setImages,imagesDelete,setImagesDelete}) => {
  const { t } = useTranslation();
  return (
    <div className={"w-full bg-white rounded-md shadow-md sm:overflow-auto p-4"}>
      <h3 className="font-bold">{t("admin.newProduct.media")}</h3>
      <div className="mt-4">
        <MultipleFile images={images} setImagesDelete={setImagesDelete} imagesDelete={imagesDelete} setImages={setImages}/>
      </div>
    </div>
  );
};

export default Media;
