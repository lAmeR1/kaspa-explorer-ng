import KasLink from "../KasLink";
import PageTable from "../PageTable";
import Transaction from "../assets/transaction.svg";
import { useIncomingBlocks } from "../hooks/useIncomingBlocks";
import Card from "../layout/Card";
import CardContainer from "../layout/CardContainer";
import FooterHelper from "../layout/FooterHelper";
import HelperBox from "../layout/HelperBox";
import MainBox from "../layout/MainBox";
import numeral from "numeral";

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

  return (
    <>
      <MainBox>
        <CardContainer title="Transactions">
          <Card title="Average TPS (24 hrs)" value={`${numeral(154.2).format("0.0")}`} />
          <Card title="Volume transacted (30 days)" value={`${numeral(603123943).format("0,0")} KAS`} />
          <Card title="Volume transacted (24 hours)" value={`${numeral(69951282).format("0,0")} KAS`} />
          <Card title="Average Transaction Fee (24 hours)" value={`${numeral(0.02332).format("0.0000[0000]")} KAS`} />
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
            <KasLink linkType="transaction" link to={transaction.txId} />,
            numeral(transaction.outputs.reduce((acc, output) => acc + Number(output[1]), 0) / 1_0000_0000).format(
              "0,0.[00]",
            ),
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
