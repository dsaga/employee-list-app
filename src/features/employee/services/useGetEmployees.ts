import { useEffect, useState } from "react";
import { useApi } from "@/services/useApi";
import { IGetEmployeeDto } from "types/index";
import { useEmployeeStore } from "./useEmployeeStore";

interface IGetEmployeeProps {
  page?: number;
  limit?: number;
  deleted?: boolean;
}

export function useGetEmployees({
  page = 1,
  limit = 10,
  deleted = false,
}: IGetEmployeeProps) {
  const employees = useEmployeeStore((store) =>
    deleted ? store.deletedEmployees : store.employees
  );
  const setEmployees = useEmployeeStore((store) =>
    deleted ? store.setDeletedEmployees : store.setEmployees
  );

  const [currentPage, setCurrentPage] = useState(page);

  const deletedPart = deleted ? "&deleted=true" : "";

  const { data, fetch } = useApi<IGetEmployeeDto>(
    `/employees?page=${currentPage}&limit=${limit}${deletedPart}`,
    "GET"
  );

  useEffect(() => {
    if (data.response?.employees && currentPage === 1) {
      setEmployees(data.response.employees);
    }
    else if (data.response?.employees && currentPage > 1) {
      setEmployees([...employees, ...data.response.employees]);
    }
  }, [data, currentPage]);
  

  useEffect(() => {
    fetch();
  }, [currentPage]);

  return {
    employees: employees,
    isLoading: data.status === "loading",
    isMore: data.response && data.response.count > currentPage * limit,
    reload: fetch,
    next: () => setCurrentPage(currentPage + 1),
  };
}
