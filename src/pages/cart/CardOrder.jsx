/* eslint-disable react/prop-types */

import CartItem from "./components/CartItem";
import { Divider, Dropdown, Radio } from "keep-react";
import { useEffect, useState } from "react";

import CartShop from "./components/CartShop";

const CardOrder = ({ data, ...props }) => {
  return (
    <>
      {data?.length > 0 &&
        data.map((item) => {
          return <CartShop key={item.id} {...props} data={item}></CartShop>;
        })}
    </>
  );
};

export default CardOrder;
