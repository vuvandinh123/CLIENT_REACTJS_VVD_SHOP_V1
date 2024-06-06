/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import "react-medium-image-zoom/dist/styles.css";
import { useParams } from "react-router-dom";
import Detail from "./Detail";
import { extractNumberFromSlug } from "../../utils";
import DetailMb from "./DetailMb";
import useGetProductById from "../../hooks/useGetProductById";
import BoxImages from "./components/BoxImages";
import BoxContent from "./components/BoxContent";
import Shop from "./components/Shop";
import Breadcrumb from "../../components/common/Breadcrumb";
import { getDiscountByProductId } from "../../service/Discount";
import { Loader } from "../../components/common";
const ProductDetail = () => {
  const { slug } = useParams();
  const id = extractNumberFromSlug(slug);
  const imageRef = useRef(null);
  const [discount, setDiscount] = useState(0);
  const { data,loading, shop, src, setSrc, setData } = useGetProductById(id);
  useEffect(() => {
    window.scrollTo(0, 200);
  }, [slug]);
  useEffect(() => {
    if (data.id && shop.id) {
      const fetchAPi = async () => {
        try {
          const res = await getDiscountByProductId(data.id, {
            shop: shop.id,
          });

          setDiscount(res.data);
        } catch (error) {
          console.log(error, "loi");
        }
      };
      fetchAPi();
    }
  }, [data.id, shop.id]);
  const handleClickImage = (e) => {
    const src = e.target.src;
    setSrc(src);
  };

  return (
    <section className="bg-[#F1F5F6]">
      {loading && <Loader></Loader>}
      <div className="max-w-[1410px] relative px-5 py-5 mx-auto ">
        <Breadcrumb
          data={[
            {
              name: "Sản phẩm",
              link: `/products`,
            },
            {
              name: data?.name,
            },
          ]}
        ></Breadcrumb>
        <div className="bg-white p-5 mt-5">
          <div className="flex-col md:flex-row flex">
            <BoxImages
              imageUrls={data?.imageUrls}
              src={src}
              handleClickImage={handleClickImage}
              imageRef={imageRef}
            ></BoxImages>
            <BoxContent
              setData={setData}
              discount={discount}
              data={data}
            ></BoxContent>
          </div>
          <Shop shop={shop}></Shop>
          <Detail />
          <DetailMb />
        </div>
        {/* <Recomended productId={data?.category_id} /> */}
        {/* <Recently product={data} /> */}
      </div>
    </section>
  );
};

export default ProductDetail;
