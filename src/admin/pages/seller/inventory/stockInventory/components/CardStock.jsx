/* eslint-disable react/prop-types */

const CardStock = ({
  title,
  value,
  isChange = true,
  icon,
  filter,
  change,
  changeValue,
}) => {
  return (
    <article className="rounded-lg border shadow-sm border-gray-100 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-medium text-gray-900">{value}</p>
        </div>

        <span className="rounded-full bg-blue-100 p-3 text-blue-600">
          {icon ? (
            icon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          )}
        </span>
      </div>
      {isChange && (
        <div
          className={`my-3 gap-1 flex items-center ${
            change === "decrement" ? "text-red-500" : " text-green-500"
          }`}
        >
          {change === "decrement" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          )}

          <p className="flex gap-2 text-xs">
            <span className="font-medium"> {Math.abs(changeValue)}% </span>

            <span className="text-gray-500">
              So với{" "}
              {filter === "week"
                ? "tuần"
                : filter === "month"
                ? "tháng"
                : "năm"}{" "}
              trước{" "}
            </span>
          </p>
        </div>
      )}
    </article>
  );
};

export default CardStock;
