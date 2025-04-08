import ClockLoader from "../assets/clock_loader_10.svg";
import InfoIcon from "../assets/info.svg";
import Kaspa from "../assets/kaspa.svg";
import Swap from "../assets/swap.svg";
import type { Route } from "./+types/transactiondetails";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import numeral from "numeral";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router";
import { Accepted, Confirmed, NotAccepted } from "~/Accepted";
import ErrorMessage from "~/ErrorMessage";
import KasLink from "~/KasLink";
import LoadingMessage from "~/LoadingMessage";
import { MarketDataContext } from "~/context/MarketDataProvider";
import { useTransactionById } from "~/hooks/useTansactionById";
import { useVirtualChainBlueScore } from "~/hooks/useVirtualChainBlueScore";

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

  const { data: transaction, isLoading, isError } = useTransactionById(loaderData.transactionId);
  const { data: virtualChainBlueScore } = useVirtualChainBlueScore();
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

  const confirmations = (virtualChainBlueScore?.blueScore || 0) - (transaction?.accepting_block_blue_score || 0);
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
        <span className="ml-1 text-sm text-gray-500">
          {numeral(((transactionSum || 0) / 1_0000_0000) * (marketData?.price || 0)).format("$0,0.00")}
        </span>
        {/*horizontal rule*/}
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />

        <div className="grid grid-cols-1 gap-x-14 gap-y-2 sm:grid-cols-[auto_1fr]">
          <FieldName name="From" />
          <FieldValue
            value={
              transaction.inputs ? (
                transaction.inputs.map((input) => (
                  <KasLink linkType="address" copy link to={input.previous_outpoint_address} />
                ))
              ) : (
                <span>Coinbase (newly mined coins)</span>
              )
            }
          />
          <FieldName name="To" />
          <FieldValue
            value={
              transaction.outputs ? (
                transaction.outputs.map((output) => (
                  <KasLink linkType="address" copy link to={output.script_public_key_address} />
                ))
              ) : (
                <span>No output addresses</span>
              )
            }
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-x-18 gap-y-2 overflow-x-auto rounded-4xl bg-white p-4 text-left text-black sm:p-8">
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
            <FieldName name="Transaction ID" />
            <FieldValue value={<KasLink copy to={transaction.transaction_id} linkType="transaction" />} />
            <FieldName name="Subnetwork ID" />
            <FieldValue value={transaction.subnetwork_id} />
            <FieldName name="Status" />
            <FieldValue
              value={
                <div className="flex flex-row items-center gap-x-1">
                  {transaction.is_accepted ? <Accepted /> : <NotAccepted />}
                  {transaction.is_accepted && (
                    <>
                      {confirmations < 86400 ? (
                        <span className="flex flex-row items-center gap-x-1">
                          {confirmations} confirmations
                          <ClockLoader className="h-4 w-4" />
                        </span>
                      ) : (
                        <Confirmed />
                      )}
                    </>
                  )}
                </div>
              }
            />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Hash" />
            <FieldValue value={transaction.hash} />
            <FieldName name="Compute mass" />
            <FieldValue value={inputSum === 0 ? 0 : transaction.mass} />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Block hashes" />
            <FieldValue
              value={transaction.block_hash.map((blockHash) => (
                <div>
                  <KasLink linkType="block" link to={blockHash} />
                </div>
              ))}
            />
            <FieldName name="Block time" />
            <FieldValue
              value={
                <>
                  <div className="flex flex-col">
                    <span>{blockTime.fromNow()}</span>
                    <span className="text-sm text-gray-500">{blockTime.format("ll LTS")}</span>
                  </div>
                </>
              }
            />
            <FieldName name="Accepting block hash" />
            <FieldValue value={<KasLink link linkType="block" to={transaction.accepting_block_hash} />} />
            {(transaction.inputs || []).length > 0 && (
              <>
                <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
                <FieldName name="Transaction fee" />
                <FieldValue
                  value={
                    <>
                      <span>{fee}</span>
                      <span className="text-gray-500"> KAS</span>
                      <div className="text-sm text-gray-500">
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
                          <span className="self-end pb-[0.4rem] text-sm">
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
          <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 rounded-4xl bg-white text-left text-nowrap text-black sm:grid-cols-[auto_1fr]">
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
                          <span className="self-end pb-[0.4rem] text-sm">
                            {displayKAS(output.amount).split(".")[1]}
                          </span>
                        </span>
                        <span className="text-gray-500"> KAS</span>
                      </>
                    }
                  />
                  <FieldName name="Script Public Key Type" />
                  <FieldValue value={output.script_public_key_type} />
                  <FieldName name="Script Public Key" />
                  <FieldValue value={output.script_public_key} />
                  <FieldName name="Script Public Key Address" />
                  <FieldValue value={<KasLink linkType="address" link to={output.script_public_key_address} />} />
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

const FieldName = ({ name }: { name: string }) => (
  <div className="flex flex-row items-start fill-gray-500 text-gray-500 sm:col-start-1">
    <div className="flex flex-row items-center">
      <InfoIcon className="mr-1 h-4 w-4" />
      <span>{name}</span>
    </div>
  </div>
);

const FieldValue = ({ value }: { value: string | React.ReactNode }) => <span className="overflow-hidden">{value}</span>;
