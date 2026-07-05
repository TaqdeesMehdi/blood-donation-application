import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { MemberRole } from "../types";

export const useCurrentMember = (role: MemberRole) => {
  const data = useQuery(api.members.getCurrentMemberProfileByRole, { role });
  const isLoading = data === undefined;
  return { data, isLoading };
};
