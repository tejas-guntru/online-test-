/**
 * ProfileLoader Component
 *
 * PURPOSE:
 * - Displays a loading state while profile data is being fetched
 * - Prevents rendering incomplete or undefined profile UI
 *
 * USED IN:
 * - Profile page (during initial data load)
 *
 * WHY THIS EXISTS:
 * - Improves user experience
 * - Avoids layout flicker
 * - Clearly communicates loading status
 */
const ProfileLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      
      {/* Simple loading indicator
          Can later be replaced with spinner or skeleton */}
      Loading profile...

    </div>
  );
};

export default ProfileLoader;
