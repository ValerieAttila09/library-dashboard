export default function Badge({ Status }) {
  const statusLabel = Status === 1 ? "available" : "unavailable";
  const baseStyle = "px-2 text-sm rounded";
  const statusStyle =
    Status === 1
      ? "bg-green-50 text-green-400"
      : "bg-red-50 text-red-400";

  return (
    <span className={`${baseStyle} ${statusStyle}`}>
      {statusLabel}
    </span>
  );
}
