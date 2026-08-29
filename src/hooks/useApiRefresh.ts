import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Performs given API call and stores the data, loading state and errors into a react state.
 * @param a The api call to fetch
 * @returns The API data, loading state and errors.
 */
export function useApiRefresh<T>(apiCall: () => Promise<T>) {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown | undefined>();

    const apiCallRef = useRef(apiCall);
    apiCallRef.current = apiCall;

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(undefined);

        try {
            const result = await apiCallRef.current();
            setData(result);
        } catch (err) {
            setError(err);
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refresh: fetchData };
}
