import useSWR from "swr";
import { getUserAction } from "@/actions/get-user";

export function useUser() {
  return useSWR("user", getUserAction);
}
