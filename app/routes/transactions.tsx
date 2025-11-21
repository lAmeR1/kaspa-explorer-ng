import KasLink from "../KasLink";
import PageTable from "../PageTable";
import Transaction from "../assets/transaction.svg";
import { MarketDataContext } from "../context/MarketDataProvider";
import { useFeeEstimate } from "../hooks/useFeeEstimate";
import { useIncomingBlocks } from "../hooks/useIncomingBlocks";
import { useMempoolSize } from "../hooks/useMempoolSize";
import { useTransactionCount } from "../hooks/useTransactionCount";
import { useTransactionsCount } from "../hooks/useTransactionsCount";
import Card from "../layout/Card";
import CardContainer from "../layout/CardContainer";
import FooterHelper from "../layout/FooterHelper";
import HelperBox from "../layout/HelperBox";
import MainBox from "../layout/MainBox";
import numeral from "numeral";
import { useContext } from "react";

export function meta() {
  return [
    { title: "Kaspa Transactions List | Kaspa Explorer" },
    {
      name: "description",
      content:
        "Track the latest Kaspa transactions. View transaction ID, sender, recipient, fees, and block confirmations.",
    },
    { name: "keywords", content: "Kaspa transactions, blockchain transfers, transaction ID, sender, receiver, fees" },
  ];
}

export default function Transactions() {
  const { transactions } = useIncomingBlocks();
  const { data: transactionCount, isLoading: isLoadingTxCount } = useTransactionCount();
  const { data: feeEstimate, isLoading: isLoadingFee } = useFeeEstimate();
  const marketData = useContext(MarketDataContext);
  const { data: transactionsCountTotal, isLoading: isLoadingTxCountTotal } = useTransactionsCount();
  const { mempoolSize: mempoolSize } = useMempoolSize();

  const totalTxCount = isLoadingTxCountTotal
    ? ""
    : Math.floor((transactionsCountTotal!.regular + transactionsCountTotal!.coinbase) / 1_000_000).toString();

  const txCount =
    transactionCount && transactionCount.length > 0
      ? (transactionCount[0].regular + transactionCount[0].coinbase) / 3600
      : "-";

  const regularFee = feeEstimate ? (feeEstimate.normalBuckets[0].feerate * 2036) / 1_0000_0000 : 0;
  const regularFeeUsd = (regularFee * (marketData?.price ?? 0)).toFixed(6);

  return (
    <>
      <MainBox>
        <CardContainer title="Transactions">
          <Card title="Total transactions" value={`${numeral(totalTxCount).format("0")} M`} />
          <Card title="Average TPS (1 hr)" value={`${numeral(txCount).format("0.0")}`} loading={isLoadingTxCount} />
          <Card
            title="Regular fee"
            value={`${numeral(regularFee).format("0.00000000")} KAS`}
            subtext={`${numeral(regularFeeUsd).format("0,0.00[000000]")} $`}
            loading={isLoadingFee}
          />
          <Card title="Mempool size" value={mempoolSize} />
        </CardContainer>
      </MainBox>

      <MainBox>
        <HelperBox>Blocks and its transactions are arriving with a speed of 10 blocks per second.</HelperBox>

        <PageTable
          className="text-black w-full"
          headers={["Timestamp", "Transaction ID", "Amount"]}
          additionalClassNames={{ 1: "overflow-hidden " }}
          rows={transactions.map((transaction) => [
            "a moment ago",
            <KasLink linkType="transaction" link to={transaction.txId} mono />,
            <>
              {numeral(transaction.outputs.reduce((acc, output) => acc + Number(output[1]), 0) / 1_0000_0000).format(
                "0,0.[00]",
              )}
              <span className="text-gray-500 text-nowrap"> KAS</span>
            </>,
          ])}
        />
      </MainBox>
      <FooterHelper icon={Transaction}>
        A transaction is a cryptographically signed command that modifies the blockchain's state. Block explorers
        monitor and display the details of every transaction within the network.
      </FooterHelper>
    </>
  );
}
