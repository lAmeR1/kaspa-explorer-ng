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
import KasLink from "~/KasLink";
import KaspaAddress from "~/KaspaAddress";
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
  const { data: transaction } = useTransactionById(loaderData.transactionId);
  const { data: virtualChainBlueScore } = useVirtualChainBlueScore();
  const marketData = useContext(MarketDataContext);

  if (transaction === undefined) {
    return <>Loading Transaction</>;
  }

  const isTabActive = (tab: string) => {
    const params = new URLSearchParams(location.search); // Lesen der Query-Parameter

    if (tab === "general" && params.get("tab") === null) {
      return true;
    }

    return params.get("tab") === tab;
  };

  const confirmations = (virtualChainBlueScore?.blueScore || 0) - (transaction?.accepting_block_blue_score || 0);
  const transactionSum = transaction.outputs.reduce((sum, output) => sum + output.amount, 0);
  const displaySum = numeral((transactionSum || 0) / 1_0000_0000).format("0,0.00[000000]");
  const inputSum = transaction?.inputs.reduce((sum, input) => sum + input.previous_outpoint_amount, 0);

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
            value={transaction?.inputs.map((input) => (
              <KaspaAddress copy qr link value={input.previous_outpoint_address} />
            ))}
          />
          <FieldName name="To" />
          <FieldValue
            value={transaction?.outputs.map((output) => (
              <KaspaAddress copy qr link value={output.script_public_key_address} />
            ))}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-x-18 gap-y-2 overflow-x-auto rounded-4xl bg-white p-4 text-left text-black sm:p-8">
        <div className="mr-auto flex w-auto flex-row items-center justify-around gap-x-1 rounded-full bg-gray-50 p-1 px-1">
          <NavLink
            to="/transactions/330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7?tab=general"
            preventScrollReset={true}
            className={() =>
              `rounded-full px-4 py-1.5 hover:cursor-pointer hover:bg-white ${isTabActive("general") ? "bg-white" : ""}`
            }
          >
            General information
          </NavLink>
          <NavLink
            to="/transactions/330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7?tab=inputs"
            preventScrollReset={true}
            className={() =>
              `rounded-full px-4 py-1.5 hover:cursor-pointer hover:bg-white ${isTabActive("inputs") ? "bg-white" : ""}`
            }
          >
            Inputs
          </NavLink>
          <NavLink
            to="/transactions/330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7?tab=outputs"
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
            <FieldValue value={<KasLink to={transaction.transaction_id} linkType="transaction" />} />
            <FieldName name="Subnetwork ID" />
            <FieldValue value={transaction.subnetwork_id} />
            <FieldName name="Status" />
            <FieldValue
              value={
                <div className="flex flex-row items-center gap-x-1">
                  {transaction.is_accepted ? <Accepted /> : <NotAccepted />}
                  {confirmations < 86400 ? (
                    <span className="flex flex-row items-center gap-x-1">
                      {confirmations} confirmations
                      <ClockLoader className="h-4 w-4" />
                    </span>
                  ) : (
                    <Confirmed />
                  )}
                </div>
              }
            />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Hash" />
            <FieldValue value={transaction.hash} />
            <FieldName name="Compute mass" />
            <FieldValue value={transaction.mass} />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Block hashes" />
            <FieldValue
              value={transaction.block_hash.map((blockHash) => (
                <div>
                  <KasLink linkType="block" to={blockHash} />
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
            <FieldValue value={<KasLink linkType="block" to={transaction.accepting_block_hash} />} />
            {transaction.inputs.length > 0 && (
              <>
                <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
                <FieldName name="Transaction fee" />
                <FieldValue
                  value={
                    <>
                      <span>{fee}</span>
                      <span className="text-gray-500"> KAS</span>
                      <div>{numeral(fee * (marketData?.price || 0)).format("$0,0.00000000")}</div>
                    </>
                  }
                />
              </>
            )}
          </div>
        )}

        {isTabActive("inputs") && (
          <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 rounded-4xl bg-white text-left text-nowrap text-black sm:grid-cols-[auto_1fr]">
            <FieldName name="Signature Op Count" />
            <FieldValue value="1" />
            <FieldName name="Signature Script" />
            <FieldValue value={"14122242".repeat(8)} />
            <FieldName name="Amount" />
            <FieldValue
              value={
                <>
                  <span>14,123.24045</span>
                  <span className="text-gray-500"> KAS</span>
                </>
              }
            />
            <FieldName name="Previous Outpoint Index" />
            <FieldValue value="#2" />
            <FieldName name="Hash" />
            <FieldValue value="3eaa150bc6300ca0fe8fa6a2724f832a37e963a0399850177151a72461e16ea2" />
            <FieldName name="Address" />
            <FieldValue value="kaspa:qzapfmt7zeh0rzakhrce72rfm6c3r06nw6vxx6e8qjlxntdw7zcaxajep8w82" />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Signature Op Count" />
            <FieldValue value="1" />
            <FieldName name="Signature Script" />
            <FieldValue value={"14122242".repeat(8)} />
            <FieldName name="Amount" />
            <FieldValue
              value={
                <>
                  <span>14,123.24045</span>
                  <span className="text-gray-500"> KAS</span>
                </>
              }
            />
            <FieldName name="Previous Outpoint Index" />
            <FieldValue value="#2" />
            <FieldName name="Hash" />
            <FieldValue value="3eaa150bc6300ca0fe8fa6a2724f832a37e963a0399850177151a72461e16ea2" />
            <FieldName name="Address" />
            <FieldValue value="kaspa:qzapfmt7zeh0rzakhrce72rfm6c3r06nw6vxx6e8qjlxntdw7zcaxajep8w82" />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Signature Op Count" />
            <FieldValue value="1" />
            <FieldName name="Signature Script" />
            <FieldValue value={"14122242".repeat(8)} />
            <FieldName name="Amount" />
            <FieldValue
              value={
                <>
                  <span>14,123.24045</span>
                  <span className="text-gray-500"> KAS</span>
                </>
              }
            />
            <FieldName name="Previous Outpoint Index" />
            <FieldValue value="#2" />
            <FieldName name="Hash" />
            <FieldValue value="3eaa150bc6300ca0fe8fa6a2724f832a37e963a0399850177151a72461e16ea2" />
            <FieldName name="Address" />
            <FieldValue value="kaspa:qzapfmt7zeh0rzakhrce72rfm6c3r06nw6vxx6e8qjlxntdw7zcaxajep8w82" />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Signature Op Count" />
            <FieldValue value="1" />
            <FieldName name="Signature Script" />
            <FieldValue value={"14122242".repeat(8)} />
            <FieldName name="Amount" />
            <FieldValue
              value={
                <>
                  <span>14,123.24045</span>
                  <span className="text-gray-500"> KAS</span>
                </>
              }
            />
            <FieldName name="Previous Outpoint Index" />
            <FieldValue value="#2" />
            <FieldName name="Hash" />
            <FieldValue value="3eaa150bc6300ca0fe8fa6a2724f832a37e963a0399850177151a72461e16ea2" />
            <FieldName name="Address" />
            <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022" />
          </div>
        )}

        {isTabActive("outputs") && (
          <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 rounded-4xl bg-white text-left text-nowrap text-black sm:grid-cols-[auto_1fr]">
            <FieldName name="Index" />
            <FieldValue value="1" />
            <FieldName name="Amount" />
            <FieldValue
              value={
                <>
                  <span>14,123.24045</span>
                  <span className="text-gray-500"> KAS</span>
                </>
              }
            />
            <FieldName name="Script Public Key Type" />
            <FieldValue value="scripthash" />
            <FieldName name="Script Public Key" />
            <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187" />
            <FieldName name="Script Public Key Address" />
            <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022" />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Index" />
            <FieldValue value="1" />
            <FieldName name="Amount" />
            <FieldValue
              value={
                <>
                  <span>14,123.24045</span>
                  <span className="text-gray-500"> KAS</span>
                </>
              }
            />
            <FieldName name="Script Public Key Type" />
            <FieldValue value="scripthash" />
            <FieldName name="Script Public Key" />
            <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187" />
            <FieldName name="Script Public Key Address" />
            <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022" />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Index" />
            <FieldValue value="1" />
            <FieldName name="Amount" />
            <FieldValue
              value={
                <>
                  <span>14,123.24045</span>
                  <span className="text-gray-500"> KAS</span>
                </>
              }
            />
            <FieldName name="Script Public Key Type" />
            <FieldValue value="scripthash" />
            <FieldName name="Script Public Key" />
            <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187" />
            <FieldName name="Script Public Key Address" />
            <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022" />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Index" />
            <FieldValue value="1" />
            <FieldName name="Amount" />
            <FieldValue
              value={
                <>
                  <span>14,123.24045</span>
                  <span className="text-gray-500"> KAS</span>
                </>
              }
            />
            <FieldName name="Script Public Key Type" />
            <FieldValue value="scripthash" />
            <FieldName name="Script Public Key" />
            <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187" />
            <FieldName name="Script Public Key Address" />
            <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022" />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Index" />
            <FieldValue value="1" />
            <FieldName name="Amount" />
            <FieldValue
              value={
                <>
                  <span>14,123.24045</span>
                  <span className="text-gray-500"> KAS</span>
                </>
              }
            />
            <FieldName name="Script Public Key Type" />
            <FieldValue value="scripthash" />
            <FieldName name="Script Public Key" />
            <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187" />
            <FieldName name="Script Public Key Address" />
            <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022" />
            {/*horizontal rule*/}
            <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
            <FieldName name="Index" />
            <FieldValue value="1" />
            <FieldName name="Amount" />
            <FieldValue
              value={
                <>
                  <span>14,123.24045</span>
                  <span className="text-gray-500"> KAS</span>
                </>
              }
            />
            <FieldName name="Script Public Key Type" />
            <FieldValue value="scripthash" />
            <FieldName name="Script Public Key" />
            <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187" />
            <FieldName name="Script Public Key Address" />
            <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022" />
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
