import { useRef, useState } from "react";
import Slider from "react-slick";
import { ImageLoader } from "../../../components/common";
import { categories } from "../../../api/data";
import { useApiCall } from "../../../hooks";
import { getAllCategoryShow } from "../../../service/Category";
import { Link } from "react-router-dom";
import { Skeleton } from "keep-react";

const Contents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  var settings2 = {
    infinite: true,
    slidesToShow: 5,
    autoplay: true,
    slidesToScroll: 1,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const sliderList = [
    {
      id: 1,
      image:
        "https://demo-uminex.myshopify.com/cdn/shop/files/banner_3_1.jpg?v=1681465950&width=2000",
      label: "galaxy tab 2022",
      name1: "Top Trending",
      name2: "galaxy tab s6 ultra",
    },
    {
      id: 2,
      image:
        "https://demo-uminex.myshopify.com/cdn/shop/files/banner_3_2.jpg?v=1681465965&width=2000",
      label: "GAMEPAD CONSOLE",
      name1: "today's offer",
      name2: "skin gamepad 2022",
    },
    {
      id: 3,
      image:
        "https://demo-uminex.myshopify.com/cdn/shop/files/banner_3_3.jpg?v=1681465977&width=2000",
      label: "Security Cameras",
      name1: "Outdoor",
      name2: "Security Cameras",
    },
  ];
  const { data, loading } = useApiCall(async () => {
    const res = await getAllCategoryShow();
    return res.data;
  }, []);
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    initialSlide: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (current) => setCurrentSlide(current),
  };

  const arrowsRef = useRef(null);
  const handleClickNext = () => {
    arrowsRef.current.slickNext();
  };
  const handleClickPrev = () => {
    arrowsRef.current.slickPrev();
  };
  return (
    <>
      <div className=" max-w-[100%] flex flex-col justify-between  lg:max-w-[56%] relative">
        <div
          onClick={handleClickPrev}
          className="absolute z-20 transition-all duration-200 left-5 top-16 lg:top-[25%] w-12 h-12 text-center flex items-center justify-center hover:text-[#212529] cursor-pointer hover:bg-[#fff] hover:shadow-lg text-gray-400 text-[12px] rounded-full"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div
          onClick={handleClickNext}
          className="absolute z-20 transition-all duration-200 right-5 top-16 lg:top-[25%] w-12 h-12 text-center flex items-center justify-center hover:text-[#212529] cursor-pointer hover:bg-[#fff] hover:shadow-lg text-gray-400 text-[12px] rounded-full"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <Slider ref={arrowsRef} {...settings}>
          {sliderList.map((item, index) => {
            return (
              <div
                key={item.id}
                className="relative min-h-[200px] md:min-h-[250px] lg:min-h-[340px] h-full bg-white rounded-md overflow-hidden pt-8"
              >
                <a href="" className="block h-full">
                  <img
                    className={`  h-full object-cover`}
                    src={item.image}
                    alt=""
                  />
                  <div className="absolute top-7 lg:top-[27%] lg:left-14 left-5 w-80 overflow-hidden">
                    <p
                      className={`${
                        index == currentSlide &&
                        "sliderAnimationLeft opacity-100"
                      } opacity-0 text-red-600 text-[10px] lg:text-[13px] font-semibold uppercase`}
                    >
                      {item.label}
                    </p>
                    <h6 className="capitalize text-[1.4rem] lg:text-[2rem] font-semibold my-3">
                      <span
                        className={`${
                          index == currentSlide &&
                          "sliderAnimationLeft opacity-100"
                        } opacity-0 block`}
                      >
                        {item.name1}
                      </span>{" "}
                      <span
                        className={`${
                          index == currentSlide &&
                          "sliderAnimationRight opacity-100"
                        } opacity-0 block`}
                      >
                        {item.name2}
                      </span>
                    </h6>
                    <button className="bg-[#2b38d1] hidden lg:block text-white py-1 px-2 lg:py-2 lg:px-8 rounded-full hover:bg-slate-200 hover:text-black transition-all">
                      Xem Thêm
                    </button>
                  </div>
                </a>
              </div>
            );
          })}
        </Slider>
        <div className=" max-w-[100%]">
          {!loading && data.length > 0 && (
            <Slider {...settings2}>
              {data.map((item) => {
                return (
                  <div key={item.id} className="">
                    <div
                      title={item.name}
                      className={`p-3 bg-white min-h-[160px] flex flex-col justify-between  me-3   rounded-md`}
                    >
                      <div className="mb-2 min-h-[100px]  flex justify-center relative">
                        <Link to={`/categories/${item.slug}-${item.id}`}>
                          <ImageLoader
                            src={item.thumbnail}
                            alt={item.name}
                            className={
                              "w-[102px] h-[100px] rounded-sm overflow-hidden"
                            }
                          />
                        </Link>
                      </div>
                      <h4 className="text-center text-ellipsis whitespace-nowrap overflow-hidden font-semibold  text-[#212529]">
                        <Link to={`/categories/${item.slug}-${item.id}`}>
                          {item.name}
                        </Link>
                      </h4>
                    </div>
                  </div>
                );
              })}
            </Slider>
          )}
          {loading && (
            <Skeleton className=" space-y-2.5 flex gap-x-5">
              {Array(5)
                .fill(0)
                .map((item, index) => {
                  return (
                    <Skeleton.Line
                      key={index}
                      className="w-full h-[160px] rounded-md"
                    />
                  );
                })}
            </Skeleton>
          )}
        </div>
      </div>
      <div className=" w-[100%]  flex flex-col justify-between">
        <div className=" min-h-[160px] bg-white mb-3 lg:mb-0 relative rounded-md group overflow-hidden">
          <Link to={"/categories/tai-nghe-chinh-hang-4"} className="block">
            <div className="absolute z-20 top-10 left-6 leading-10">
              <h5 className="text-lg font-semibold ">Phụ kiện</h5>
              <h5 className="text-lg font-semibold">Tai nghe chính hãng</h5>
              <p>Sản phẩm đổi trả trong 20 ngày</p>
            </div>
            <div className="overflow-hidden">
              <ImageLoader
                className="w-full h-full -z-10 group-hover:scale-105 transition-all duration-300"
                src={
                  "https://demo-uminex.myshopify.com/cdn/shop/files/3_1.jpg?v=1681466981&width=2000"
                }
              />
            </div>
          </Link>
        </div>
        <div className=" mb-3  min-h-[160px] bg-white lg:mb-0 relative group rounded-md overflow-hidden">
          <Link to={"/categories/tai-nghe-chinh-hang-3"} className="block">
            <div className="absolute z-20 top-10 left-6 leading-10">
              <h5 className="text-lg font-semibold">Apple </h5>
              <h5 className="text-lg font-semibold">Airport chính hãng</h5>
              <p>Sản phẩm đổi trả trong 20 ngày</p>
            </div>
            <div className="overflow-hidden ">
              <ImageLoader
                className="w-full h-full -z-10 group-hover:scale-105 transition-all duration-300"
                src={
                  "https://demo-uminex.myshopify.com/cdn/shop/files/3_2.jpg?v=1681466999&width=2000"
                }
              />
            </div>
          </Link>
        </div>
        <div className=" mb-3 lg:mb-0  min-h-[160px] bg-white relative group rounded-md overflow-hidden">
          <Link to={"/categories/tai-nghe-chinh-hang-6"} className="block">
            <div className="absolute z-20 top-10 left-6 leading-10">
              <h5 className="text-lg font-semibold">Phụ kiện</h5>
              <h5 className="text-lg font-semibold">Tay cầm chơi game</h5>
              <p>Sản phẩm đổi trả trong 20 ngày</p>
            </div>
            <div className="overflow-hidden ">
              <ImageLoader
                className="w-full h-full -z-10 group-hover:scale-105 transition-all duration-300"
                src={
                  "https://demo-uminex.myshopify.com/cdn/shop/files/3_3.jpg?v=1681467017&width=2000"
                }
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Contents;
