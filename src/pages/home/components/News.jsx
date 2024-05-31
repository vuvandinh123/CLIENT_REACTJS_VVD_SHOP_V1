import SlickCround from "../../../components/common/SlickCround";
import { CardNews } from "../../../components/common/Card";
import PropTypes from "prop-types";
const News = ({ data, loading }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className=" max-w-[100%] relative group/arrow mt-20">
      {!loading && data ? (
        <SlickCround settings={settings}>
          {data.length > 0 &&
            data?.map((item, index) => {
              return <CardNews key={index} data={item} />;
            })}
        </SlickCround>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
News.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};
export default News;
