/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { arraysMatch } from "../utils";

export default function useSelectOptionProduct({data,setData}) {
    const [variantSelect, setVariantSelect] = useState({});
    const [options, setOptions] = useState({
        variant: {},
        code:""
    });
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    });

    useEffect(() => {
        if (Object.keys(variantSelect).length > 0) {
            let code = "";
            for (let key in variantSelect) {
                code += variantSelect[key] + ",";
            }
            const arr = code.split(",");
            arr.pop();
            data.variant.productVariants.filter((item) => {
                if (arraysMatch(arr, item.code.split("-"))) {
                    setOptions({
                        ...options,
                        variant: {
                            variantSelect,
                            code: item.code,
                        },
                    });
                }
            });
        }
    }, [variantSelect]);
    useEffect(() => {
        if (options.variant.code) {
            data.variant.productVariants.forEach((item) => {
                if (item.code === options.variant.code) {
                    setData({
                        ...data,
                        price: Number(item.price),
                        quantity: item.stock,
                    });
                    return;
                }
            });
        }
    }, [options.variant.code]);
    return {
        variantSelect,
        setVariantSelect,
        options,
    }
}