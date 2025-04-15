import { Accepted, Confirmed, NotAccepted } from "../Accepted";
import KasLink from "../KasLink";
import Spinner from "../Spinner";
import Tooltip, { TooltipDisplayMode } from "../Tooltip";
import AccountBalanceWallet from "../assets/account_balance_wallet.svg";
import Info from "../assets/info.svg";
import Kaspa from "../assets/kaspa.svg";
import { MarketDataContext } from "../context/MarketDataProvider";
import { useAddressBalance } from "../hooks/useAddressBalance";
import { useAddressTxCount } from "../hooks/useAddressTxCount";
import { useAddressUtxos } from "../hooks/useAddressUtxos";
import { useTransactions } from "../hooks/useTransactions";
import { useVirtualChainBlueScore } from "../hooks/useVirtualChainBlueScore";
import { isValidKaspaAddressSyntax } from "../utils/kaspa";
import type { Route } from "./+types/addressdetails";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import numeral from "numeral";
import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router";

dayjs().locale("en");
dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

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

export default function Addressdetails({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const { data, isLoading: isLoadingAddressBalance } = useAddressBalance(loaderData.address);
  const { data: utxoData, isLoading: isLoadingUtxoData } = useAddressUtxos(loaderData.address);
  const { data: txCount, isLoading: isLoadingTxCount } = useAddressTxCount(loaderData.address);
  const marketData = useContext(MarketDataContext);
  const { data: virtualChainBlueScore } = useVirtualChainBlueScore();

  // fetch transactions with resolve_previous_outpoints set to "light"
  const { data: transactions } = useTransactions(loaderData.address, 10, 0, 0, "", "light");

  if (!loaderData.address) return;

  const isTabActive = (tab: string) => {
    const params = new URLSearchParams(location.search);
    if (tab === "transactions" && params.get("tab") === null) return true;
    return params.get("tab") === tab;
  };

  const balance = numeral((data?.balance || 0) / 1_0000_0000).format("0,0.00[000000]");
  const LoadingSpinner = () => <Spinner className="h-5 w-5" />;

  return (
    <>
      <div className="relative flex w-full flex-col rounded-4xl bg-white p-4 text-left text-black sm:p-8">
        <div className="flex flex-row items-center text-2xl sm:col-span-2">
          <AccountBalanceWallet className="mr-2 h-8 w-8" />
          <span>Address details</span>
        </div>

        <span className="mt-4 mb-0">Balance</span>

        <span className="flex flex-row items-center text-[32px]">
          {balance.split(".")[0]}.
          <span className="self-end pb-[0.4rem] text-2xl">
            {!isLoadingAddressBalance ? balance.split(".")[1] : <LoadingSpinner />}
          </span>
          <Kaspa className="fill-primary ml-1 h-8 w-8" />
        </span>
        <span className="ml-1 text-gray-500">
          {numeral(((data?.balance || 0) / 1_0000_0000) * (marketData?.price || 0)).format("$0,0.00")}
        </span>
        {/*horizontal rule*/}
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />

        <div className="grid grid-cols-1 gap-x-14 gap-y-2 sm:grid-cols-[auto_1fr]">
          <FieldName name="Address" infoText="A unique Kaspa address used to send and receive funds." />
          <FieldValue value={<KasLink linkType="address" copy qr to={loaderData.address} />} />
          <FieldName name="Transactions" infoText="Total number of transactions involving this address." />
          <FieldValue
            value={
              !isLoadingTxCount ? (
                <>
                  {txCount?.limit_exceeded && "> "}
                  {txCount?.total || 0}
                </>
              ) : (
                <LoadingSpinner />
              )
            }
          />
          <FieldName name="UTXOs" infoText="Unspent, available outputs available at this address." />
          <FieldValue value={!isLoadingUtxoData ? utxoData?.length : <LoadingSpinner />} />
        </div>
      </div>

      <div className="flex w-full flex-col gap-x-18 gap-y-2 rounded-4xl bg-white p-4 text-left text-black sm:p-8">
        <div className="mr-auto flex w-auto flex-row items-center justify-around gap-x-1 rounded-full bg-gray-50 p-1 px-1">
          <NavLink
            to={`/addresses/${loaderData.address}?tab=transactions`}
            preventScrollReset={true}
            className={() =>
              `rounded-full px-4 py-1.5 hover:cursor-pointer hover:bg-white ${isTabActive("transactions") ? "bg-white" : ""}`
            }
          >
            Transactions
          </NavLink>
          <NavLink
            to={`/addresses/${loaderData.address}?tab=utxos`}
            preventScrollReset={true}
            className={() =>
              `rounded-full px-4 py-1.5 hover:cursor-pointer hover:bg-white ${isTabActive("utxos") ? "bg-white" : ""}`
            }
          >
            UTXOs
          </NavLink>
        </div>

        {isTabActive("transactions") && (
          <div className="grid w-full grid-cols-[1fr_2fr] gap-x-4 gap-y-2 text-wrap break-all">
            {(transactions || []).map((transaction) => (
              <>
                <div className="text-gray-500">Timestamp</div>
                <div className="text-right text-black">{dayjs(transaction.block_time).fromNow()}</div>

                <div className="text-gray-500">TX-ID</div>
                <div className="text-right text-black">
                  <KasLink linkType="transaction" link to={transaction.transaction_id} shorten={10} />
                </div>

                <div className="text-gray-500">From</div>
                <div className="text-right">
                  {(transaction.inputs || []).length > 0 ? (
                    (transaction.inputs || []).map((input) => (
                      <div>
                        {input.previous_outpoint_address && (
                          <KasLink
                            link
                            linkType="address"
                            to={input.previous_outpoint_address}
                            active={input.previous_outpoint_address === loaderData.address}
                            shorten={10}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <span>Coinbase (newly mined coins)</span>
                  )}
                </div>
                <div className="text-gray-500">To</div>
                <div className="text-right">
                  {(transaction.outputs || []).map((output) => (
                    <div>
                      <KasLink
                        link
                        linkType="address"
                        to={output.script_public_key_address}
                        active={loaderData.address === output.script_public_key_address}
                        shorten={10}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-gray-500">Amount</div>
                <div className="text-right text-black">
                  {numeral(
                    ((transaction.inputs || []).reduce(
                      (acc, input) =>
                        acc -
                        (loaderData.address === (input.previous_outpoint_address || "")
                          ? input.previous_outpoint_amount || 0
                          : 0),
                      0,
                    ) +
                      (transaction.outputs || []).reduce(
                        (acc, output) =>
                          acc + (loaderData.address === output.script_public_key_address ? output.amount : 0),
                        0,
                      )) /
                      1_0000_0000,
                  ).format("0,0.00[000000]")}
                  <span className="text-gray-500"> KAS</span>
                </div>
                <div className="text-gray-500">Status</div>
                <div className="flex flex-row items-center justify-end gap-x-1.5 text-right">
                  {transaction.is_accepted ? <Accepted /> : <NotAccepted />}
                  {(virtualChainBlueScore?.blueScore || 0) < (transaction.accepting_block_blue_score || 0) ? (
                    <Confirmed />
                  ) : (
                    <Confirmed />
                  )}
                </div>
                <div className="col-span-2 h-[1px] bg-gray-100" />
              </>
            ))}
          </div>
        )}

        {isTabActive("utxos") && (
          <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 rounded-4xl bg-white p-4 text-left text-nowrap text-black sm:p-8">
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
                  <div className="text-link">0</div>
                  <div className="flex items-center fill-black text-black">9125185</div>
                  <div className="text-black">
                    1234<span className="text-gray-500"> KAS</span>
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

const FieldName = ({ name, infoText }: { name: string; infoText?: string }) => (
  <div className="flex flex-row items-start fill-gray-500 text-gray-500 sm:col-start-1">
    <div className="flex flex-row items-center">
      <Tooltip message={infoText || ""} display={TooltipDisplayMode.Hover} multiLine>
        <Info className="h-4 w-4" />
      </Tooltip>
      <span className="ms-1">{name}</span>
    </div>
  </div>
);

const FieldValue = ({ value }: { value: string | React.ReactNode }) => <span>{value}</span>;
