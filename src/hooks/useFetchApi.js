/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useDismount } from ".";

const useFetchApi = ({ URL, params = {}, config = {} }) => {

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const disMount = useDismount();
    const fetch = async () => {
        try {
            setLoading(true);

            setError(null);
            const response = [];
            if (disMount) {
                setData(response);
                setLoading(false);
            }
        } catch (error) {
            setError("ERROR", error.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        if (disMount) {
            fetch();
        }
    }, [disMount, params?.limit])
    return {
        data, loading, error
    }
}
export default useFetchApi