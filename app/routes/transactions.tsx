import Transaction from "../assets/transaction.svg";
import numeral from "numeral";
import { Link } from "react-router";
import { Accepted } from "~/Accepted";
import Button from "~/Button";
import KasLink from "~/KasLink";
import Card from "~/layout/Card";
import CardContainer from "~/layout/CardContainer";
import FooterHelper from "~/layout/FooterHelper";
import HelperBox from "~/layout/HelperBox";
import MainBox from "~/layout/MainBox";

export function meta() {
  return [
    { title: "Kaspa Explorer - Transactions" },
    {
      name: "description",
      content:
        "Transactions page of Kaspa Explorer displaying a comprehensive overview of recent transactions," +
        " including their details and insights into the Kaspa blockchain.",
    },
  ];
}

export default function Transactions() {
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
        <HelperBox>
          Blocks and its transactions are arriving with a speed of 10 blocks per second. You can pause the update using
          the button.
          <Button value={"Pause"} primary />
          <Button value="Ignore coinbase TXs" primary />
        </HelperBox>

        <div className="d mt-4 grid w-full grid-cols-[auto_2fr_auto] items-center divide-y-1 divide-gray-100">
          <div className="pl-0.5 text-gray-500">Timestamp</div>
          <div className="pl-0.5 text-gray-500">TX ID</div>
          <div className="pl-0.5 text-right text-gray-500">Amount</div>

          {[...Array(20)].map((_, index) => (
            <>
              <div className="last:bg-alert h-12 py-3 pr-2 text-nowrap">{(index + 1) * 2} second ago</div>
              <div className="last:bg-alert py-3 pr-2 font-mono">
                <KasLink
                  linkType="transaction"
                  link
                  to="330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7"
                />
              </div>
              <div className="last:bg-alert py-3 text-right">
                82.<span className="text-sm">9981</span>
                <span className="text-sm text-gray-500"> KAS</span>
              </div>
            </>
          ))}
        </div>
      </MainBox>
      <FooterHelper icon={Transaction}>
        A transaction is a cryptographically signed command that modifies the blockchain's state. Block explorers
        monitor and display the details of every transaction within the network.
      </FooterHelper>
    </>
  );
}
