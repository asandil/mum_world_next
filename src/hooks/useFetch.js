
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

const useFetch = (url, method = "GET", options = {}) => {
  const queryClient = useQueryClient();
  const optionsString = JSON.stringify(options);

  const requestOptions = useMemo(() => {
    const opts = { ...options };
    if (method === "POST" && !opts.data) {
      opts.data = {};
    }
    return opts;
  }, [method, optionsString]);

  const { data, isLoading, error } = useQuery({
    queryKey: [url, method, requestOptions],
    queryFn: async () => {
      const { data: response } = await axios({
        url,
        method,
        ...requestOptions,
      });
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - data won't refetch for 5 min
    gcTime: 10 * 60 * 1000, // 10 minutes - cache kept for 10 min
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: [url, method, requestOptions] });
  };

  return { data: data ?? null, loading: isLoading, error: error?.message ?? null, refetch };
};

export default useFetch;
