import { useCountDown } from "../../../hooks";
import PropTypes from "prop-types";
const CountDown = ({ end_time }) => {
  const timeCountDown = new Date(end_time).getTime();
  const { time } = useCountDown(timeCountDown);
  return (
    <div className="border mt-3  bg-[#F9F2F2] flex flex-col md:flex-row gap-2 justify-between items-center border-red-400 rounded-md p-3">
      <div className="text-red-500  font-bold">
        Nhanh lên! Khuyến mãi kết thúc sau:
      </div>
      <div className="flex items-center gap-1 text-white  ">
        <span className="bg-[#DD3327] block w-[90px] px-4 py-1 text-[10px]">
          <span className="text-lg font-bold">{time.days}</span> Ngày
        </span>
        <span className="bg-[#DD3327] block w-[90px] px-4 py-1 text-[10px]">
          <span className="text-lg font-bold">{time.hours}</span> Giờ
        </span>
        <span className="bg-[#DD3327] block w-[90px] px-4 py-1 text-[10px]">
          <span className="text-lg font-bold">{time.minutes}</span> Phút
        </span>
        <span className="bg-[#DD3327] block w-[90px] px-4 py-1 text-[10px]">
          <span className="text-lg font-bold">{time.seconds}</span> Giây
        </span>
      </div>
    </div>
  );
};
CountDown.propTypes = {
  end_time: PropTypes.string.isRequired,
};
export default CountDown;
