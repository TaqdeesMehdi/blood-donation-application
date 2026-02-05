"use client";

import { useEffect } from "react";
import { useGeolocation } from "react-use";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const RecipientDashboardView = () => {
  const state = useGeolocation();
  const updateLocation = useMutation(api.members.updateMemberLocation);

  useEffect(() => {
    // Check if geolocation is available and position is obtained
    if (!state.loading && !state.error && state.latitude && state.longitude) {
      // Update location in the database
      updateLocation({
        latitude: state.latitude,
        longitude: state.longitude,
      })
        .then(() => {
          toast.success("Location updated successfully");
        })
        .catch((error) => {
          toast.error("Failed to update location: " + error.message);
        });
    }

    // Show error if geolocation fails
    if (state.error) {
      toast.error("Geolocation error: " + state.error.message);
    }
  }, [
    state.loading,
    state.error,
    state.latitude,
    state.longitude,
    updateLocation,
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recipient Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Location</h2>

        {state.loading && (
          <p className="text-gray-600">Getting your location...</p>
        )}

        {state.error && (
          <div className="text-red-600">
            <p className="font-semibold">Location Error:</p>
            <p>{state.error.message}</p>
            <p className="text-sm mt-2">
              Please enable location access in your browser settings.
            </p>
          </div>
        )}

        {!state.loading &&
          !state.error &&
          state.latitude &&
          state.longitude && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Latitude:</span>
                <span className="text-gray-700">
                  {state.latitude.toFixed(6)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Longitude:</span>
                <span className="text-gray-700">
                  {state.longitude.toFixed(6)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Accuracy:</span>
                <span className="text-gray-700">
                  {state.accuracy
                    ? `${state.accuracy.toFixed(0)} meters`
                    : "N/A"}
                </span>
              </div>
              <p className="text-sm text-green-600 mt-4">
                ✓ Your location is being shared with donors
              </p>
            </div>
          )}
      </div>
    </div>
  );
};
