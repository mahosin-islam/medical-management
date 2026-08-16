export default function DoctorCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex gap-4 animate-pulse">
      {/* 1. Image Placeholder */}
      <div className="w-20 h-28 bg-zinc-200 dark:bg-zinc-800 rounded-xl shrink-0" />

      {/* 2. Content Details Placeholder */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Name */}
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4" />

        {/* Degree */}
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/2" />

        {/* Specialization Tags */}
        <div className="flex gap-1.5 pt-1">
          <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        </div>

        {/* Hospital Name */}
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-5/6 pt-1" />

        {/* Fee & Button Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-zinc-100 dark:border-zinc-900 mt-2">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-12" />
          <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-16" />
        </div>
      </div>
    </div>
  );
}