/* eslint-disable no-constant-condition */
import PropTypes from "prop-types";

const Loader = () => {
  return (
    <div className="progress-bar">
      <div className="progress"></div>
    </div>
  );
};
Loader.propTypes = {
  loading: PropTypes.bool,
};
export default Loader;
