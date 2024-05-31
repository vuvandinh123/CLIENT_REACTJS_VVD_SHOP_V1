import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import Zoom from "react-medium-image-zoom";

const BoxImages = ({ imageUrls, src, handleClickImage, imageRef }) => {
  return (
    <div className="md:basis-1/2  relative">
      <div className="flex-col flex md:flex-row gap-4 sticky top-10  p-5">
        <div className="relative w-full overflow-hidden">
          {imageUrls ? (
            <Zoom>
              <img
                className="w-full origin-center object-cover h-full"
                ref={imageRef}
                src={src}
                alt=""
              />
            </Zoom>
          ) : (
            <Skeleton width={"95%"} height={"500px"} />
          )}
        </div>
        <div className="mt-5 shrink-0 md:mt-16">
          <ul className="flex md:flex-col flex-row justify-center gap-2">
            {imageUrls ? (
              imageUrls?.map((item) => (
                <li
                  key={item.id}
                  className={`border shrink-0  rounded-sm p-[1px] overflow-hidden border-gray-200 cursor-pointer ${
                    item === src ? "!border-blue-500" : ""
                  }`}
                >
                  <img
                    onClick={handleClickImage}
                    className="w-[70px] h-[70px] object-contain"
                    src={item}
                    alt=""
                  />
                </li>
              ))
            ) : (
              <Skeleton width={"70px"} height={"70px"} />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
BoxImages.propTypes = {
  imageUrls: PropTypes.object,
  src: String,
  handleClickImage: Function,
  imageRef: PropTypes.object
}
export default BoxImages;
