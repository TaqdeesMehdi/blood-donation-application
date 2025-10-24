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

interface RecipientProfileSectionProps {
  onLocationClick?: (recipient: Recipient) => void;
}

type Recipient = {
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

export const RecipientProfileSection = ({
  onLocationClick,
}: RecipientProfileSectionProps) => {
  const recipients = useQuery(api.members.getAllRecipients);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(
    null
  );

  // Loading state
  if (recipients === undefined) {
    return (
      <div className="flex items-center justify-center p-8">
        <RingLoader size={40} color="#EF4444" />
      </div>
    );
  }

  // No recipients found
  if (!recipients || recipients.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No recipients found</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-4 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Recipients Looking for Blood
      </h2>

      {/* Scrollable container for cards */}
      <ScrollArea className="h-[600px] max-h-[70vh] rounded-lg border border-gray-100 p-2">
        <div className="flex flex-col gap-y-4">
          {recipients.map((recipient) => (
            <div
              key={recipient._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {recipient.userImage ? (
                    <Image
                      src={recipient.userImage}
                      alt={recipient.userName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">
                        {recipient.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {recipient.userName}
                  </h3>
                  <p className="text-sm text-gray-500">{recipient.userEmail}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      {recipient.bloodType}
                    </span>
                    <span className="text-xs text-gray-500">
                      {recipient.age} years
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{recipient.location}</span>
                  <span className="capitalize">{recipient.gender}</span>
                </div>

                {/* Action buttons */}
                <div className="mt-3 flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedRecipient(recipient);
                      setOpen(true);
                    }}
                  >
                    View Details
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (onLocationClick) {
                        onLocationClick(recipient);
                      }
                    }}
                  >
                    Location
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Details Dialog */}
      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSelectedRecipient(null);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedRecipient
                ? selectedRecipient.userName
                : "Recipient Details"}
            </DialogTitle>
            <DialogDescription>
              Detailed information about the recipient and their requirements.
            </DialogDescription>
          </DialogHeader>

          {selectedRecipient && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {selectedRecipient.userImage ? (
                    <Image
                      src={selectedRecipient.userImage}
                      alt={selectedRecipient.userName}
                      width={72}
                      height={72}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-bold text-xl">
                        {selectedRecipient.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-bold">
                    {selectedRecipient.userName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedRecipient.userEmail}
                  </p>
                  {selectedRecipient.phone && (
                    <p className="text-sm text-gray-600">
                      Phone: {selectedRecipient.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Age</div>
                  <div className="font-medium">
                    {selectedRecipient.age} years
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Gender</div>
                  <div className="font-medium capitalize">
                    {selectedRecipient.gender}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Blood Type</div>
                  <div className="font-medium inline-flex items-center px-2 py-0.5 rounded text-sm bg-red-100 text-red-800">
                    {selectedRecipient.bloodType}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="font-medium">
                    {selectedRecipient.location}
                  </div>
                </div>
              </div>

              {selectedRecipient.bio && (
                <div>
                  <div className="text-xs text-gray-500">Bio</div>
                  <div className="text-gray-700">{selectedRecipient.bio}</div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="mt-6">
            <div className="flex justify-end w-full">
              <Button
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
