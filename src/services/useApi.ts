import { useState } from "react";
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

  const fetchApi = async (payload?: R) => {
    setData({ status: "loading", response: null });
    try {
      const response = await fetch(`${BACKEND_API_PATH}${path}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: method === "GET" ? undefined : JSON.stringify(payload),
      });
      const data = (await response.json()) as T & IErrorState;
      if (response.status >= 400 && data.message.length > 0) {
        setData({
          status: "error",
          response: null,
        });
        data.message.forEach((message) => {
          addAlert({ message, severity: "error" });
        });
      } else {
        setData({ status: "success", response: data });
      }
    } catch (error) {
      setData({
        status: "error",
        response: null,
      });
      addAlert({ message: "Something went wrong!", severity: "error" });
    }
  };

  return { data, fetch: fetchApi };
}
