/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useApiCall } from "../../../hooks";
import { getDelivery } from "../../../service/Delivery";
import DeliveryItem from "./DeliveryItem";
import { useField } from "formik";

const DeliveryMethod = ({ setCost }) => {
  const [field, meta, helpers] = useField("delivery_id");
  useEffect(() => {
    const cost = data?.find((item) => item.id === Number(field.value));
    setCost(Number(cost?.cost));
  }, [field.value]);

  // lấy tất cả phương thức giao hàng
  const { data } = useApiCall(async () => {
    const res = await getDelivery();
    helpers.setValue(res.data[0].id.toString());
    return res.data;
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 ">
        Phương thức giao hàng
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.map((item) => {
          return (
            <DeliveryItem
              setCost={setCost}
              key={item.id}
              data={item}
            ></DeliveryItem>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryMethod;
