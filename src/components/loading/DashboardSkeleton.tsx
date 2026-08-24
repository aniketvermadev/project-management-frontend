const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">

      <div>
        <div className="h-7 w-32 animate-pulse rounded bg-slate-200" />

        <div className="mt-2 h-4 w-48 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-xl bg-slate-200"
          />
        ))}
      </div>

    </div>
  );
};

export default DashboardSkeleton