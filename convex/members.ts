import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

/**
 * Create a new member profile
 * This mutation creates a complete member profile for the authenticated user
 */
export const createMemberProfile = mutation({
  args: {
    age: v.number(),
    bloodType: v.union(
      v.literal("A+"),
      v.literal("A-"),
      v.literal("B+"),
      v.literal("B-"),
      v.literal("AB+"),
      v.literal("AB-"),
      v.literal("O+"),
      v.literal("O-")
    ),
    gender: v.union(v.literal("male"), v.literal("female"), v.literal("other")),
    role: v.union(v.literal("donor"), v.literal("recipient")),
    location: v.string(),
    locationPermissionGranted: v.boolean(),
    phone: v.string(),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate user is authenticated
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated to create a profile");
    }

    // Check if profile already exists for this user
    const existingProfile = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    if (existingProfile) {
      throw new Error("Profile already exists for this user");
    }

    // Create the member profile
    const memberId = await ctx.db.insert("members", {
      userId,
      age: args.age,
      bloodType: args.bloodType,
      gender: args.gender,
      role: args.role,
      location: args.location,
      locationPermissionGranted: args.locationPermissionGranted,
      phone: args.phone,
      bio: args.bio || "",
      profileCompleted: true,
      createdAt: Date.now(),
    });

    // Return the created member document
    const member = await ctx.db.get(memberId);
    return member;
  },
});

/**
 * Get the current authenticated user's member profile
 */
export const getCurrentMemberProfile = query({
  args: {},
  handler: async (ctx) => {
    // Get authenticated user
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    // Query member profile by userId
    const member = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    return member;
  },
});

/**
 * Check if the current user has completed their profile
 * Returns boolean indicating profile completion status
 */
export const checkProfileCompletion = query({
  args: {},
  handler: async (ctx) => {
    // Get authenticated user
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return false;
    }

    // Query member profile
    const member = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    // Return profile completion status
    return member?.profileCompleted ?? false;
  },
});

/**
 * Get all members with recipient role
 * Returns all recipients with their user information
 */
export const getAllRecipients = query({
  args: {},
  handler: async (ctx) => {
    // Query all members with recipient role
    const recipients = await ctx.db
      .query("members")
      .withIndex("by_user_role", (q) => q.eq("role", "recipient"))
      .collect();

    // Get user information for each recipient
    const recipientsWithUserInfo = await Promise.all(
      recipients.map(async (recipient) => {
        const user = await ctx.db.get(recipient.userId);
        return {
          ...recipient,
          userName: user?.name || user?.email || "Unknown",
          userEmail: user?.email,
          userImage: user?.image,
        };
      })
    );

    return recipientsWithUserInfo;
  },
});
