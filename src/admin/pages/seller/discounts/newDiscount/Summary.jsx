import { useFormikContext } from "formik";
import toast from "react-hot-toast";
import { formathDate } from "../../../../../utils";
import { RxClipboardCopy } from "react-icons/rx";
const Summary = () => {
  const { values } = useFormikContext();
  return (
    <div className="sticky top-0 h-max left-0">
      <div className="rounded-lg  top-0 bg-white shadow-md p-5  ">
        <h3 className="text-xl font-bold">Tóm tắt</h3>
        <p className="mt-2 mb-4 text-sm font-medium text-gray-400">
          Tổng hợp giảm giá
        </p>
        <div className="">
          <div>
            <p className="relative flex w-full items-center rounded-lg border bg-white   px-3 py-2 outline-blue-400">
              {values.code ? values.code : "N/A"}
              <span
                onClick={async () => {
                  await navigator.clipboard.writeText(values.code);
                  toast.success("Copied");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer px-2 py-2"
              >
                <RxClipboardCopy></RxClipboardCopy>
              </span>
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold">Mô tả</p>
            <div>
              <div className="my-2 flex items-center justify-between text-sm ">
                <div>Áp dụng cho:</div>
                <div>{values.applies_to || "N/A"}</div>
              </div>
              <div className="my-2 flex items-center justify-between text-sm ">
                <div>Loại giảm giá:</div>
                <div>{values.type_price || "N/A"}</div>
              </div>
              <div className="my-2 flex items-center justify-between text-sm ">
                <div>Giảm:</div>
                <div>{values.value || "N/A"}</div>
              </div>
              <div className="my-2 flex items-center justify-between text-sm ">
                <div>Loại:</div>
                <div>{values.type || "N/A"}</div>
              </div>
              <div className="my-2 flex items-center justify-between text-sm ">
                <div>Sử dụng tối đa :</div>
                <div>{values.max_uses || "N/A"}</div>
              </div>
              <div className="my-2 flex items-center justify-between text-sm ">
                <div>Đơn hàng tối thiểu :</div>
                <div>{values.min_order_value || "N/A"}</div>
              </div>
              <div className="my-2 flex items-center justify-between text-sm ">
                <div>Số lượng sử dụng:</div>
                <div>{values.max_uses_per_user || "N/A"}</div>
              </div>
              <div className="my-2 flex items-center  justify-between gap-2 text-sm ">
                <div className="">Ngày bắt đầu :</div>
                <div className="">
                  {values.start_date ? formathDate(values.start_date) : "N/A"}
                </div>
              </div>
              <div className="my-2 flex flex-wrap items-center justify-between text-sm ">
                <div>Ngày kết thúc :</div>
                <div>
                  {values.end_date ? formathDate(values.end_date) : "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
