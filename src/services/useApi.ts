import { useCallback, useState } from "react";
import { BACKEND_API_PATH } from "../constants";
import { useAlertToasts } from "@/components/AlertToast";

interface IErrorState {
  message: Array<string>;
}

interface IApiState<T> {
  status: "idle" | "loading" | "error" | "success";
  response: T | null;
}

export function useApi<T, R = null>(path: string, method: string) {
  const { addAlert } = useAlertToasts();
  const [data, setData] = useState<IApiState<T>>({
    status: "idle",
    response: null,
  });

  const fetchApi = useCallback(
    async (payload?: R) => {
      setData({ status: "loading", response: null });
      try {
        const response = await fetch(`${BACKEND_API_PATH}${path}`, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: method === "GET" ? undefined : JSON.stringify(payload),
        });

        // check if response is not empty
        if (response.status === 204) {
          setData({ status: "success", response: null });
        } else if (response.status >= 400) {
          const data = (await response.json()) as T & IErrorState;
          setData({
            status: "error",
            response: null,
          });
          data.message.forEach((message) => {
            addAlert({ message, severity: "error" });
          });
        } else {
          const data = (await response.json()) as T & IErrorState;
          setData({ status: "success", response: data });
        }
      } catch (error) {
        setData({
          status: "error",
          response: null,
        });
        addAlert({ message: "Something went wrong!", severity: "error" });
      }
    },
    [path, method, addAlert, setData]
  );

  return { data, fetch: fetchApi };
}
