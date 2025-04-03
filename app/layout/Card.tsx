interface CardProps {
  readonly title?: string;
  readonly value: string | number;
  readonly subtext?: string;
}

function Card({ title, value, subtext = "" }: CardProps) {
  return (
    <div className="grid grow rounded-2xl border border-gray-100 p-4">
      <span className="text-xs sm:text-sm">{title}</span>
      <span className="text-base sm:text-lg md:text-xl">{value}</span>
      <span className="text-base text-gray-500">{subtext}</span>
    </div>
  );
}

export default Card;
