import { useEffect, useState } from "react";
import { useApi } from "../../services/useApi";
import { IDeleteEmployeeDto } from "types/index";
import { useAlertToasts } from "@/components/AlertToast";

interface IDeleteEmployeeProps {
  softDelete?: boolean;
}

export function useDeleteEmployee({ softDelete }: IDeleteEmployeeProps) {
  const { addAlert } = useAlertToasts();

  const [payload, setPayload] = useState<IDeleteEmployeeDto>();

  const deletePart = softDelete ? "soft-delete" : "permanent-delete";

  const { fetch, data } = useApi(
    `/employees/${deletePart}/${payload?.employeeId}`,
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
    if (isDeleted) {
      addAlert({
        message: `Employee record: ${payload?.employeeId} deleted successfully.`,
        severity: "success",
      });
    }
  }, [isDeleted, addAlert, payload]);

  return { isDeleted, deleteEmployee: setPayload };
}
