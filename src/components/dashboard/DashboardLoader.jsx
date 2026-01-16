/**
 * DashboardLoader Component
 *
 * PURPOSE:
 * - Displays a loading state while dashboard data is being fetched
 * - Prevents showing empty or broken UI before Firebase responds
 *
 * WHEN IT IS USED:
 * - While fetching active tests
 * - While fetching user attempt data
 * - Before Dashboard content is ready
 *
 * WHY THIS MATTERS:
 * - Improves user experience
 * - Avoids layout flicker
 * - Communicates progress to the user
 */
const DashboardLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      
      {/* Simple loading message
          (can be replaced with spinner / skeleton later) */}
      Loading dashboard...

    </div>
  );
};

export default DashboardLoader;
