# Member Profile Form - Implementation Tasks

## Overview

Implement a mandatory member profile form that users must complete after successful login. The form should be non-dismissible and prevent navigation until completed. Based on the user's role selection (donor/recipient), they will be redirected to their respective dashboard.

---

## Phase 1: Schema & Database Setup

### Task 1.1: Update Convex Schema

**File:** `convex/schema.ts`

**Actions:**

- [ ] Add new fields to the `members` table:
  - `age`: number (required)
  - `gender`: union of literals ("male", "female", "other")
  - `locationPermissionGranted`: boolean (required)
  - `profileCompleted`: boolean (default: false) - to track if form is filled
  - Update `location` field: make it required (currently optional) and set default value
- [ ] Ensure `bloodType` field includes all 8 blood types (already present)
- [ ] Ensure `role` field has "donor" and "recipient" options (already present)
- [ ] Add index for `profileCompleted` field for efficient queries
- [ ] Run `npx convex dev` to sync schema changes

**Validation:**

- Schema should compile without errors
- All new fields should be properly typed

---

## Phase 2: Convex Mutations & Queries

### Task 2.1: Create Member Profile Mutation

**File:** `convex/members.ts` (create new file)

**Actions:**

- [ ] Create `createMemberProfile` mutation
  - Input parameters: age, bloodType, gender, role, location, locationPermissionGranted
  - Validate that user is authenticated
  - Check if profile already exists for the user
  - Create new member record with all fields
  - Set `profileCompleted` to `true`
  - Set `createdAt` to current timestamp
  - Return the created member document

**Validation:**

- Mutation should handle authentication checks
- Should prevent duplicate profiles for same user

### Task 2.2: Create Member Profile Queries

**File:** `convex/members.ts`

**Actions:**

- [ ] Create `getCurrentMemberProfile` query
  - Get authenticated user's member profile
  - Return null if no profile exists
  - Return member document if exists
- [ ] Create `checkProfileCompletion` query
  - Check if current user has completed their profile
  - Return boolean value
  - Used for middleware/routing decisions

**Validation:**

- Queries should return correct data
- Should handle unauthenticated users gracefully

---

## Phase 3: Form Validation with Zod

### Task 3.1: Create Zod Schema

**File:** `src/features/members/types.ts` (create new file)

**Actions:**

- [ ] Install zod if not already installed: `npm install zod`
- [ ] Create `memberProfileSchema` using Zod:
  - `age`: number, min(18), max(65), required with custom error messages
  - `bloodType`: enum with 8 blood types (A+, A-, B+, B-, AB+, AB-, O+, O-), required
  - `gender`: enum ("male", "female", "other"), required
  - `role`: enum ("donor", "recipient"), required
  - `location`: string, readonly, default "Multan, Punjab, Pakistan", required
  - `locationPermissionGranted`: boolean, required, must be true (refine)
- [ ] Export TypeScript type from Zod schema
- [ ] Add helpful error messages for each field

**Validation:**

- Schema should validate all required fields
- Error messages should be user-friendly
- Age validation should be appropriate for blood donation

---

## Phase 4: Member Profile Form Component

### Task 4.1: Setup Form Structure

**File:** `src/features/members/components/member-profile-form.tsx`

**Actions:**

- [ ] Import required dependencies:
  - `useForm` from `react-hook-form`
  - `zodResolver` from `@hookform/resolvers/zod`
  - Form components from `@/components/ui/form`
  - Input, Select, RadioGroup from shadcn/ui
  - `useMutation` from Convex
- [ ] Initialize form with `useForm`:
  - Pass `memberProfileSchema` to zodResolver
  - Set default values for all fields
  - Set location default to "Multan, Punjab, Pakistan"
- [ ] Setup state management:
  - Loading state for form submission
  - Error state for displaying errors
  - Success state for handling completion

**Validation:**

- Form should initialize with correct default values
- All dependencies should be properly imported

### Task 4.2: Implement Form Fields

**File:** `src/features/members/components/member-profile-form.tsx`

**Actions:**

- [ ] **Age Field:**
  - Use `FormField` with `Input` component
  - Type: number
  - Placeholder: "Enter your age"
  - Validation: Display error messages from Zod
- [ ] **Blood Type Field:**
  - Use `FormField` with `Select` component
  - Options: A+, A-, B+, B-, AB+, AB-, O+, O-
  - Placeholder: "Select your blood type"
  - Required field indicator
- [ ] **Gender Field:**
  - Use `FormField` with `RadioGroup` component
  - Options: Male, Female, Other
  - Required field indicator
- [ ] **Role Field (Donor/Recipient):**
  - Use `FormField` with `RadioGroup` or `Select` component
  - Options: Donor, Recipient
  - Label: "I want to register as:"
  - Prominent styling to highlight importance
- [ ] **Location Field:**
  - Use `FormField` with `Input` component
  - Read-only attribute
  - Default value: "Multan, Punjab, Pakistan"
  - Disabled/grayed out styling
  - Helper text: "Currently serving Multan area only"
- [ ] **Location Permission Field:**
  - Use `FormField` with `RadioGroup` or `Checkbox` component
  - Label: "Allow browser to access your location for better results"
  - Options: Yes / No (or single checkbox)
  - Must be checked/accepted to submit
  - Helper text explaining why permission is needed

**Validation:**

- All fields should display validation errors
- Required fields should be clearly marked
- Field styling should follow shadcn/ui patterns

### Task 4.3: Implement Form Submission

**File:** `src/features/members/components/member-profile-form.tsx`

**Actions:**

- [ ] Create `onSubmit` handler function:
  - Validate all fields using Zod schema
  - Call Convex `createMemberProfile` mutation
  - Handle loading state during submission
  - Handle success: redirect based on role
    - If role === "donor" → redirect to `/donor` or `/donor-dashboard`
    - If role === "recipient" → redirect to `/recipient` or `/recipient-dashboard`
  - Handle errors: display error toast/message
- [ ] Add form submission button:
  - Label: "Complete Profile"
  - Disabled state while submitting
  - Loading spinner when submitting
  - Primary button styling

**Validation:**

- Form should submit only when all fields are valid
- Loading states should work correctly
- Redirects should happen after successful submission

### Task 4.4: Add Form UI Enhancements

**File:** `src/features/members/components/member-profile-form.tsx`

**Actions:**

- [ ] Add form header/title:
  - Title: "Complete Your Profile"
  - Subtitle: "Please provide the following information to continue"
  - Icon or illustration (optional)
- [ ] Add required field indicators (\*)
- [ ] Add progress indicator (optional)
- [ ] Style form container:
  - Card component for clean look
  - Proper spacing and padding
  - Responsive design for mobile
- [ ] Add accessibility attributes:
  - Proper ARIA labels
  - Focus management
  - Keyboard navigation support

**Validation:**

- Form should be visually appealing
- Should be fully responsive
- Should be accessible

---

## Phase 5: Modal/Dialog Implementation

### Task 5.1: Create Profile Completion Dialog

**File:** `src/features/members/components/profile-completion-dialog.tsx` (create new file)

**Actions:**

- [ ] Create a Dialog component using shadcn/ui Dialog
- [ ] Configure dialog as non-dismissible:
  - `onOpenChange` should not allow closing
  - No close button (remove X button)
  - `modal={true}` to prevent outside clicks
  - Disable escape key closing
- [ ] Wrap `MemberProfileForm` inside the Dialog
- [ ] Add blocking overlay with high z-index
- [ ] Export `ProfileCompletionDialog` component

**Validation:**

- Dialog should not be closable by any means
- Should overlay the entire screen
- Should be fully modal

### Task 5.2: Create Profile Completion Hook

**File:** `src/features/members/hooks/use-profile-completion.ts` (create new file)

**Actions:**

- [ ] Create custom hook `useProfileCompletion`
- [ ] Use Convex `useQuery` to check profile completion status
- [ ] Return:
  - `isLoading`: boolean (loading state)
  - `isProfileCompleted`: boolean (profile status)
  - `currentProfile`: member profile data or null
- [ ] Handle authentication state
- [ ] Memoize results for performance

**Validation:**

- Hook should return correct profile status
- Should handle loading states properly
- Should work with Convex real-time updates

---

## Phase 6: Middleware & Route Protection

### Task 6.1: Update Middleware for Profile Check

**File:** `src/middleware.ts`

**Actions:**

- [ ] Add profile completion check after authentication:
  - Query user's profile completion status from Convex
  - If authenticated but profile NOT completed:
    - Allow access to `/profile-completion` page only
    - Redirect all other routes to `/profile-completion`
  - If authenticated AND profile completed:
    - Allow normal navigation
    - Prevent access to `/profile-completion`
- [ ] Add `/profile-completion` to the route matcher
- [ ] Ensure auth page remains public
- [ ] Handle edge cases (loading states, errors)

**Note:** Convex middleware integration might require:

- Using Convex HTTP actions or
- Client-side checks with layout protection (alternative approach)

**Validation:**

- Middleware should correctly redirect incomplete profiles
- Should not cause redirect loops
- Should preserve user intended destination after completion

### Task 6.2: Create Profile Completion Page (Alternative to Middleware)

**File:** `src/app/profile-completion/page.tsx` (create new file)

**Actions:**

- [ ] Create dedicated page for profile completion
- [ ] Import `ProfileCompletionDialog` component
- [ ] Always show dialog on this page
- [ ] Add metadata for the page
- [ ] Prevent back navigation (optional)

**Validation:**

- Page should always show the profile form
- Should handle completion and redirect

---

## Phase 7: Layout-Level Protection (Recommended Approach)

### Task 7.1: Create Protected Layout Wrapper

**File:** `src/components/profile-completion-guard.tsx` (create new file)

**Actions:**

- [ ] Create `ProfileCompletionGuard` component
- [ ] Use `useProfileCompletion` hook to check status
- [ ] If profile NOT completed:
  - Render `ProfileCompletionDialog` with member form
  - Render children in background (blurred/disabled)
- [ ] If profile completed:
  - Render children normally
- [ ] Handle loading state with skeleton/spinner
- [ ] Export component

**Validation:**

- Guard should block all interactions until form is completed
- Should show loading state appropriately
- Should seamlessly allow navigation after completion

### Task 7.2: Integrate Guard in Root Layout

**File:** `src/app/layout.tsx`

**Actions:**

- [ ] Import `ProfileCompletionGuard` component
- [ ] Wrap main content with the guard:
  - Place after authentication provider
  - Wrap children with the guard
  - Exclude auth pages from guard
- [ ] Ensure guard only renders for authenticated users
- [ ] Test with different user states

**Validation:**

- Guard should work on all protected pages
- Should not interfere with authentication flow
- Should not cause hydration issues

---

## Phase 8: URL/Navigation Blocking

### Task 8.1: Implement beforeunload Event

**File:** `src/features/members/components/member-profile-form.tsx`

**Actions:**

- [ ] Add `beforeunload` event listener:
  - Warn user if they try to close tab/window
  - Show browser's native confirmation dialog
  - Remove listener after form submission
- [ ] Use `useEffect` for cleanup
- [ ] Handle mobile browsers (limited support)

**Validation:**

- Should warn on tab close attempt
- Should not trigger after successful submission

### Task 8.2: Implement Next.js Navigation Blocking

**File:** `src/features/members/components/profile-completion-guard.tsx`

**Actions:**

- [ ] Use Next.js router events to block navigation:
  - Listen to `routeChangeStart` event
  - Prevent navigation if profile not completed
  - Show confirmation dialog (optional)
- [ ] Block browser back button:
  - Use `history.pushState` technique
  - Or use router.beforePopState (Next.js)
- [ ] Allow navigation only after form completion

**Note:** Next.js 15 with App Router might need custom solution using:

- `useRouter` from `next/navigation`
- Window history API
- Or layout-based prevention (recommended)

**Validation:**

- User should not be able to navigate away
- Should allow navigation after completion
- Should not break browser functionality

---

## Phase 9: Dashboard Pages Setup

### Task 9.1: Create Donor Dashboard Page

**File:** `src/app/donor/page.tsx` (create new file)

**Actions:**

- [ ] Create basic donor dashboard page
- [ ] Add page title: "Donor Dashboard"
- [ ] Add welcome message with user name
- [ ] Add placeholder content
- [ ] Will be expanded later with donor-specific features

**Validation:**

- Page should be accessible after profile completion
- Should show only for users with role "donor"

### Task 9.2: Create Recipient Dashboard Page

**File:** `src/app/recipient/page.tsx` (create new file)

**Actions:**

- [ ] Create basic recipient dashboard page
- [ ] Add page title: "Recipient Dashboard"
- [ ] Add welcome message with user name
- [ ] Add placeholder content
- [ ] Will be expanded later with recipient-specific features

**Validation:**

- Page should be accessible after profile completion
- Should show only for users with role "recipient"

---

## Phase 10: Testing & Validation

### Task 10.1: Manual Testing Checklist

**Actions:**

- [ ] Test form validation:
  - Submit empty form (should show errors)
  - Submit with invalid age (should show error)
  - Submit without selecting blood type (should show error)
  - Submit without location permission (should show error)
- [ ] Test form submission:
  - Submit as donor (should redirect to donor dashboard)
  - Submit as recipient (should redirect to recipient dashboard)
  - Verify data saved correctly in Convex
- [ ] Test blocking behavior:
  - Try to close dialog (should not close)
  - Try to navigate to other pages (should be prevented)
  - Try browser back button (should be prevented)
  - Try closing tab (should show warning)
- [ ] Test completed profile:
  - Login with completed profile (should not show form)
  - Navigate freely (should work normally)
  - Check redirect to correct dashboard
- [ ] Test responsive design:
  - Test on mobile viewport
  - Test on tablet viewport
  - Test on desktop viewport
- [ ] Test accessibility:
  - Keyboard navigation
  - Screen reader compatibility
  - Focus management

**Validation:**

- All tests should pass
- No console errors
- Smooth user experience

### Task 10.2: Edge Cases Testing

**Actions:**

- [ ] Test network failures:
  - Form submission fails (show error, allow retry)
  - Slow network (show loading state)
- [ ] Test concurrent sessions:
  - Multiple tabs open (form shown in all)
  - Complete in one tab (others should update)
- [ ] Test browser compatibility:
  - Chrome, Firefox, Safari, Edge
  - Mobile browsers
- [ ] Test with different user states:
  - New user (no profile)
  - Existing user with completed profile
  - User with partial data (handle migration)

**Validation:**

- All edge cases handled gracefully
- Error messages are helpful
- No data loss scenarios

---

## Phase 11: Polish & UX Improvements

### Task 11.1: Add Loading States

**Actions:**

- [ ] Add skeleton loaders for initial profile check
- [ ] Add loading spinner during form submission
- [ ] Add loading state for location permission request
- [ ] Disable form fields during submission

**Validation:**

- Loading states should be clear and consistent
- Should prevent duplicate submissions

### Task 11.2: Add Toast Notifications

**File:** Multiple files

**Actions:**

- [ ] Install sonner or use shadcn/ui toast: `npx shadcn@latest add sonner`
- [ ] Add success toast after profile completion
- [ ] Add error toast for submission failures
- [ ] Add info toast for location permission status
- [ ] Configure toast positioning and styling

**Validation:**

- Toasts should be visible and dismissible
- Should not interfere with form interaction

### Task 11.3: Add Form Instructions

**Actions:**

- [ ] Add helper text under each field explaining purpose
- [ ] Add tooltip for blood type selection (importance)
- [ ] Add explanation for location permission
- [ ] Add note about age requirements for blood donation
- [ ] Add privacy note about data usage

**Validation:**

- Instructions should be clear and concise
- Should help users understand requirements

### Task 11.4: Implement Geolocation API (Optional Enhancement)

**File:** `src/features/members/components/member-profile-form.tsx`

**Actions:**

- [ ] Add button to request browser geolocation
- [ ] Implement geolocation API call:
  - Request permission
  - Get coordinates
  - Reverse geocode to get city (optional)
  - Update location field with actual location
- [ ] Handle permission denied gracefully
- [ ] Keep "Multan, Punjab, Pakistan" as fallback
- [ ] Store permission status in form state

**Validation:**

- Geolocation should work when permitted
- Should handle permission denial gracefully
- Should maintain default location as fallback

---

## Phase 12: Documentation & Cleanup

### Task 12.1: Add Code Comments

**Actions:**

- [ ] Add JSDoc comments to all functions
- [ ] Document complex logic sections
- [ ] Add README in members feature folder
- [ ] Document Convex functions

**Validation:**

- Code should be well-documented
- Easy for other developers to understand

### Task 12.2: Update Main README

**File:** `README.md`

**Actions:**

- [ ] Document profile completion feature
- [ ] Add screenshots of the form
- [ ] Document database schema changes
- [ ] Add troubleshooting section

**Validation:**

- README should be comprehensive
- Should help new developers onboard

---

## Technical Considerations

### Dependencies Required

- ✅ `zod` - Already have `@hookform/resolvers`
- ✅ `react-hook-form` - Already have `@hookform/resolvers`
- ✅ `shadcn/ui` components - Already installed
- ✅ `convex` - Already installed
- ⚠️ May need: `sonner` for toast notifications

### File Structure After Implementation

```
src/
  features/
    members/
      types.ts (new)
      hooks/
        use-profile-completion.ts (new)
      components/
        member-profile-form.tsx (update)
        profile-completion-dialog.tsx (new)
  components/
    profile-completion-guard.tsx (new)
  app/
    profile-completion/
      page.tsx (new - optional)
    donor/
      page.tsx (new)
    recipient/
      page.tsx (new)
convex/
  members.ts (new)
  schema.ts (update)
```

### Performance Considerations

- Use proper memoization for profile checks
- Avoid unnecessary re-renders during form input
- Lazy load dashboard pages
- Optimize Convex queries with proper indexes

### Security Considerations

- Validate all inputs server-side in Convex mutations
- Ensure only authenticated users can create profiles
- Prevent profile duplication
- Sanitize location data if using geolocation
- Rate limit profile creation attempts

### Accessibility Considerations

- All form fields must have proper labels
- Error messages must be announced to screen readers
- Keyboard navigation must work throughout
- Focus should trap within modal
- Color contrast must meet WCAG standards

---

## Success Criteria

The implementation is considered complete when:

1. ✅ User cannot dismiss or close the profile form until completed
2. ✅ User cannot navigate to other pages until profile is completed
3. ✅ All form fields are validated correctly with Zod
4. ✅ Form submission creates member profile in Convex
5. ✅ Users are redirected to correct dashboard based on role
6. ✅ Location field is read-only with Multan default
7. ✅ Location permission must be granted to submit
8. ✅ Form is responsive and accessible
9. ✅ No console errors or warnings
10. ✅ All edge cases are handled gracefully

---

## Timeline Estimate

- **Phase 1-2 (Schema & Backend):** 1-2 hours
- **Phase 3-4 (Form Implementation):** 3-4 hours
- **Phase 5-7 (Blocking & Protection):** 2-3 hours
- **Phase 8 (Navigation Blocking):** 1-2 hours
- **Phase 9 (Dashboard Pages):** 1 hour
- **Phase 10 (Testing):** 2-3 hours
- **Phase 11 (Polish):** 2-3 hours
- **Phase 12 (Documentation):** 1 hour

**Total Estimated Time:** 13-18 hours

---

## Notes & Recommendations

1. **Recommended Approach for Blocking:**
   - Use layout-level `ProfileCompletionGuard` component (Phase 7)
   - This is cleaner than middleware for this use case
   - Works well with Next.js App Router

2. **Location Feature:**
   - Start with fixed "Multan, Punjab, Pakistan"
   - Implement geolocation as Phase 11 enhancement
   - Consider privacy implications

3. **Testing Priority:**
   - Focus on blocking behavior first
   - Ensure form cannot be bypassed
   - Test role-based redirects thoroughly

4. **Future Enhancements:**
   - Email verification before accessing dashboard
   - Profile editing after completion
   - Multi-step form with progress bar
   - Save draft functionality (conflicts with mandatory requirement)
   - Admin review of new profiles

---

## Getting Started

To begin implementation:

1. Start with Phase 1 (Schema updates)
2. Run `npx convex dev` and verify schema
3. Proceed sequentially through phases
4. Test each phase before moving to next
5. Keep this document updated with progress

Good luck with the implementation! 🚀
