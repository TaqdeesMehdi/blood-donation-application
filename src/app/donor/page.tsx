"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

export default function DonorPage() {
  const router = useRouter();
  const { signOut } = useAuthActions();

  const currentProfile = useQuery(api.members.getCurrentMemberProfile);

  // Redirect if not a donor or profile not completed
  useEffect(() => {
    if (currentProfile === null) {
      // No profile, redirect to home
      router.replace("/");
    } else if (currentProfile && currentProfile.role !== "donor") {
      // Wrong role, redirect to their correct dashboard
      router.replace("/recipient");
    }
  }, [currentProfile, router]);

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

  // If no profile or wrong role, show nothing (redirect will happen)
  if (!currentProfile || currentProfile.role !== "donor") {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Donor Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to your donor dashboard! This is where you&apos;ll manage your
        blood donation activities.
      </p>
      {/* More donor-specific features will be added later */}
      <Button onClick={() => signOut()}>Signout</Button>
    </div>
  );
}
