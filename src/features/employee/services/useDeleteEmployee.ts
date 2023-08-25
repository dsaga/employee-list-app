import { useEffect, useState } from "react";
import { useApi } from "@/services/useApi";
import { IDeleteEmployeeDto } from "types/index";
import { useAlertToasts } from "@/components/AlertToast";
import { useEmployeeStore } from "./useEmployeeStore";

interface IDeleteEmployeeProps {
  softDelete?: boolean;
}

export function useDeleteEmployee({ softDelete }: IDeleteEmployeeProps) {
  const { addAlert } = useAlertToasts();

  const deleteEmployee = useEmployeeStore((store) =>
    softDelete ? store.deleteEmployee : store.hardDelete
  );

  const [payload, setPayload] = useState<IDeleteEmployeeDto>();

  const deletePart = softDelete ? "" : "permanent";

  const { fetch, data } = useApi(
    `/employees/${payload?.employeeId}/${deletePart}`,
    "DELETE"
  );

  const isDeleted = data.status === "success";

  useEffect(() => {
    const doFetch = async () => {
      if (payload) {
        await fetch();
      }
    };
    if (payload) {
      doFetch();
    }
  }, [payload]);

  useEffect(() => {
    if (isDeleted && payload?.employeeId) {
      deleteEmployee(payload.employeeId);
      addAlert({
        message: `Employee record: ${payload.employeeId} deleted successfully.`,
        severity: "success",
      });
    }
  }, [isDeleted, addAlert, payload]);

  return { isDeleted, save: setPayload };
}
