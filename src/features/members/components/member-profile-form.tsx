"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  memberProfileFormSchema,
  type MemberProfileFormInput,
  type MemberProfileFormData,
  bloodTypes,
  genders,
  roles,
  type MemberRole,
} from "../types";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MemberProfileFormProps {
  defaultRole?: MemberRole;
}

export const MemberProfileForm = ({ defaultRole }: MemberProfileFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createProfile = useMutation(api.members.createMemberProfile);

  const form = useForm<MemberProfileFormInput>({
    resolver: zodResolver(memberProfileFormSchema),
    defaultValues: {
      age: "",
      weight: "",
      bloodType: "",
      gender: "",
      role: defaultRole ?? "",
      location: "Multan, Punjab, Pakistan",
      locationPermissionGranted: false,
      phone: "",
    },
  });

  const selectedRole = defaultRole ?? form.watch("role");

  const onSubmit = async (formData: MemberProfileFormInput) => {
    try {
      setIsSubmitting(true);

      const resolvedRole = (defaultRole ?? formData.role) as MemberRole;
      const data: MemberProfileFormData = {
        age: parseInt(formData.age, 10),
        weight: Number.parseFloat(formData.weight),
        bloodType: formData.bloodType as (typeof bloodTypes)[number],
        gender: formData.gender as (typeof genders)[number],
        role: resolvedRole,
        location: formData.location,
        locationPermissionGranted: formData.locationPermissionGranted,
        phone: formData.phone,
      };

      await createProfile({
        role: data.role,
        age: data.age,
        weight: data.weight,
        bloodType: data.bloodType,
        gender: data.gender,
        location: data.location,
        locationPermissionGranted: data.locationPermissionGranted,
        phone: data.phone,
        bio: "",
      });

      toast.success("Profile completed successfully!", {
        description: `Redirecting to ${data.role} dashboard...`,
      });

      router.replace(data.role === "donor" ? "/donor" : "/recipient");
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Failed to create profile", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Complete Your Profile
        </CardTitle>
        <CardDescription>
          Please provide the following information to continue. All fields are
          required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone Number <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    We&apos;ll use this to contact you for donations
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Blood Type <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your blood type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bloodTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Your blood type is crucial for matching
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Gender <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={isSubmitting}
                    >
                      {genders.map((gender) => (
                        <FormItem
                          key={gender}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={gender} />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            {gender}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {defaultRole ? (
              <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                Creating a {defaultRole} profile for this account.
              </div>
            ) : (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-semibold">
                      I want to register as:{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                        disabled={isSubmitting}
                      >
                        {roles.map((role) => (
                          <FormItem
                            key={role}
                            className="flex items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent transition-colors"
                          >
                            <FormControl>
                              <RadioGroupItem value={role} />
                            </FormControl>
                            <FormLabel className="font-normal capitalize cursor-pointer flex-1">
                              {role}
                              <span className="block text-sm text-muted-foreground">
                                {role === "donor"
                                  ? "I want to donate blood to help others"
                                  : "I am looking for blood donors"}
                              </span>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      This will determine your dashboard and features
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Age <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      min={selectedRole === "donor" ? 18 : 0}
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    {selectedRole === "donor"
                      ? "Donors must be at least 18 years old"
                      : selectedRole === "recipient"
                        ? "Recipients can be in any age bracket"
                        : "Select donor or recipient to see age requirement"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Weight (kg) <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your weight"
                      min={1}
                      step="0.1"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Helps donors and recipients understand eligibility
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Location <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      disabled
                      className="bg-muted cursor-not-allowed"
                    />
                  </FormControl>
                  <FormDescription>
                    Currently serving Multan area only
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationPermissionGranted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Allow browser to access your location for better results{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormDescription>
                      This helps us connect you with nearby donors/recipients
                      more efficiently. Your privacy is protected and location
                      data is only used for matching purposes.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Completing Profile...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
