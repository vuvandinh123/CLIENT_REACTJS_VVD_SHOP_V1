/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const useApiCall = (apiFunction, deps = [], initialData = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {

      setError(null);
      const response = await apiFunction();
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataWithTimeout = async () => {
      setLoading(true);
      const timeoutId = setTimeout(async () => {
        await fetchData();
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    };
    fetchDataWithTimeout();
    return () => { }
  }, [...deps]);

  return { data, loading, error };
};

export default useApiCall;
