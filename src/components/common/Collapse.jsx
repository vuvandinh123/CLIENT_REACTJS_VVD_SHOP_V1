import PropTypes  from "prop-types";


const Collapse = ({label, children}) => {
  return (
    <div>
      <div className="py-5 border-b">
        <details className="group">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
            <span className="uppercase font-bold">{label}</span>
            <span className="transition group-open:rotate-180">
              <svg
                fill="none"
                height={24}
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="mt-3">
            {children}
          </div>
        </details>
      </div>
    </div>
  );
};
Collapse.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node
}
export default Collapse;
