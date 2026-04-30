"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DonorProfileSection } from "../components/donor-profile-section";

export const RecipientDashboardView = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentProfile = useQuery(api.members.getCurrentMemberProfile);
  const setEmergencyAlert = useMutation(api.members.setEmergencyAlert);
  const isEmergencyActive = currentProfile?.isEmergencyAlert ?? false;

  const handleEmergencyAlert = async () => {
    if (isEmergencyActive || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await setEmergencyAlert({ isEmergencyAlert: true });
      toast.success("Emergency alert activated");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send alert";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 rounded-lg border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-red-700">
            Emergency Alert
          </h2>
          <p className="text-sm text-red-600">
            Notify nearby donors that you need blood urgently.
          </p>
        </div>
        <Button
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={handleEmergencyAlert}
          disabled={
            isEmergencyActive || isSubmitting || currentProfile === undefined
          }
        >
          <AlertTriangle className="size-4 mr-2" />
          {isEmergencyActive
            ? "Emergency Alert Active"
            : isSubmitting
              ? "Sending Alert..."
              : "Send Emergency Alert"}
        </Button>
      </div>
      <DonorProfileSection />
    </div>
  );
};
