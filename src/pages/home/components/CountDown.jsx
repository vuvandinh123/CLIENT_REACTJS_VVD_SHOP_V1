import { useCountDown } from "../../../hooks";

const CountDown = () => {
  const timeCountDown = new Date("2024-06-22T00:00:00").getTime();
  const { time } = useCountDown(timeCountDown);
  return (
    <div className="flex gap-3">
      <span className="px-3 me-1 py-2 bg-red-600 font-bold rounded-sm text-white">
        {time.days} Ngày
      </span>
      <span className="px-3 me-1 py-2 bg-red-600 font-bold rounded-sm text-white">
        {time.hours} Giờ
      </span>
      <span className="px-3 me-1 py-2 bg-red-600 font-bold rounded-sm text-white">
        {time.minutes} Phút
      </span>
      <span className="px-3 w-20 block py-2 bg-red-600 font-bold rounded-sm text-white">
        {time.seconds} Giây
      </span>
    </div>
  );
};

export default CountDown;
