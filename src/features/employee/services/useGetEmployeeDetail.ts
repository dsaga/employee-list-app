import { useEffect } from "react";
import { useApi } from "@/services/useApi";
import { IEmployeeEntity } from "types/index";

interface IGetEmployeeDetailProps {
  id?: string;
}

export function useGetEmployeeDetail({ id }: IGetEmployeeDetailProps) {
  const { data, fetch } = useApi<IEmployeeEntity>(`/employees/${id}`, "GET");

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, []);

  return {
    employee: data.response,
    isLoading: data.status === "loading",
    reload: fetch,
  };
}
