"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentMember } from "../api/use-current-member";
import { RingLoader } from "react-spinners";
import { LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentUser } from "../api/use-current-user";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const { data: member, isLoading: memberLoading } = useCurrentMember();
  const { data: user, isLoading: userLoading } = useCurrentUser();

  // Loading state (must return)
  if (memberLoading || userLoading) {
    return (
      <div className="flex items-center justify-center p-2">
        <RingLoader size={20} color="#9CA3AF" />
      </div>
    );
  }

  // Guard against null/undefined data
  if (!member || !user) {
    return null;
  }

  const displayName = user.name ?? user.email ?? "User";
  const imageUrl = user.image;
  const avatarFallback = displayName.charAt(0).toUpperCase();
  const { role } = member;

  return (
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
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
        <DropdownMenuItem disabled>You are {role}</DropdownMenuItem>
        <DropdownMenuItem>Get verified</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/donor/dashboard")}>
          Go to Dashboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
