/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { changeQuantityCartItem, getCart, removeCartItem } from "../service/Cart";
import toast from "react-hot-toast";
import { getCookieAuth } from "../utils";
import { useDispatch } from "react-redux";
import { setToTalCart } from "../redux/slice/cartSlice";

export default function useCart(isOpen = false) {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0);
    const [data, setData] = useState([]);
    const dispatch = useDispatch()
    // function caculate total price
    const caculateTotalPrice = (data) => {
        const amount = data.reduce((acc, item) => {
            const total = item.products.reduce((acc2, item2) => acc2 + Number(item2.amount), 0)
            return acc + total
        }, 0)
        const qty = data.reduce((acc, item) => {
            return acc + item.products.length
        }, 0)
        return {
            amount,
            qty
        }
    }
    const fetchData = async () => {
        setLoading(true)
        const res = await getCart();
        const total = caculateTotalPrice(res.data)
        setTotalPrice()
        dispatch(setToTalCart(total))
        setData(res.data);
        setLoading(false)
    }
    useEffect(() => {
        const { userId } = getCookieAuth();
        if (userId) {
            fetchData();
        }
    }, [refresh, isOpen])
    const handleClickDeleteCartItem = async (id) => {
        const res = await removeCartItem(id);
        if (res) {
            setRefresh(!refresh);
            toast.success("Xóa sản phẩm thành công");
        }
    };
    const hanldeClickPlus = async (id, quantity) => {
        const res = await changeQuantityCartItem({
            cart_item_id: id,
            quantity: Number(quantity) + 1,
        });
        if (res) {
            setRefresh(!refresh);
        }
    };
    const hanldeClickMinus = async (id, quantity) => {
        if (quantity > 1) {
            const res = await changeQuantityCartItem({
                cart_item_id: id,
                quantity: quantity - 1,
            });
            if (res) {
                setRefresh(!refresh);
            }
        }
    };
    return {
        refresh,
        setRefresh,
        handleClickDeleteCartItem,
        hanldeClickPlus,
        hanldeClickMinus,
        totalPrice,
        data,
        setData,
        loading
    }
}