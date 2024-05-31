import { currencyConverter } from "../../utils";
import { useSelector } from "react-redux";
import PropTypes  from "prop-types";

const ChangePrice = ({price,className}) => {
  const { priceAr } = useSelector((state) => state.price);
  const priceNew = currencyConverter(price, priceAr);
  return <h3 className={className || "font-bold"}>{priceNew}</h3>;
};
ChangePrice.propTypes = {
    price:PropTypes.number,
    className:PropTypes.string
}
export default ChangePrice;
