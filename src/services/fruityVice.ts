import useSWR from "swr";

const API_URL = "https://api.fruityvice.com/api/fruit/all";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFruits = () => {
  const { data, error, isLoading } = useSWR(API_URL, fetcher);
  return { data, error, isLoading };
};
