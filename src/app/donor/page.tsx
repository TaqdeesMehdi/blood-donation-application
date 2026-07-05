"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { MemberProfileForm } from "../../features/members/components/member-profile-form";
import { DonorView } from "@/features/donor/views/donor-view";

export default function DonorPage() {
  const currentProfile = useQuery(api.members.getCurrentMemberProfileByRole, {
    role: "donor",
  });

  // Show loading state
  if (currentProfile === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="container mx-auto p-6">
        <MemberProfileForm defaultRole="donor" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <DonorView />
    </div>
  );
}
