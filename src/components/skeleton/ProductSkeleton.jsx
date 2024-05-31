
const ProductSkeleton = () => {
  return (
    <div className="w-[200px]">
      <div className="mx-1 animate-pulse flex h-full flex-col justify-between  group rounded-md overflow-hidden relative   ">
        <div className="px-5 ">
          <div className="cursor-pointer relative min-h-[140px] bg-gray-200"></div>
        </div>
        <div className="px-[10px] relative left-0  pb-5 transition-all mt-0 z-20 py-3 ">
          <h3 className="text-[15px] bg-gray-200 text-ellipsis h-10 w-full line-clamp-2 leading-[1.2em] max-h-[2.4em]  overflow-hidden "></h3>
          <div className="flex items-center bg-gray-200 mt-2 gap-2">
          </div>
          <div className="flex bg-gray-200 items-center gap-3">
           
          </div>
          <div className={``}>
            <div
              className={`h-2 mt-3 rounded-xl relative flex bg-[#00000016] `}
            >
            </div>
            <p className="text-gray-500 bg-gray-200 mt-3">
              <span className="text-black font-bold"></span>{" "}
            </p>
          </div>
          <div className={` mt-6 h-2`}>
            <div className="flex items-center text-[#1c8e24] text-[12px] ">
              <span className="text-black ms-2"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
