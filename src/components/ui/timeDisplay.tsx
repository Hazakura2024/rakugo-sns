export default function TimeDisplay({ createdAt }: { createdAt: Date }) {
  const formattedString = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(createdAt);

  return <time dateTime={createdAt.toISOString()}>{formattedString}</time>;
}
