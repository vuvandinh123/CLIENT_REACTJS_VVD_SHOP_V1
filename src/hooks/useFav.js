import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteFav, setFavList } from "../redux/slice/favouriteSlice";

export default function useFav() {
    const { favAr } = useSelector((state) => state.favourite);
    const dispatch = useDispatch();
    useEffect(() => {
        if (favAr.length > 0) {
            localStorage.setItem("fav", JSON.stringify(favAr));
        }

    }, [favAr]);
    useEffect(() => {
        if (localStorage.getItem("fav")) {
            const favList = localStorage.getItem("fav");
            dispatch(setFavList(JSON.parse(favList)));
        }

    }, [dispatch]);

    const deleteFavourite = (id) => {
        if(favAr.length === 1) {
            localStorage.removeItem("fav");
        }
        dispatch(DeleteFav(id));
    };
    

    return {
        deleteFavourite,
        favAr,
    }
}