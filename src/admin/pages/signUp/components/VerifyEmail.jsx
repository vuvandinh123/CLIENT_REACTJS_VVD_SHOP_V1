import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { Link } from "react-router-dom";
const VerifyEmail = ({email}) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[51]"></div>
      <div className="fixed inset-0 z-[51] flex justify-center items-center">
        <div className="">
          <div>
            <div className="flex min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              ></span>
              <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right  sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="flex items-center justify-center">
                    <MdOutlineMarkEmailUnread size="40"></MdOutlineMarkEmailUnread>
                  </div>
                  <div className="mt-2 text-center">
                    <h3
                      className="text-lg uppercase font-medium leading-6 text-gray-800 "
                      id="modal-title"
                    >
                      Xác thực email
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 ">
                      Chúng tôi đã gửi đến <a href={`mailto:${email}`} className="text-blue-500 underline">{email || ""}</a> xác nhận đăng ký bán
                      hàng vui lòng nhấn vô liên kết mà chúng tôi gửi đến email
                      của bạn để xác nhận.
                    </p>
                  </div>
                </div>
                <div className="mt-5 sm:flex sm:items-center sm:justify-between">
                    <a href="mailto:vuvandinh203@gmail.com" className="underline text-gray-500">Yêu cầu hỗ trợ</a>
                  <div className="sm:flex sm:items-center ">
                    <Link
                      to={"/admin/login"}
                      className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2   hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                    >
                      Thoát
                    </Link>
                    <a
                      href="https://mail.google.com/mail/u/0/#inbox"
                      className="w-full px-5 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    >
                      Xem email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
