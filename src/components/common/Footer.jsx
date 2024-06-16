import fastSvg from "../../../public/svg/fast.svg";
import paySvg from "../../../public/svg/pay.svg";
import discountSvg from "../../../public/svg/discount.svg";
import helpSvg from "../../../public/svg/help.svg";
import curatedSvg from "../../../public/svg/curated.svg";
const Footer = () => {
  return (
    <div className="bg-white my-3">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  max-w-[1410px] px-5 mx-auto">
        <div className="flex flex-col gap-3 justify-center items-center p-5">
          <div className="icon-hover p-3">
            <img src={fastSvg} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[12px] font-semibold uppercase">
              Chuyển phát nhanh
            </h3>
            <p className="text-[11px] mt-1">Việt Nam & Mỹ</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center p-5">
          <div className="icon-hover p-3">
            <img src={paySvg} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[12px] font-semibold uppercase">
              Thanh toán an toàn
            </h3>
            <p className="text-[11px] mt-1">100% Bảo mật thanh toán</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center p-5">
          <div className="icon-hover p-3">
            <img src={discountSvg} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[12px] font-semibold uppercase">
              Gảm giá trực tuyến
            </h3>
            <p className="text-[11px] mt-1">
              Có nhiều mã giảm giá khi mua hàng
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center p-5">
          <div className="icon-hover p-3">
            <img src={helpSvg} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[12px] font-semibold uppercase">
              TRUNG TÂM TRỢ GIÚP
            </h3>
            <p className="text-[11px] mt-1">Hỗ trợ 24/7 </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center p-5">
          <div className="icon-hover p-3">
            <img src={curatedSvg} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[12px] font-semibold uppercase">
              Sản phẩm tuyệt vời
            </h3>
            <p className="text-[11px] mt-1">Từ nhiều nhãn hàng nổi tiếng</p>
          </div>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto border-t">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="lg:basis-2/6">
            <aside className="text-center md:text-start">
              <h4 className="font-semibold mb-7 mt-5 uppercase">Địa chỉ </h4>
              <p className="text-gray-500 my-2">
                Bạn có câu hỏi? Gọi chúng tôi hỗ trợ 24/7
              </p>
              <p className="text-2xl text-[#3636ff]">+84 333 583 800</p>
              <p className="text-gray-500 my-2">
                Hẻm 33 đường số 8 Linh Xuân Thủ Đức
              </p>
              <p className="text-gray-500 my-2">vuvandinh203@gmail.com</p>
              <p className="text-gray-500">vuvandinh@vvdshop.com</p>
            </aside>
          </div>
          <div className="lg:basis-2/6">
            <div className="flex justify-between md:justify-start gap-32">
              <div>
                <h4 className="font-bold mt-5 mb-5">THÔNG TIN</h4>
                <ul className="leading-9">
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      Về chúng tôi
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    ></a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      Thông tin vận chuyển
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      Phương thức thanh toán
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#132aff]"
                      href=""
                    >
                      Gửi hỗ trợ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mt-5 mb-5 uppercase">Liên hệ</h4>
                <ul className="leading-9">
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      Địa chỉ
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      Đơn hàng
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:basis-2/6 text-center  md:text-start">
            <h4 className="font-bold mt-5 mb-5 ">ĐĂNG KÝ NHẬN THÔNG BÁO</h4>
            <p className="leading-7  text-gray-500">
              Với 20.000 khách hàng đã đăng ký với VVD SHOP hãy đăng ký nhanh để
              được những giảm giá tuyệt vời từ chúng tôi
            </p>
            <form
              action=""
              method="post"
              className="flex items-center gap-3 mt-5"
            >
              <input
                type="text"
                className="px-5 w-full py-3 rounded-full border focus:outline-none focus:border-[#001aff]"
                placeholder="Địa chỉ email của bạn..."
                name=""
                id=""
              />
              <button className="px-10 py-3 shrink-0 uppercase rounded-full bg-[#001aff] text-white">
                Đăng ký
              </button>
            </form>
            <p className="text-gray-500 my-5 text-center md:text-start">
              Đăng ký VVSDHOP bạn sẽ được voucher giảm giá 20%
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex mb-28 lg:mb-0 justify-between flex-wrap items-center max-w-[1410px] px-5 mx-auto p-5">
        <p className="text-center md:text-start">
          Copyright ©{" "}
          <a href="#" className="text-[#001aff]">
            VVD SHOP
          </a>{" "}
          Đã đăng ký Bản quyền. Được cung cấp bởi
          <a className="text-[#001aff]" href="https://facebook.com/vuvandinhh">
            {" "}
            VŨ ĐỊNH.
          </a>
        </p>
        <div className="flex flex-wrap md:flex-nowrap items-center text-center md:text-start gap-3">
          <p className="w-full  mt-2">Phương thức thanh toán:</p>
          <img
            className="h-10 w-full"
            src="https://demo-uminex.myshopify.com/cdn/shop/files/payment_acfdf180-1e05-48f1-97a2-adca8e5565e8.png?v=1679910794&width=2000"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
