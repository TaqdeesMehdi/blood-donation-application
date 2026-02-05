"use client";

import { useState } from "react";
import { RecipientMapLocation } from "../components/recipient-map-location";
import { RecipientProfileSection } from "../components/recipient-profile-section";

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
  latitude?: number;
  longitude?: number;
};

export const DonorDashboardView = () => {
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(
    null,
  );

  const handleLocationClick = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 min-h-screen w-full p-4">
      <div className="w-full lg:w-1/3">
        <RecipientProfileSection onLocationClick={handleLocationClick} />
      </div>
      <div className="w-full lg:w-2/3">
        <RecipientMapLocation selectedRecipient={selectedRecipient} />
      </div>
    </div>
  );
};
