"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useCurrentMember } from "../api/use-current-member";
import { RingLoader } from "react-spinners";
import { LogOut, UserCircle, LayoutDashboard, RefreshCcw } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentUser } from "../api/use-current-user";
import { useRouter } from "next/navigation";
import { UserProfileDialog } from "./user-profile-dialog";
import type { MemberRole } from "../types";

interface UserButtonProps {
  targetRole: MemberRole;
}

export const UserButton = ({ targetRole }: UserButtonProps) => {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const { data: member, isLoading: memberLoading } =
    useCurrentMember(targetRole);
  const { data: fallbackMember, isLoading: fallbackLoading } = useCurrentMember(
    targetRole === "donor" ? "recipient" : "donor",
  );
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const [profileOpen, setProfileOpen] = useState(false);

  // Loading state (must return)
  if (memberLoading || fallbackLoading || userLoading) {
    return (
      <div className="flex items-center justify-center p-2">
        <RingLoader size={20} color="#9CA3AF" />
      </div>
    );
  }

  // Guard against null/undefined data
  if (!user) {
    return null;
  }

  const activeMember = member ?? fallbackMember;
  const displayName = user.name ?? user.email ?? "User";
  const imageUrl = user.image;
  const avatarFallback = displayName.charAt(0).toUpperCase();
  const role = activeMember?.role ?? targetRole;
  const dashboardHref =
    targetRole === "donor" ? "/donor/dashboard" : "/recipient/dashboard";
  const switchHref = targetRole === "donor" ? "/recipient" : "/donor";
  const dashboardLabel =
    targetRole === "donor" ? "Donor Dashboard" : "Recipient Dashboard";
  const switchLabel =
    targetRole === "donor" ? "Open Recipient Profile" : "Open Donor Profile";

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative">
          <Avatar className="size-10 hover:opacity-75 transition">
            <AvatarImage alt={displayName} src={imageUrl} />
            <AvatarFallback className="bg-blue-400 text-white font-bold">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" side="bottom" className="w-60">
          <DropdownMenuItem
            onClick={() => setProfileOpen(true)}
            className="cursor-pointer"
            disabled={!activeMember}
          >
            <UserCircle className="size-4 mr-2" />
            View Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push(dashboardHref)}
            className="cursor-pointer"
          >
            <LayoutDashboard className="size-4 mr-2" />
            {dashboardLabel}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push(switchHref)}
            className="cursor-pointer"
          >
            <RefreshCcw className="size-4 mr-2" />
            {switchLabel}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem disabled>
            <span className="text-xs text-gray-500">
              Role: <span className="capitalize font-medium">{role}</span>
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer text-red-600"
          >
            <LogOut className="size-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserProfileDialog
        open={profileOpen && !!activeMember}
        onOpenChange={setProfileOpen}
        user={user}
        member={activeMember!}
      />
    </>
  );
};
