/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import { FileUploader } from "react-drag-drop-files";
const MultipleFile = ({
  images,
  setImages,
  setImagesDelete,
  multiple = true,
}) => {
  const fileTypes = ["JPEG", "PNG", "GIF", "JPG", "WEBP"];
  const handleChange = (file) => {
    const files = [...file];
    setImages((prevImages) => [...prevImages, ...files]);
  };
  const removeImage = (image) => {
    if (Object.prototype.toString.call(image) === "[object Object]") {
      setImagesDelete((prevImages) => [...prevImages, image]);
    }
    setImages((prevImages) => prevImages.filter((i) => i !== image));
  };
  return (
    <div>
      <div className="mb-5">
        <FileUploader
          multiple={multiple}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative max-h-[12rem] max-w-[12rem] shadow-md border border-blue-300"
          >
            <img
              src={
                typeof image.image_path === "string"
                  ? image.image_path
                  : URL.createObjectURL(image)
              }
              alt=""
            />
            <span
              className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-red-500 p-1"
              onClick={() => removeImage(image)}
            >
              {" "}
              <IoClose className="text-white"></IoClose>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleFile;
