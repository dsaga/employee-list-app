import { RANDOM_USER_SERVICE_URL } from "@/constants";
import { useEffect } from "react";
import useSWR from "swr";

interface IRandomUserMetaProps {
  employeeId: string;
}

type IPictureData = {
  large: string;
  medium: string;
  thumbnail: string;
};

interface IRandomUserMetaResponseDto {
  results: Array<{
    picture: IPictureData;
  }>;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useRandomUserMeta({ employeeId }: IRandomUserMetaProps) {
  const pictureDataFromLocalStorage = localStorage.getItem(
    `employee-${employeeId}-picture`
  );
  const initialData = pictureDataFromLocalStorage
    ? { results: [{ picture: JSON.parse(pictureDataFromLocalStorage) }] }
    : undefined;

  const { data, error } = useSWR<IRandomUserMetaResponseDto>(
    !initialData
      ? `${RANDOM_USER_SERVICE_URL}/?results=1&seed=${employeeId}&inc=picture`
      : null,
    fetcher,
    {
      refreshInterval: 1000 * 60 * 60 * 24,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        `employee-${employeeId}-picture`,
        JSON.stringify(data.results[0].picture)
      );
    }
  }, [data, employeeId]);

  const picture = initialData
    ? initialData.results[0].picture
    : data?.results[0].picture;

  return { picture, error };
}
