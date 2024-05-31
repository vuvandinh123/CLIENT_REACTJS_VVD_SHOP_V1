import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Title } from "../common";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { byToFav, setIsOpenFav } from "../../redux/slice/favouriteSlice";
const Fav = ({ data }) => {
  const dispatch = useDispatch();
  const { favAr } = useSelector((state) => state.favourite);
  const isFav = favAr.find((item) => item.id === data.id);

  const handleClickToFav = () => {
    const newFav = {
      name: data.name,
      price: data.price,
      id: data.id,
      images: data?.images,
      slug: data.slug,
    };
    if(!isFav){
      dispatch(setIsOpenFav(true));
    }
    dispatch(byToFav(newFav));
  };
  return (
    <>
      <div
        onClick={handleClickToFav}
        className="w-9 h-9 hover:bg-[#4459ff] hover:text-white bg-white group/t  cursor-pointer mb-1 relative flex justify-center items-center rounded-full bg-transparent border"
      >
        {isFav ? <FaHeart className="text-red-500 " /> : <AiOutlineHeart className="text-lg"/>}
        
        <Title title={isFav ? "Remove from wishlist" : "Add to wishlist"} />
      </div>
    </>
  );
};
Fav.propTypes = {
  data: PropTypes.object,
};
export default Fav;
