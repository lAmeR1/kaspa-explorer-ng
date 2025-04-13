import Spinner from "~/Spinner";

interface CardProps {
  title?: string;
  value: string | number;
  subtext?: string;
  loading?: boolean;
}

function Card({ title, value, subtext = "", loading }: CardProps) {
  return (
    <div className="grid grow rounded-2xl border border-gray-100 p-4">
      <span className="text-xs">{title}</span>
      <span className="sm:text-lg md:text-xl">{!loading ? value : <Spinner className="h-5 w-5" />}</span>
      <span className="text-gray-500">{subtext}</span>
    </div>
  );
}

export default Card;
