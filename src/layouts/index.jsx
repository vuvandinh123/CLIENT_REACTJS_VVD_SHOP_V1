import PropTypes  from "prop-types";
import Header from "../components/header";
import { Footer, NavBottom } from "../components/common";
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <NavBottom />
    </div>
  );
};
Layout.defaultProps = {
  children: null,
}
Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
