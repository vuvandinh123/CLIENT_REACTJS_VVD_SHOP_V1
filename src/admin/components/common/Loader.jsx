/* eslint-disable react/prop-types */

const Loader = ({ label }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <div className="loader"></div>
      <p className="text-center text-white opacity-100 mt-3">
        {label ? label : "Đang tải vui lòng đợi trong giât lát..."}
      </p>
    </div>
  );
};

export default Loader;
