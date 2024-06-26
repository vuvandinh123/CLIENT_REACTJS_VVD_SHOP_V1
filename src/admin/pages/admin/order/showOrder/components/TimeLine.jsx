/* eslint-disable react/prop-types */
import { statusOrder } from "./status";

const TimeLine = ({ status = "CONFIRMED" }) => {
  const i = statusOrder.findIndex((item) => item.code === status);
  return (
    <div>
      {/* component */}
      <div className="">
        {/* Card */}
        <div className="relative overflow-hidden w-full h-full rounded-xl">
          <div className="p-6 flex flex-col justify-between  text-center rounded-xl dark:border-gray-700">
            {/* <div>
                <svg
                  className="w-8 h-8 mx-auto mb-4"
                  width={33}
                  height={32}
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_6991_185972)">
                    <path
                      d="M16.3333 0C7.49331 0 0.333313 7.16 0.333313 16C0.333313 23.08 4.91331 29.06 11.2733 31.18C12.0733 31.32 12.3733 30.84 12.3733 30.42C12.3733 30.04 12.3533 28.78 12.3533 27.44C8.33331 28.18 7.29331 26.46 6.97331 25.56C6.79331 25.1 6.01331 23.68 5.33331 23.3C4.77331 23 3.97331 22.26 5.31331 22.24C6.57331 22.22 7.47331 23.4 7.77331 23.88C9.21331 26.3 11.5133 25.62 12.4333 25.2C12.5733 24.16 12.9933 23.46 13.4533 23.06C9.89331 22.66 6.17331 21.28 6.17331 15.16C6.17331 13.42 6.79331 11.98 7.81331 10.86C7.65331 10.46 7.09331 8.82 7.97331 6.62C7.97331 6.62 9.31331 6.2 12.3733 8.26C13.6533 7.9 15.0133 7.72 16.3733 7.72C17.7333 7.72 19.0933 7.9 20.3733 8.26C23.4333 6.18 24.7733 6.62 24.7733 6.62C25.6533 8.82 25.0933 10.46 24.9333 10.86C25.9533 11.98 26.5733 13.4 26.5733 15.16C26.5733 21.3 22.8333 22.66 19.2733 23.06C19.8533 23.56 20.3533 24.52 20.3533 26.02C20.3533 28.16 20.3333 29.88 20.3333 30.42C20.3333 30.84 20.6333 31.34 21.4333 31.18C24.6098 30.108 27.37 28.0667 29.3254 25.3435C31.2807 22.6203 32.3328 19.3525 32.3333 16C32.3333 7.16 25.1733 0 16.3333 0Z"
                      fill="currentColor"
                      className="fill-black dark:fill-white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6991_185972">
                      <rect
                        width={32}
                        height={32}
                        fill="white"
                        transform="translate(0.333313)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  Open source
                </h3>
                <p className="mt-2 text-gray-500">
                  Open Source Software. Find the entire code on our GitHub.
                </p>
              </div> */}
            <div className="mt-8">
              {/* Timeline */}
              <ul className="flex flex-col text-left space-y-1.5">
                {statusOrder.map((item, index) => {
                  if (index <= i) {
                    return (
                      <li
                        key={item.id}
                        className="relative flex gap-x-4 pb-7 overflow-hidden"
                      >
                        <div className="mt-0.5 relative h-full">
                          <div className={`absolute top-7 bottom-0 left-2.5 w-px h-96 -ml-px   ${i !== index && `border-r border-dashed border-gray-400` }`} />
                          {item.icon}
                        </div>
                        <p className={`py-1.5 px-2.5 rounded-full text-xs font-medium text-gray-600 bg-white border border-green-200 border-2 shadow-md  `}>
                          {item.name}
                        </p>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              {/* End Timeline */}
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
    </div>
  );
};

export default TimeLine;
