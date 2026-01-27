const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-200">
      <div className="card-body space-y-3">
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
        <div className="skeleton h-4 w-2/3" />

        <div className="flex justify-between mt-4">
          <div className="skeleton h-4 w-12" />
          <div className="skeleton h-4 w-12" />
          <div className="skeleton h-4 w-12" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
