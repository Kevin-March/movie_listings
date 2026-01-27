export default function SearchSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-base-100 border border-base-300 rounded-lg px-4 py-3"
        >
          {/* Title */}
          <div className="skeleton h-5 w-3/4 mb-2"></div>

          {/* Description */}
          <div className="skeleton h-4 w-full mb-1"></div>
          <div className="skeleton h-4 w-5/6 mb-2"></div>

          {/* Tags */}
          <div className="flex gap-2 mb-3">
            <div className="skeleton h-4 w-12"></div>
            <div className="skeleton h-4 w-10"></div>
            <div className="skeleton h-4 w-14"></div>
          </div>

          {/* Stats + Button */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="skeleton h-3 w-10"></div>
              <div className="skeleton h-3 w-10"></div>
              <div className="skeleton h-3 w-10"></div>
            </div>

            <div className="skeleton h-6 w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
