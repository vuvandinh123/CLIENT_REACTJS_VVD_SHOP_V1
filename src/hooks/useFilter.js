import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useFilter = (params) => {
    const navigate = useNavigate();
    useEffect(() => {
        const queryParams = new URLSearchParams();
        if (params.brand.length > 0) {
            queryParams.set("brand", params.brand.join(","));
        }
        if (params.sortBy.length > 0) {
            queryParams.set("sortBy", params.sortBy);
        }
        if (params.price.min) {
            queryParams.set("minPrice", params.price.min);
        }
        if (params.price.max) {
            queryParams.set("maxPrice", params.price.max);
        }
        queryParams.append("limit", params.limit);
        navigate(`?${queryParams.toString()}`);
    }, [params, navigate]);
}
export default useFilter