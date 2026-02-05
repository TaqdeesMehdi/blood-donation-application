"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Droplet,
  Calendar,
  Users,
} from "lucide-react";
import type { Id } from "../../../../convex/_generated/dataModel";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
  member: {
    _id: Id<"members">;
    role: "donor" | "recipient";
    phone: string;
    bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    age: number;
    gender: "male" | "female" | "other";
    location: string;
    bio: string;
    latitude?: number;
    longitude?: number;
    locationPermissionGranted: boolean;
    profileCompleted: boolean;
    createdAt?: number;
  };
}

export const UserProfileDialog = ({
  open,
  onOpenChange,
  user,
  member,
}: UserProfileDialogProps) => {
  const displayName = user.name ?? user.email ?? "User";
  const avatarFallback = displayName.charAt(0).toUpperCase();

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profile Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info Section */}
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage alt={displayName} src={user.image} />
              <AvatarFallback className="bg-blue-400 text-white font-bold text-2xl">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                {displayName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={member.role === "donor" ? "default" : "destructive"}
                  className="capitalize"
                >
                  {member.role}
                </Badge>
                {member.profileCompleted && (
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-600"
                  >
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="size-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium">
                    {user.email || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="size-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium">{member.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Droplet className="size-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Blood Type</p>
                  <p className="text-sm font-medium">{member.bloodType}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="size-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="text-sm font-medium">{member.age} years</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Users className="size-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="text-sm font-medium capitalize">
                    {member.gender}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MapPin className="size-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium">{member.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Coordinates */}
          {member.latitude && member.longitude && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  GPS Coordinates
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Latitude</p>
                    <p className="text-sm font-mono font-medium">
                      {member.latitude.toFixed(6)}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Longitude</p>
                    <p className="text-sm font-mono font-medium">
                      {member.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>
                {member.locationPermissionGranted && (
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <MapPin className="size-3" />
                    Location sharing is enabled
                  </p>
                )}
              </div>
            </>
          )}

          {/* Bio */}
          {member.bio && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Bio
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </>
          )}

          {/* Account Information */}
          <Separator />
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Account Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="text-sm font-medium">
                  {formatDate(member.createdAt)}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Profile Status</p>
                <p className="text-sm font-medium">
                  {member.profileCompleted ? "Complete" : "Incomplete"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
