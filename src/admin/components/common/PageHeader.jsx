/* eslint-disable react/prop-types */
// hooks
import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";

// utils
import PropTypes from "prop-types";
import dayjs from "dayjs";

// icons
import { FaArrowsRotate } from "react-icons/fa6";
const PageHeader = ({ title, setRefresh,refresh }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { width } = useWindowSize();
  const dateFormat = width < 768 ? "MM.DD.YYYY" : "MMMM DD, YYYY";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <>
      <div className="mt-16 shadow-sm border bg-white rounded-md">
        <div
          className="card no-hover flex flex-col gap-5 !p-5 mb-1  md:!p-[26px] lg:!py-5 lg:flex-row
                 lg:items-center lg:gap-4"
        >
          <h1 className="flex-1 uppercase text-center lg:text-left font-bold text-lg">
            {title}
          </h1>
          <button
            onClick={() => setRefresh(!refresh)}
            className="group hidden w-fit xl:flex items-center gap-2 font-heading font-semibold
                        text-header text-sm"
          >
            Data Refresh
            <FaArrowsRotate className="text-[20px] animate-spin-slow group-hover:animate-spin"></FaArrowsRotate>
          </button>
          <div
            className="h-11 bg-body flex items-center justify-center rounded-md px-9 font-heading font-bold
                    text-header text-sm border border-input-border lg:w-[310px]"
          >
            {dayjs(currentTime).format(`${dateFormat} HH`)}
            <span className="animate-pulse-fast">:</span>
            {dayjs(currentTime).format("mm A")}
          </div>
        </div>
      </div>
    </>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default PageHeader;
