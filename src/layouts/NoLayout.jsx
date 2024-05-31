import PropTypes  from "prop-types";

const NoLayout = ({ children }) => {
  return <div>{children}</div>;
};
NoLayout.propTypes = {
  children: PropTypes.node,
};
export default NoLayout;
