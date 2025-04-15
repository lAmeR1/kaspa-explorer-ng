import { getMarketData } from "../api/kaspa-api-client";
import numeral from "numeral";
import { createContext, useEffect, useState } from "react";

interface MarketData {
  price: number | undefined;
  change24h: string | undefined;
}

export const MarketDataContext = createContext<MarketData | undefined>(undefined);

export const MarketDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [marketData, setMarketData] = useState<MarketData>({
    price: undefined,
    change24h: undefined,
  });

  const updateMarketData = async () => {
    const marketDataResp = await getMarketData();
    setMarketData({
      price: marketDataResp["current_price"]["usd"],
      change24h: numeral(marketDataResp["price_change_percentage_24h"]).format("+0.00"),
    });
  };

  useEffect(() => {
    updateMarketData();
    const updateInterval = setInterval(updateMarketData, 60_000);
    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  return <MarketDataContext.Provider value={marketData}>{children}</MarketDataContext.Provider>;
};
