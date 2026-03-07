"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { RingLoader } from "react-spinners";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type Donor = {
  _id: string;
  userName: string;
  userEmail?: string;
  userImage?: string;
  bloodType?: string;
  age?: number;
  location?: string;
  gender?: string;
  phone?: string;
  bio?: string;
};

export const DonorProfileSection = () => {
  const donors = useQuery(api.members.getAllDonors);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);

  if (donors === undefined) {
    return (
      <div className="flex items-center justify-center p-8">
        <RingLoader size={40} color="#EF4444" />
      </div>
    );
  }

  if (!donors || donors.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No donors available at the moment</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Available Donors
      </h2>

      <ScrollArea className="h-[600px] max-h-[70vh] rounded-lg border border-gray-100 p-2">
        <div className="flex flex-col gap-y-4">
          {donors.map((donor) => (
            <div
              key={donor._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {donor.userImage ? (
                    <Image
                      src={donor.userImage}
                      alt={donor.userName}
                      width={48}
                      height={48}
                      className="rounded-full object-cover w-12 h-12"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">
                        {donor.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {donor.userName}
                  </h3>
                  <p className="text-sm text-gray-500">{donor.userEmail}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      {donor.bloodType}
                    </span>
                    <span className="text-xs text-gray-500">
                      {donor.age} years
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{donor.location}</span>
                  <span className="capitalize">{donor.gender}</span>
                </div>

                <div className="mt-3 flex items-center justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedDonor(donor);
                      setOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSelectedDonor(null);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDonor ? selectedDonor.userName : "Donor Details"}
            </DialogTitle>
            <DialogDescription>
              Detailed information about this donor.
            </DialogDescription>
          </DialogHeader>

          {selectedDonor && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {selectedDonor.userImage ? (
                    <Image
                      src={selectedDonor.userImage}
                      alt={selectedDonor.userName}
                      width={72}
                      height={72}
                      className="rounded-full object-cover w-16 h-16"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">
                        {selectedDonor.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-bold">
                    {selectedDonor.userName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedDonor.userEmail}
                  </p>
                  {selectedDonor.phone && (
                    <p className="text-sm text-gray-600">
                      Phone: {selectedDonor.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Age</div>
                  <div className="font-medium">{selectedDonor.age} years</div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Gender</div>
                  <div className="font-medium capitalize">
                    {selectedDonor.gender}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Blood Type</div>
                  <div className="font-medium inline-flex items-center px-2 py-0.5 rounded text-sm bg-red-100 text-red-800">
                    {selectedDonor.bloodType}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="font-medium">{selectedDonor.location}</div>
                </div>
              </div>

              {selectedDonor.bio && (
                <div>
                  <div className="text-xs text-gray-500">Bio</div>
                  <div className="text-gray-700">{selectedDonor.bio}</div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="mt-6">
            <div className="flex justify-end w-full">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
