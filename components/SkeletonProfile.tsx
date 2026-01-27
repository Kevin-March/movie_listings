export default function ProfileSkeleton() {
  return (
    <div className="flex justify-center mt-16">
      <div className="relative w-full max-w-xl bg-base-200 rounded-2xl shadow-xl border border-base-300 pt-16 px-6 pb-8">
        <div className="absolute -top-14 left-1/2 -translate-x-1/2">
          <div className="skeleton w-28 h-28 rounded-full" />
        </div>

        <div className="skeleton h-6 w-32 mx-auto mb-6" />

        <div className="space-y-4">
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-full" />
        </div>

        <div className="skeleton h-12 w-full mt-6" />
      </div>
    </div>
  );
}
