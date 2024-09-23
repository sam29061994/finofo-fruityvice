import { Fruit } from "@/components/FruitList";
import useSWR from "swr";

const API_URL = "api/fruits";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFruits = () => {
  const { data, error, isLoading } = useSWR<Fruit[]>(API_URL, fetcher);
  return { data: data || [], error, isLoading };
};
