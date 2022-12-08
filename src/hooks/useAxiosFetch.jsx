import React, { useEffect, useState } from "react";
import axios from "axios";

const useAxiosFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const result = await axios(url);
                setData(result.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useAxiosFetch;
