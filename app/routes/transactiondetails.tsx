import { displayAcceptance } from "../Accepted";
import ErrorMessage from "../ErrorMessage";
import KasLink from "../KasLink";
import LoadingMessage from "../LoadingMessage";
import Tooltip, { TooltipDisplayMode } from "../Tooltip";
import InfoIcon from "../assets/info.svg";
import Kaspa from "../assets/kaspa.svg";
import Swap from "../assets/swap.svg";
import { MarketDataContext } from "../context/MarketDataProvider";
import { useTransactionById } from "../hooks/useTransactionById";
import { useVirtualChainBlueScore } from "../hooks/useVirtualChainBlueScore";
import type { Route } from "./+types/transactiondetails";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import numeral from "numeral";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router";

dayjs().locale("en");
dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

export async function loader({ params }: Route.LoaderArgs) {
  const transactionId = params.transactionId as string;
  return { transactionId };
}

export function meta() {
  return [
    { title: "Kaspa Explorer - Transaction Details" },
    {
      name: "description",
      content:
        "Overview page of Kaspa Block Explorer, showcasing recent blocks, their details, and insights into the Kaspa blockchain.",
    },
  ];
}

export default function TransactionDetails({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const isTabActive = (tab: string) => (new URLSearchParams(location.search).get("tab") || "general") === tab;
  const { virtualChainBlueScore } = useVirtualChainBlueScore();

  const { data: transaction, isLoading, isError } = useTransactionById(loaderData.transactionId);
  const marketData = useContext(MarketDataContext);

  if (isLoading) {
    return <LoadingMessage>Fetching transaction details...</LoadingMessage>;
  }

  // type guard transaction
  if (isError || !transaction) {
    return (
      <ErrorMessage>
        The requested transaction could not be found. Please verify the transaction ID and try again.
      </ErrorMessage>
    );
  }

  const confirmations = (virtualChainBlueScore ?? 0) - (transaction?.accepting_block_blue_score || 0);
  const transactionSum = (transaction.outputs || []).reduce((sum, output) => sum + output.amount, 0);
  const displayKAS = (x: number) => numeral((x || 0) / 1_0000_0000).format("0,0.00[000000]");
  const displaySum = displayKAS(transactionSum);
  const inputSum = transaction?.inputs?.reduce((sum, input) => sum + input.previous_outpoint_amount, 0) || 0;

  const blockTime = dayjs(transaction?.block_time);

  const fee = (inputSum - transactionSum) / 1_0000_0000;

  return (
    <>
      <div className="flex w-full flex-col rounded-4xl bg-white p-4 text-left text-black sm:p-8">
        <div className="flex flex-row items-center text-2xl sm:col-span-2">
          <Swap className="mr-2 h-8 w-8" />
          <span>Transaction details</span>
        </div>

        <span className="mt-4 mb-0">Transfer details</span>

        <span className="flex flex-row items-center text-[32px]">
          {displaySum.split(".")[0]}.<span className="self-end pb-[0.4rem] text-2xl">{displaySum.split(".")[1]}</span>
          <Kaspa className="fill-primary ml-1 h-8 w-8" />
        </span>
        <span className="ml-1 text-gray-500">
          {numeral(((transactionSum || 0) / 1_0000_0000) * (marketData?.price || 0)).format("$0,0.00")}
        </span>
        {/*horizontal rule*/}
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />

        <div className="grid grid-cols-1 gap-x-14 gap-y-2 sm:grid-cols-[auto_1fr]">
          <FieldName name="From" infoText="The (input) address(es) that sent KAS in this transaction." />
          <FieldValue
            value={
              <ul>
                {transaction.inputs ? (
                  [...new Set(transaction.inputs.map((input) => input.previous_outpoint_address))].map((addr) => (
                    <li>
                      <KasLink linkType="address" copy link to={addr} />
                    </li>
                  ))
                ) : (
                  <li>
                    <span>Coinbase (newly mined coins)</span>
                  </li>
                )}
              </ul>
            }
          />
          <FieldName name="To" infoText="The (output) address(es) where the KAS in this transaction were sent to." />
          <FieldValue
            value={
              <ul>
                {transaction.outputs ? (
                  [...new Set(transaction.outputs.map((output) => output.script_public_key_address))].map((addr) => (
                    <li>
                      <KasLink linkType="address" copy link to={addr} resolveName />
                    </li>
                  ))
                ) : (
                  <span>No output addresses</span>
                )}
              </ul>
            }
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-x-18 gap-y-2 rounded-4xl bg-white p-4 text-left text-black sm:p-8">
        <div className="mr-auto flex w-auto flex-row items-center justify-around gap-x-1 rounded-full bg-gray-50 p-1 px-1">
          <NavLink
            to={`/transactions/${loaderData.transactionId}?tab=general`}
            preventScrollReset={true}
            className={() =>
              `rounded-full px-4 py-1.5 hover:cursor-pointer hover:bg-white ${isTabActive("general") ? "bg-white" : ""}`
            }
          >
            General information
          </NavLink>
          <NavLink
            to={`/transactions/${loaderData.transactionId}?tab=inputs`}
            preventScrollReset={true}
            className={() =>
              `rounded-full px-4 py-1.5 hover:cursor-pointer hover:bg-white ${isTabActive("inputs") ? "bg-white" : ""}`
            }
          >
            Inputs
          </NavLink>
          <NavLink
            to={`/transactions/${loaderData.transactionId}?tab=outputs`}
            preventScrollReset={true}
            className={() =>
              `rounded-full px-4 py-1.5 hover:cursor-pointer hover:bg-white ${isTabActive("outputs") ? "bg-white" : ""}`
            }
          >
            Outputs
          </NavLink>
        </div>

        {isTabActive("general") && transaction && (
          <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 rounded-4xl bg-white text-left text-nowrap text-black sm:grid-cols-[auto_1fr]">
            <FieldName name="Transaction ID" infoText="The unique identifier of this transaction." />
            <FieldValue value={<KasLink copy to={transaction.transaction_id} linkType="transaction" />} />
            <FieldName
              name="Subnetwork ID"
              infoText="The Subnetwork ID is an identifier for transactions. It's used to group mining and regular transactions."
            />
            <FieldValue value={transaction.subnetwork_id} />
            <FieldName
              name="Status"
              infoText="Displays whether the transaction was accepted by the protocol and how many confirmations it has so far."
            />

            <FieldValue value={displayAcceptance(transaction.is_accepted, confirmations)} />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Hash" infoText="Hash calculated from the transaction data." />
            <FieldValue value={transaction.hash} />
            <FieldName
              name="Compute mass"
              infoText="The computed mass / weight of a transaction. It's used to determine the fee of a transaction."
            />

            <FieldValue value={inputSum === 0 ? 0 : transaction.mass} />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Block hashes" infoText="Blocks, in which this transaction was included." />
            <FieldValue
              value={transaction.block_hash.map((blockHash) => (
                <div>
                  <KasLink linkType="block" link to={blockHash} />
                </div>
              ))}
            />
            <FieldName name="Block time" infoText="Timestamp, when the transaction was included in a block." />
            <FieldValue
              value={
                <>
                  <div className="flex flex-col">
                    <span>{blockTime.fromNow()}</span>
                    <span className="text-gray-500">{blockTime.format("ll LTS")}</span>
                  </div>
                </>
              }
            />
            <FieldName
              name="Accepting block hash"
              infoText="Block hash of a chain block, which accepted this transaction."
            />
            <FieldValue
              value={
                transaction.accepting_block_hash ? (
                  <KasLink link linkType="block" to={transaction.accepting_block_hash} />
                ) : (
                  "Transaction is not accepted."
                )
              }
            />
            {transaction.payload && (
              <>
                <FieldName name="Payload" infoText="Payload data, which is used for miners to transmit miner's data." />
                <FieldValue
                  className="rounded-lg bg-gray-50 px-1 py-2 font-mono text-wrap break-all"
                  value={transaction.payload}
                />
              </>
            )}
            {(transaction.inputs || []).length > 0 && (
              <>
                <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
                <FieldName
                  name="Transaction fee"
                  infoText="Fee for this transaction which goes to miners as reward. It is the total output amount minus the total input amount."
                />
                <FieldValue
                  value={
                    <>
                      <span>{fee}</span>
                      <span className="text-gray-500"> KAS</span>
                      <div className="text-gray-500">
                        {numeral(fee * (marketData?.price || 0)).format("$0,0.[00000000]")}
                      </div>
                    </>
                  }
                />
              </>
            )}
          </div>
        )}

        {isTabActive("inputs") && (
          <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 rounded-4xl bg-white text-left text-nowrap text-black sm:grid-cols-[auto_1fr]">
            {transaction.inputs ? (
              transaction.inputs.map((input, index) => (
                <>
                  <FieldName name="Signature Op Count" />
                  <FieldValue value={input.sig_op_count} />
                  <FieldName name="Signature Script" />
                  <FieldValue value={input.signature_script} />
                  <FieldName name="Amount" />
                  <FieldValue
                    value={
                      <>
                        <span>
                          {displayKAS(input.previous_outpoint_amount).split(".")[0]}.
                          <span className="self-end pb-[0.4rem]">
                            {displayKAS(input.previous_outpoint_amount).split(".")[1]}
                          </span>
                        </span>
                        <span className="text-gray-500"> KAS</span>
                      </>
                    }
                  />
                  <FieldName name="Outpoint Index" />
                  <FieldValue value={`#${input.previous_outpoint_index}`} />
                  <FieldName name="Outpoint Hash" />
                  <FieldValue value={<KasLink linkType="transaction" link to={input.previous_outpoint_hash} />} />
                  <FieldName name="Outpoint Address" />
                  <FieldValue value={<KasLink linkType="address" link to={input.previous_outpoint_address} />} />
                  {/*horizontal rule*/}
                  {index + 1 < (transaction.inputs || []).length && (
                    <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
                  )}
                </>
              ))
            ) : (
              <div className="sm:col-span-2">This is a coinbase transaction without inputs.</div>
            )}
          </div>
        )}

        {isTabActive("outputs") && (
          <div className="grid w-full grid-cols-2 gap-x-18 gap-y-2 rounded-4xl bg-white text-left text-nowrap text-black sm:grid-cols-[auto_1fr]">
            {transaction.outputs ? (
              transaction.outputs.map((output, index) => (
                <>
                  <FieldName name="Index" />
                  <FieldValue value={output.index || "0"} />
                  <FieldName name="Amount" />
                  <FieldValue
                    value={
                      <>
                        <span>
                          {displayKAS(output.amount).split(".")[0]}.
                          <span className="self-end pb-[0.4rem]">{displayKAS(output.amount).split(".")[1]}</span>
                        </span>
                        <span className="text-gray-500"> KAS</span>
                      </>
                    }
                  />
                  <FieldName name="Script Public Key Type" />
                  <FieldValue value={output.script_public_key_type} />
                  <FieldName name="Script Public Key" className="col-span-2" />
                  <FieldValue value={output.script_public_key} className="col-span-2" />
                  <FieldName name="Script Public Key Address" className="col-span-2" />
                  <FieldValue
                    value={<KasLink linkType="address" link to={output.script_public_key_address} />}
                    className="col-span-2"
                  />
                  {/*horizontal rule*/}
                  {index + 1 < (transaction.outputs || []).length && (
                    <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
                  )}
                </>
              ))
            ) : (
              <div>This transaction doesn't have any outputs.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

const FieldName = ({ name, infoText, className }: { name: string; infoText?: string; className?: string }) => (
  <div className={`flex flex-row items-start fill-gray-500 text-gray-500 sm:col-start-1 ${className ? className : ""}`}>
    <div className="flex flex-row items-center">
      <Tooltip message={infoText || ""} display={TooltipDisplayMode.Hover} multiLine>
        <InfoIcon className="h-4 w-4" />
      </Tooltip>
      <span className="ms-1">{name}</span>
    </div>
  </div>
);

const FieldValue = ({ value, className }: { value: string | React.ReactNode; className?: string }) => (
  <span className={`text-wrap break-all ${className}`}>{value}</span>
);
