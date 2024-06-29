/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import { FileUploader } from "react-drag-drop-files";
import imageNotFound from "../../../assets/imageNotFound.png";
const SingleFile = ({ image, setImage, setImageDelete }) => {
  const fileTypes = ["JPEG", "PNG", "GIF", "JPG", "WEBP"];
  const handleChange = (file) => {
    setImage(file);
  };
  const removeImage = () => {
    if (Object.prototype.toString.call(image) === "[object Object]") {
      setImageDelete(image);
    }
    setImage(null);
  };
  return (
    <div>
      <div className="mb-5">
        <FileUploader
          multiple={false}
          className="w-full"
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
      {image && (
        <div className="flex flex-wrap gap-3">
          <div className="relative max-h-[12rem] max-w-[22rem] shadow-md border border-blue-300">
            <img
              onError={(e) => {
                e.target.src = imageNotFound;
              }}
              className="w-full h-full object-cover"
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt=""
            />
            <span
              onClick={removeImage}
              className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-red-500 p-1"
            >
              {" "}
              <IoClose className="text-white"></IoClose>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleFile;
