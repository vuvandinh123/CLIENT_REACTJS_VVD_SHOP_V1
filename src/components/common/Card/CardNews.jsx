import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import ImageLoader from "../ImageLoader";
import PropTypes from "prop-types";
import { AppURL } from "../../../api/AppURL";

const CardNews = ({ data }) => {
  return (
    <>
      <div className="">
        <div className="relative   rounded-md group mx-2 overflow-hidden bg-white ">
          <div className="overflow-hidden  min-h-[200px] relative">
            <Link to={`/blog/${data?.slug}`}>
              <ImageLoader
                src={AppURL.ImageUrl + data?.image}
                className={
                  "group-hover:scale-105 h-[200px] group-hover:shadow-md  transition-all duration-300"
                }
              />
            </Link>
          </div>
          <div className="p-5 flex flex-col gap-2 border-b">
            <Link to={"/blog"} href="" className="text-[#2b38d1] text-[12px]">
              {data?.topic?.name}
            </Link>
            <h3 className="text-[17px] font-[600]">
              <Link
                to={`/blog/${data?.slug}`}
                className="hover:text-[#2b38d1] text-[17px] text-ellipsis h-10 w-full line-clamp-2 leading-[1.2em] max-h-[2.4em]  overflow-hidden "
              >
                {data?.title}
              </Link>{" "}
            </h3>
            <div className="text-[#8d979e] text-[12px] uppercase">
              Post by ALO Support
            </div>
            <p className="text-gray-500 text-[14px] text-ellipsis  w-full line-clamp-2 leading-[1.5em]   overflow-hidden">
              {data?.compact}
            </p>
          </div>
          <div className="flex justify-between items-center p-3">
            <div className="text-[12px] ">
              <a href="" className="hover:text-[#2b38d1] group/read  flex">
                {" "}
                READ MORE{" "}
                <MdKeyboardDoubleArrowRight className="text-[18px]  ms-1 group-hover/read:translate-x-2 transition-all duration-300" />
              </a>
            </div>
            <div className="text-[#8d979e] text-[12px]">
              <span className="me-2">MAR</span>
              <span className="me-1">03</span>
              <span>2023</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
CardNews.propTypes = {
  data: PropTypes.object,
};
export default CardNews;
