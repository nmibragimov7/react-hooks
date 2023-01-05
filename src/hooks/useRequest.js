import {useEffect, useState} from "react";

export default function useRequest(request) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            request()
                .then(response => setData(response.data))
                .catch(error => setError(error.message))
                .finally(() => setLoading(false));
        }, 1000);
    }, [request]);

    return [data, loading, error];
}
