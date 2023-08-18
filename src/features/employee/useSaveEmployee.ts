import { useEffect, useState } from "react";
import { useApi } from "../../services/useApi";
import { useAlertToasts } from "@/components/AlertToast";
import { ICreateEmployeeDto, IEmployeeEntity } from "types/index";

export function useSaveEmployee() {
  const { addAlert } = useAlertToasts();
  const [payload, setPayload] = useState<ICreateEmployeeDto>();

  const employeeId = payload?._id;

  const { data, fetch } = useApi<IEmployeeEntity, ICreateEmployeeDto>(
    `/employees${employeeId ? `/${employeeId}` : ""}`,
    payload?._id ? "PATCH" : "POST"
  );

  const employee = data?.response;
  const status = data?.status;
  const isSaved = status === "success";
  const isError = status === "error";

  useEffect(() => {
    const doFetch = async () => {
      if (payload) {
        const { _id, ...restPayload } = payload;
        await fetch(restPayload);
      }
      setPayload(undefined);
    };
    if (payload) {
      doFetch();
    }
  }, [payload]);

  useEffect(() => {

    if(isSaved && payload) {
      addAlert({
        message: `Employee record: ${payload.name} ${payload._id ? ' has been updated' : 'has been created'}`,
        severity: 'success'
      })
    }
  }, [payload, isSaved]);


  return { employee, isSaved, save: setPayload };
}
