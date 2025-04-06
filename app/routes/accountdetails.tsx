import AccountBalanceWallet from "../assets/account_balance_wallet.svg";
import ArrowRight from "../assets/arrow-right.svg";
import Info from "../assets/info.svg";
import Kaspa from "../assets/kaspa.svg";
import type { Route } from "./+types/accountdetails";
import numeral from "numeral";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router";
import { Accepted } from "~/Accepted";
import KaspaAddress from "~/KaspaAddress";
import { MarketDataContext } from "~/context/MarketDataProvider";
import { useAccountBalance } from "~/hooks/useAccountBalance";
import { useAccountTxCount } from "~/hooks/useAccountTxCount";
import { useAccountUtxos } from "~/hooks/useAccountUtxos";
import { isValidKaspaAddressSyntax } from "~/utils/kaspa";

export async function loader({ params }: Route.LoaderArgs) {
  const address = params.address;

  if (!isValidKaspaAddressSyntax(address))
    throw new Response(`Kaspa address ${address} doesn't follow the kaspa address schema.`, { status: 400 });

  // todo: check real validity of address?

  return { address };
}

export function meta() {
  return [
    { title: "Kaspa Explorer - Account Details" },
    {
      name: "description",
      content:
        "Overview page of Kaspa Block Explorer, showcasing recent blocks, their details, and insights into the Kaspa blockchain.",
    },
  ];
}

export default function Accountdetails({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const { data, isError } = useAccountBalance(loaderData.address);
  const { data: utxoData } = useAccountUtxos(loaderData.address);
  const { data: txCount } = useAccountTxCount(loaderData.address);
  const marketData = useContext(MarketDataContext);

  if (isError) {
    return <div>ERROR! Loading...</div>;
  }

  const isTabActive = (tab: string) => {
    const params = new URLSearchParams(location.search);
    if (tab === "transactions" && params.get("tab") === null) return true;
    return params.get("tab") === tab;
  };

  const balance = numeral((data?.balance || 0) / 1_0000_0000).format("0,0.00[000000]");

  return (
    <>
      <div className="flex w-full flex-col rounded-4xl bg-white p-4 text-left text-black sm:p-8">
        <div className="flex flex-row items-center text-2xl sm:col-span-2">
          <AccountBalanceWallet className="mr-2 h-8 w-8" />
          <span>Account details</span>
        </div>

        <span className="mt-4 mb-0">Balance</span>

        <span className="flex flex-row items-center text-[32px]">
          {balance.split(".")[0]}.<span className="self-end pb-[0.4rem] text-2xl">{balance.split(".")[1]}</span>
          <Kaspa className="fill-primary ml-1 h-8 w-8" />
        </span>
        <span className="ml-1 text-sm text-gray-500">
          {numeral(((data?.balance || 0) / 1_0000_0000) * (marketData?.price || 0)).format("$0,0.00")}
        </span>
        {/*horizontal rule*/}
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />

        <div className="grid grid-cols-1 gap-x-14 gap-y-2 sm:grid-cols-[auto_1fr]">
          <FieldName name="Address" />
          <FieldValue value={<KaspaAddress copy link qr value={loaderData.address} />} />
          <FieldName name="Transactions" />
          <FieldValue
            value={
              <>
                {txCount?.limit_exceeded && "> "}
                {txCount?.total || 0}
              </>
            }
          />
          <FieldName name="UTXOs" />
          <FieldValue value={utxoData?.length || 0} />
        </div>
      </div>

      <div className="flex w-full flex-col gap-x-18 gap-y-2 overflow-x-auto rounded-4xl bg-white p-4 text-left text-black sm:p-8">
        <div className="mr-auto flex w-auto flex-row items-center justify-around gap-x-1 rounded-full bg-gray-50 p-1 px-1">
          <NavLink
            to={`/accounts/${loaderData.address}?tab=transactions`}
            preventScrollReset={true}
            className={() =>
              `rounded-full px-4 py-1.5 hover:cursor-pointer hover:bg-white ${isTabActive("transactions") ? "bg-white" : ""}`
            }
          >
            Transactions
          </NavLink>
          <NavLink
            to={`/accounts/${loaderData.address}?tab=utxos`}
            preventScrollReset={true}
            className={() =>
              `rounded-full px-4 py-1.5 hover:cursor-pointer hover:bg-white ${isTabActive("utxos") ? "bg-white" : ""}`
            }
          >
            UTXOs
          </NavLink>
        </div>

        {isTabActive("transactions") && (
          <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 overflow-x-auto rounded-4xl bg-white p-4 text-left text-nowrap text-black sm:p-8">
            <div className="grid w-full grid-cols-[auto_3fr_auto_2fr_auto_auto_auto] gap-x-4 gap-y-2">
              <div className="text-gray-500">Timestamp</div>
              <div className="text-gray-500">TX-ID</div>
              <div className="col-span-2 text-gray-500">From</div>
              <div className="text-gray-500">To</div>
              <div className="text-gray-500">Status</div>
              <div className="text-right text-gray-500">Amount</div>

              {Array.from({ length: 20 }).map(() => (
                <>
                  <div className="col-span-7 h-[1px] bg-gray-100" />
                  <div className="text-black">12 sec. ago</div>
                  <div className="text-black">123b12....28b12b318293</div>
                  <div className="text-link text-sm">
                    kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
                    <br />
                    kaspa:qzyzhlkd8thwywu...tfj222rtgcn
                  </div>
                  <div className="flex items-center fill-black text-black">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <div className="text-link text-sm">
                    kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
                    <br />
                    kaspa:qzyzhlkd8thwywu...tfj222rtgcn
                    <br />
                    kaspa:qzyzhlkd8thwywu...tfj222rtgcn
                    <br />
                    kaspa:qzyzhlkd8thwywu...tfj222rtgcn
                    <br />
                    kaspa:qzyzhlkd8thwywu...tfj222rtgcn
                    <br />
                    kaspa:qzyzhlkd8thwywu...tfj222rtgcn
                    <br />
                    kaspa:qzyzhlkd8thwywu...tfj222rtgcn
                  </div>
                  <div className="text-success">
                    <Accepted />
                  </div>
                  <div className="text-black">
                    1234<span className="text-sm text-gray-500"> KAS</span>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}

        {isTabActive("utxos") && (
          <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 overflow-x-auto rounded-4xl bg-white p-4 text-left text-nowrap text-black sm:p-8">
            <div className="grid w-full grid-cols-[auto_3fr_auto_auto_auto] gap-x-4 gap-y-2">
              <div className="text-gray-500">Timestamp</div>
              <div className="text-gray-500">TX-ID</div>
              <div className="text-gray-500">Index</div>
              <div className="text-gray-500">Block DAA score</div>
              <div className="text-right text-gray-500">Amount</div>

              {Array.from({ length: 20 }).map(() => (
                <>
                  <div className="col-span-7 h-[1px] bg-gray-100" />
                  <div className="text-black">12 sec. ago - Dec 01 2025 14:12:22</div>
                  <div className="text-black">123b12....28b12b318293</div>
                  <div className="text-link text-sm">0</div>
                  <div className="flex items-center fill-black text-black">9125185</div>
                  <div className="text-black">
                    1234<span className="text-sm text-gray-500"> KAS</span>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const FieldName = ({ name }: { name: string }) => (
  <div className="flex flex-row items-start fill-gray-500 text-gray-500 sm:col-start-1">
    <div className="flex flex-row items-center">
      <Info className="mr-1 h-4 w-4" />
      <span>{name}</span>
    </div>
  </div>
);

const FieldValue = ({ value }: { value: string | React.ReactNode }) => <span className="overflow-hidden">{value}</span>;
