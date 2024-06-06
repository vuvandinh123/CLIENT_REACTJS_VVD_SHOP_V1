/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourite, getFavourite, removeFavouriteItem } from "../service/Favourite";
import { setQtyFav } from "../redux/slice/favouriteSlice";

export default function useFav() {
    const { isOpen } = useSelector((state) => state.favourite);
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [filter, setFilter] = useState({
        limit: 10,
        page: 1
    })
    useEffect(() => {
        const fetchData = async () => {
            const res = await getFavourite(filter);
            setData(res.data);
            dispatch(setQtyFav(res.data.length))
        }
        if (isOpen || !refresh) {
            fetchData();
        }
    }, [filter.limit, filter.page, refresh, isOpen])

    const handleClickAddToFavourite = async (productId) => {
        const res = await addToFavourite(productId);
        if (res) {
            setRefresh(!refresh);
        }
    }
    const isFav = (productId) => {
        const is = data.find(item => item.id === productId)
        return is;
    }
    const handleClickRemoveFavourite = async (id) => {
        const res = await removeFavouriteItem(id);
        if (res) {
            setRefresh(!refresh)
        }
    }

    return {
        data,
        setFilter,
        filter,
        refresh,
        handleClickAddToFavourite,
        isFav,
        handleClickRemoveFavourite,
    }
}