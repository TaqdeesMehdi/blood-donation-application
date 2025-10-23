"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { RingLoader } from "react-spinners";
import Image from "next/image";

export const RecipientProfileSection = () => {
  const recipients = useQuery(api.members.getAllRecipients);

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
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Recipients Looking for Blood
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <span>📍 {recipient.location}</span>
                <span className="capitalize">{recipient.gender}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
