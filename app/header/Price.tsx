import KaspaIcon from "../assets/kaspa.svg";
import { MarketDataContext } from "../context/MarketDataProvider";
import numeral from "numeral";
import { useContext } from "react";

const PriceLabel = () => {
  const marketData = useContext(MarketDataContext);
  const price = marketData?.price ? numeral(marketData?.price).format("0.0000") : "-.----";

  const isPositive = marketData?.change24h?.startsWith("+");

  return (
    <div className="mx-4 hidden h-6 min-w-fit flex-row items-center justify-around gap-x-1 overflow-hidden rounded-4xl border-[1px] border-gray-100 bg-white p-1 pr-2 sm:flex">
      <KaspaIcon className="h-4 w-4" />
      <span className="">${price}</span>
      <span className={`${isPositive ? "text-success" : "text-error"}`}>
        {marketData?.change24h || "-.--"}
        <span className="ms-[1px]">%</span>
      </span>
    </div>
  );
};

export default PriceLabel;
