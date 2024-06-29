// lib
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
// components
import { Title } from "../common";
// service
import { addToFavourite, removeFavouriteItem } from "../../service/Favourite";
import { getCookieAuth } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQtyFav } from "../../redux/slice/favouriteSlice";
import Swal from "sweetalert2";
const Fav = ({ data }) => {
  const [isFav, setIsFav] = useState(data.isFav);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { qty } = useSelector((state) => state.favourite);
  const handleClickToFav = async () => {
    const { userId } = getCookieAuth();
    if (!userId) {
      Swal.fire({
        title: "Bạn cần đăng nhập",
        text: "Bạn cần đăng nhập để thêm các sản phẩm yêu thích",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không",
        confirmButtonText: "Đăng nhập",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
      return;
    }
    const newFav = {
      productId: data.id,
    };
    if (isFav) {
      const res = await removeFavouriteItem(data.id);
      if (res.status === 200) {
        dispatch(setQtyFav(qty - 1));
        toast.success("Xóa khỏi mục yêu thích thành công");
        setIsFav(false);
      }
    } else {
      const res = await addToFavourite(newFav);
      if (res.status === 200) {
        dispatch(setQtyFav(qty + 1));
        toast.success("Thêm vào mục yêu thích thành công");
        setIsFav(true);
      }
    }
  };
  return (
    <>
      <div
        onClick={handleClickToFav}
        className="w-9 h-9 hover:bg-[#4459ff] hover:text-white bg-white group/t  cursor-pointer mb-1 relative flex justify-center items-center rounded-full bg-transparent border"
      >
        {isFav ? (
          <FaHeart className="text-red-500 " />
        ) : (
          <AiOutlineHeart className="text-lg" />
        )}

        <Title title={isFav ? "Xóa khỏi danh sách yêu thích" : "Yêu thích"} />
      </div>
    </>
  );
};
Fav.propTypes = {
  data: PropTypes.object,
};
export default Fav;
