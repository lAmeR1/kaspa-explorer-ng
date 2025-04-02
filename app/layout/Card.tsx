interface CardProps {
    title: string;
    value: string | number;
    subtext?: string;
}
const Card = ({title, value, subtext}: CardProps) => {
    return (
        <div className="grow grid border border-gray-100 rounded-2xl p-4">
            <span className="text-xs sm:text-sm">{title}</span>
            <span className="text-base sm:text-lg md:text-xl">{value}</span>
            <span className="text-base text-sm text-gray-500">{subtext}</span>
        </div>
    );
};

export default Card;