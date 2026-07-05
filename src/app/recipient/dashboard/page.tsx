"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { MemberProfileForm } from "../../../features/members/components/member-profile-form";
import { RecipientDashboardView } from "@/features/recipient/views/recipient-dashboard-view";

const RecipientDashboardPage = () => {
  const currentProfile = useQuery(api.members.getCurrentMemberProfileByRole, {
    role: "recipient",
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
        <MemberProfileForm defaultRole="recipient" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <RecipientDashboardView />
    </div>
  );
};

export default RecipientDashboardPage;
