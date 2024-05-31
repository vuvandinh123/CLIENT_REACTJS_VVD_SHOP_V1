import { useState } from "react";
import useApiCall from "./useApiCall";
import { getProductById } from "../service/Product";
import toast from "react-hot-toast";
import { getShopById } from "../service/Shop";
export default function useGetProductById(id) {
    const [data, setData] = useState({});
    const [shop, setShop] = useState({});
    const [src, setSrc] = useState("");
    const [loading, setLoading] = useState(true);
    useApiCall(async () => {
        try {
            if (!id) {
                toast.error("Không tìm thấy sản phẩm");
                return
            }
            const respones = await getProductById(id);
            const shop = await getShopById(respones.data.shop_id);
            window.document.title = "Shopdinh - " + respones.data.name;
            setShop(shop.data)
            setData(respones.data)
            setSrc(respones.data.imageUrls[0]);
            setLoading(false);
            return null;
        } catch (error) {
            console.log(error);
            toast.error("Không tìm thấy sản phẩm");
            setLoading(false);
            return null;
        } finally {

            // return null;
        }

    }, [], [])
    return { data, src, setSrc, setData, shop ,loading};
}