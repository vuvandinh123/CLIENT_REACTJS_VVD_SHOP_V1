/* eslint-disable react/prop-types */
import { useState } from "react";
import { useApiCall } from "../../hooks";
import {
  getCommentByProductId,
  getReviewStatistics,
} from "../../service/Comment";
import { formathDate } from "../../utils";
import { IoStar } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const Detail = ({ data }) => {
  const [des, setDes] = useState("des");
  const [statis, setStatis] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const handleClickDesc = () => {
    setDes("des");
  };
  const handleClickShipping = () => {
    setDes("shipping");
  };
  const handleClickReview = () => {
    setDes("review");
  };
  const calculateAverageRating = (stats) => {
    if (stats.length === 0) return 0;

    let totalRatings = 0;
    let totalReviews = 0;

    stats.forEach((stat) => {
      totalRatings += stat.rating * stat.count;
      totalReviews += stat.count;
    });
    setTotalComments(totalReviews);
    const avgRating = totalReviews > 0 ? totalRatings / totalReviews : 0;
    setAverageRating(avgRating.toFixed(1)); // Làm tròn đến 2 chữ số thập phân
  };

  const { data: comments } = useApiCall(
    async () => {
      try {
        if (data.id) {
          const stas = await getReviewStatistics(data.id);
          const res = await getCommentByProductId(data.id);
          setStatis(stas.data);
          calculateAverageRating(stas.data);
          return res.data;
        }
        return {};
      } catch (error) {
        console.log(error, "loi");
      }
    },
    [data.id],
    {}
  );
  console.log(comments);
  return (
    <>
      <div className="mt-20 hidden md:block">
        <div className="border-b">
          <ul className="flex justify-center items-center gap-8">
            <li
              onClick={handleClickDesc}
              className={`${
                des == "des" && "!text-blue-600 before:!left-0 before:!right-0"
              } cursor-pointer uppercase before:content-[''] before:block before:h-[2px] transition-all duration-200 py-4 before:bg-blue-500 text-gray-400 hover:text-blue-500 before:absolute before: before:bottom-0 before:left-1/2 before:right-1/2 hover:before:left-0 hover:before:right-0 before:transition-all before:duration-300 relative font-bold`}
            >
              CHI TIẾT SẢN PHẨM
            </li>

            <li
              onClick={handleClickShipping}
              className={`${
                des == "shipping" &&
                "!text-blue-600 before:!left-0 before:!right-0"
              } cursor-pointer uppercase before:content-[''] before:block before:h-[2px] transition-all duration-200 py-4 before:bg-blue-500 text-gray-400 hover:text-blue-500 before:absolute before: before:bottom-0 before:left-1/2 before:right-1/2 hover:before:left-0 hover:before:right-0 before:transition-all before:duration-300 relative font-bold`}
            >
              Vận chuyển & Trả hàng
            </li>
            <li
              onClick={handleClickReview}
              className={`${
                des == "review" &&
                "!text-blue-600 before:!left-0 before:!right-0"
              } cursor-pointer uppercase before:content-[''] before:block before:h-[2px] transition-all duration-200 py-4 before:bg-blue-500 text-gray-400 hover:text-blue-500 before:absolute before: before:bottom-0 before:left-1/2 before:right-1/2 hover:before:left-0 hover:before:right-0 before:transition-all before:duration-300 relative font-bold`}
            >
              Đánh giá ( {totalComments} ){" "}
            </li>
          </ul>
        </div>
        <div className="p-10">
          {des === "des" && (
            <>
              <p className="text-justify">{data?.description}</p>
            </>
          )}
          {}

          {des === "shipping" && (
            <div>
              <p className="font-bold uppercase text-[14px] my-3">Vận chuyển</p>
              <ul className="text-gray-500 leading-7">
                Miễn phí vận chuyển mặt đất trong vòng 1 đến 7 ngày làm việc
                Nhận hàng tại cửa hàng trong vòng 1 đến 7 ngày làm việc Tùy chọn
                giao hàng vào ngày hôm sau và chuyển phát nhanh cũng có sẵn Hàng
                mua được giao trong hộp màu cam buộc bằng ruy băng Bolduc, ngoại
                trừ một số mặt hàng nhất định Xem Câu hỏi thường gặp về giao
                hàng để biết chi tiết về phương thức vận chuyển, chi phí và thời
                gian giao hàng
              </ul>
              <p className="font-bold uppercase text-[14px] my-3">
                TRẢ LẠI VÀ ĐỔI HÀNG
              </p>
              <ul className="text-gray-500 leading-7">
                Dễ dàng và miễn phí, trong vòng 14 ngày Xem các điều kiện và thủ
                tục trong Câu hỏi thường gặp về việc hoàn trả của chúng tôi
              </ul>
            </div>
          )}
          {des === "review" && (
            <>
              <div>
                <div className="flex items-center mb-2">
                  <FaStar className="w-4 h-4 text-yellow-300 me-1"></FaStar>
                  <p className="ms-1 text-sm font-medium text-gray-500 ">
                    {averageRating}
                  </p>
                  <p className="ms-1 text-sm font-medium text-gray-500 ">Của</p>
                  <p className="ms-1 text-sm font-medium text-gray-500 ">5</p>
                  <p className="mx-3">/</p>
                  <div>
                    <p className="text-sm flex items-center gap-3 font-medium text-gray-500 ">
                      {statis &&
                        statis?.reduce(
                          (count, item) => count + item.count,
                          0
                        )}{" "}
                      đánh giá
                    </p>
                  </div>
                </div>

                {statis?.map((item, index) => (
                  <div key={index} className="flex items-center mt-4">
                    <a
                      href="#"
                      className="text-sm flex items-center gap-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {item.rating}{" "}
                      <IoStar className="w-4 h-4 text-yellow-300 me-1"></IoStar>
                      <span className="text-sm text-gray-400">
                        ({item.count})
                      </span>
                    </a>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-200">
                      <div
                        className="h-5 bg-yellow-300 rounded"
                        style={{ width: item.percentage + "%" }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-500 ">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
              <section className="bg-white  py-8 lg:py-16 antialiased">
                <div className="">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
                      Đánh giá ({totalComments})
                    </h2>
                  </div>
                  {comments?.map((item, index) => (
                    <article
                      key={index}
                      className="p-6 text-base mt-2 bg-white rounded-lg border border-gray-200"
                    >
                      <footer className="mb-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                              <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={`${item.image}`}
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src =
                                    "https://flowbite.com/docs/images/people/profile-picture-2.jpg";
                                }}
                                alt="Michael Gough"
                              />
                              {item.lastName + " " + item.firstName}
                            </p>
                            <div className="flex items-center">
                              {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                  <FaStar
                                    size={15}
                                    className={`${
                                      index + 1 <= item.start
                                        ? "text-yellow-300"
                                        : "text-gray-300"
                                    }`}
                                    key={index}
                                  ></FaStar>
                                ))}
                            </div>
                            {item?.sku && (
                              <span className="text-sm text-gray-500 border-l pl-3">
                                Phân loại hàng : {item.sku}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 ">
                            <time
                              dateTime="2022-02-08"
                              title="February 8th, 2022"
                            >
                              {formathDate(item.created_at)}
                            </time>
                          </p>
                        </div>
                      </footer>
                      <p className="text-gray-500 ">{item.review}</p>
                      <div className="flex gap-2 mt-2 items-center">
                        {item.images &&
                          item.images.map((image, index) => (
                            <img
                              key={index}
                              src={`${image.url}`}
                              className="w-20 h-20 "
                              loading="lazy"
                              onError={(e) => {
                                e.target.src =
                                  "https://flowbite.com/docs/images/people/profile-picture-2.jpg";
                              }}
                              alt="Michael Gough"
                            />
                          ))}
                      </div>
                    </article>
                  ))}
                  {comments.length === 0 && (
                    <p className="text-sm font-medium text-gray-500 ">
                      Chưa có đánh giá nào
                    </p>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
