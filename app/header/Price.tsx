import KaspaIcon from "../assets/kaspa.svg";
import numeral from "numeral";
import { useContext } from "react";
import { MarketDataContext } from "~/context/MarketDataProvider";

const PriceLabel = () => {
  const marketData = useContext(MarketDataContext);
  const price = marketData?.price ? numeral(marketData?.price).format("0.0000") : "-.----";

  const isPositive = marketData?.change24h?.startsWith("+");

  return (
    <div className="ms-4 hidden h-6 flex-row items-center justify-around gap-x-1 overflow-hidden rounded-4xl border-[1px] border-gray-100 bg-white p-1 pr-2 sm:flex">
      <KaspaIcon className="h-4 w-4" />
      <span className="text-base">${price}</span>
      <span className={`${isPositive ? "text-success" : "text-alert"} text-base`}>
        {marketData?.change24h || "-.--"}
        <span className="ms-[1px]">%</span>
      </span>
    </div>
  );
};

export default PriceLabel;
