import { useEffect, useState } from "react";
import { useApi } from "../../services/useApi";
import { IGetEmployeeDto } from "types/index";

interface IGetEmployeeProps {
  page?: number;
  limit?: number;
  deleted?: boolean;
}

export function useGetEmployees({
  page = 1,
  limit = 20,
  deleted = false,
}: IGetEmployeeProps) {
  const [currentPage, setCurrentPage] = useState(page);

  const deletedPart = deleted ? "/deleted" : "";

  const { data, fetch } = useApi<IGetEmployeeDto>(
    `/employees${deletedPart}?page=${currentPage}&limit=${limit}`,
    "GET"
  );

  useEffect(() => {
    fetch();
  }, []);

  return {
    employees: data.response?.employees,
    isLoading: data.status === "loading",
    isMore: data.response && data.response.count > currentPage * limit,
    reload: fetch,
    next: () => setCurrentPage((prev) => prev + 1),
  };
}
