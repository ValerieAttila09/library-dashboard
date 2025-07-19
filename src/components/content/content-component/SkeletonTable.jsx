export default function SkeletonTable() {
  return (
    <div className="w-full h-[26rem] p-5 animate-pulse">
      <div className="w-full h-full border border-[#ebebeb] rounded-lg overflow-hidden">
        <div className="bg-[#fcfcfc] p-2 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-24" />
          ))}
        </div>
        <div className="p-4 space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-2">
              {[...Array(6)].map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
