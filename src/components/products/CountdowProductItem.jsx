/* eslint-disable react/prop-types */
import React from "react";
import { useCountDown } from "../../hooks";

const CountdowProductItem = ({ end_date }) => {
  const timeCountDown = new Date(end_date).getTime();
  const { time } = useCountDown(timeCountDown);
  return <div className="flex absolute -top-5 gap-2">
    <span className="bg-red-500 text-white p-1 w-7 text-center rounded text-xs">{time.days}d</span>
    <span className="bg-red-500 text-white p-1 w-7 text-center rounded text-xs">{time.hours}h</span>
    <span className="bg-red-500 text-white p-1 w-7 text-center rounded text-xs">{time.minutes}m</span>
    <span className="bg-red-500 text-white p-1 w-7 text-center rounded text-xs">{time.seconds}s</span>
  </div>;
};

export default CountdowProductItem;
