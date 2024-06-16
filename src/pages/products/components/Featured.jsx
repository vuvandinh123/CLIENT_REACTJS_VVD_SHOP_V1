import { Link } from "react-router-dom";
import { Accordion } from "../../../components/common";
import { formatPriceVND } from "../../../utils";

const Featured = () => {
  const listProduct = [];
  return (
    <>
      <Accordion title="FEATURED PRODUCT">
        {listProduct?.map((item, index) => (
          <div key={index} className="mt-5">
            <div className="flex items-center">
              <div className="basis-2/6 shrink-0 group relative">
                <div>
                  <Link to={`/products/${item.slug}`} className="block">
                    <img
                      className="absolute group-hover:opacity-0 transition-all duration-400:"
                      src={item?.images[0]?.image_url}
                      alt=""
                    />
                    {item?.images[1]?.image_url && (
                      <img
                        className="group-hover:scale-105"
                        src={item?.images[1]?.image_url}
                        alt=""
                      />
                    )}
                  </Link>
                </div>
              </div>
              <div className="mt-1">
                <h4 className="">
                  <Link
                    to={`/products/${item.slug}`}
                    className="block text-[12px] hover:text-blue-500"
                  >
                    {item?.name}
                  </Link>{" "}
                </h4>
                <h5 className="font-bold mt-1 text-red-500">
                  {formatPriceVND(item?.price)}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </Accordion>
    </>
  );
};

export default Featured;
