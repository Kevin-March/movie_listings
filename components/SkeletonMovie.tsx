"use client";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-base-300 rounded ${className}`} />
);

export default function SkeletonMovie() {
  return (
    <div
      className="min-h-screen px-6 py-10 max-w-4xl mx-auto space-y-6"
      data-theme="luxury"
    >
      <Skeleton className="h-10 w-3/4" />

      <div className="flex gap-6 text-sm opacity-80 mb-6">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
      </div>

      <div className="flex gap-2 flex-wrap">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-12" />
      </div>

      <Skeleton className="h-10 w-32" />

      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}
