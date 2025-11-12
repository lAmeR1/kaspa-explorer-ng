import AnalyticsIcon from "../assets/analytics.svg";

export function meta() {
  return [
    { title: "Kaspa Analytics - Network Stats & Charts | Kaspa Explorer" },
    {
      name: "description",
      content:
        "Analyze the Kaspa blockchain with real-time charts and statistics. Track block production, hash rate, difficulty, and network growth.",
    },
    {
      name: "keywords",
      content: "Kaspa analytics, blockchain stats, network charts, hash rate, difficulty, block time",
    },
  ];
}

export default function Analytics() {
  return (
    <div className="flex w-full max-w-300 flex-col items-center rounded-4xl bg-white py-12 sm:py-24">
      <AnalyticsIcon className="h-22 w-22" />
      <p className="mt-8 mb-6 text-xl font-medium">Analytics - Coming Soon</p>
      <p>We're building a powerful Analytics page to bring deeper insights into the Kaspa network.</p>
    </div>
  );
}
