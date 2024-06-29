/* eslint-disable react/prop-types */

import { Button, Modal, Rating } from "keep-react";
import { formatPriceVND } from "../../../utils";
import { MdOutlinePermMedia } from "react-icons/md";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { addComment } from "../../../service/Comment";
import Swal from "sweetalert2";
import { uploadImages } from "../../../service/Upload";
import { Loader } from "../../../components/common";
const ReviewModal = ({
  isOpen,
  closeModal,
  openModal,
  product,
  setRefresh,
}) => {
  const [listImage, setListImage] = useState([]);
  const [rating, setRating] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [review, setReview] = useState("");
  if (!isOpen || !product) return null;
  console.log(product);
  const handleChange = (file) => {
    const files = [...file];
    setListImage((prevImages) => [...prevImages, ...files]);
  };
  const handleRating = (rating) => {
    setRating(rating);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Vui lòng đánh giá");
      return;
    }
    if (review.length < 50) {
      toast.error("Vui lòng để lại đánh giá tối thiểu 50 ký tự");
      return;
    }

    setIsPending(true);
    const imageList = await uploadImages(listImage);
    const data = {
      productId: product.product_id,
      start: rating,
      review: review,
      order_detail_id: product.order_detail_id,
      sku: product.code || null,
      images: imageList?.data || null,
    };
    // return;
    const res = await addComment(data);
    if (res.status === 201) {
      Swal.fire({
        title: "Đánh giá thành công",
        text: "Cảm ơn bạn đã đánh giá sản phẩm ",
        icon: "success",
      });
      setRefresh((prev) => !prev);
      setIsPending(false);
      setListImage([]);
      setRating(0);
      setReview("");
      closeModal();
    }
  };
  return (
    <>
      {isPending && <Loader></Loader>}
      <Button onClick={openModal}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <Modal.Body className="w-[700px]">
            <Modal.Content>
              <div>
                <div className="">
                  <h1 className="text-lg text-gray-700 font-semibold ">
                    Đánh giá sản phẩm
                  </h1>
                  <div className="flex gap-2 mt-3">
                    <div className="w-14 h-14 border flex-shrink-0 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
                      <img src={product?.thumbnail} alt="" />
                    </div>
                    <div>
                      <h3 className="text-ecl">{product?.product_name}</h3>
                      <p className="text-red-500 mt-1">
                        {formatPriceVND(Number(product?.product_price) || 0)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2>Đánh giá</h2>
                    <div className="mt-2">
                      <Rating handleRating={handleRating}>
                        <Rating.Star value={1} />
                        <Rating.Star value={2} />
                        <Rating.Star value={3} />
                        <Rating.Star value={4} />
                        <Rating.Star value={5} />
                      </Rating>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="review"
                        className="block text-md mb-2  font-medium text-gray-700"
                      >
                        Viết đánh giá{" "}
                      </label>
                      <div className="flex justify-between gap-3 ">
                        <div className="flex gap-2">
                          {listImage.map((item, index) => (
                            <div className="w-16 h-16 relative" key={index}>
                              <img
                                className="w-full "
                                src={URL.createObjectURL(item)}
                                alt=""
                              />
                              <span
                                onClick={() =>
                                  setListImage(
                                    listImage.filter((_, i) => i !== index)
                                  )
                                }
                                className="rounded-full bg-red-500 w-3 h-3 flex items-center justify-center cursor-pointer absolute -right-1 -top-1"
                              >
                                <IoClose className="text-white"></IoClose>
                              </span>
                            </div>
                          ))}
                        </div>
                        <label>
                          <span className="cursor-pointer hover:underline flex gap-2">
                            Thêm ảnh
                            <MdOutlinePermMedia size={20}></MdOutlinePermMedia>
                          </span>
                          <input
                            type="file"
                            onChange={(e) => {
                              handleChange(e.target.files);
                              e.target.value = "";
                            }}
                            className="hidden"
                            multiple
                          />
                        </label>
                      </div>
                      <textarea
                        id="review"
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Đánh giá về sản phẩm"
                        className="w-full mt-2 min-h-[100px] outline-none h-20 border border-gray-300 rounded-md p-2"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Content>
            <Modal.Footer>
              <Button
                onClick={closeModal}
                size="sm"
                variant="outline"
                color="secondary"
              >
                Thoát
              </Button>
              <Button disabled={isPending} size="sm" color="primary">
                Đánh giá
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
};

export default ReviewModal;
