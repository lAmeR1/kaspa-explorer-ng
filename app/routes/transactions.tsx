import Transaction from "../assets/transaction.svg";
import numeral from "numeral";
import { Link } from "react-router";
import { Accepted } from "~/Accepted";
import Button from "~/Button";
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
          <Button value={"Pause??"} primary />
          <Button value="Ignore coinbase TXs" primary />
        </HelperBox>

        <table className="mt-4">
          <thead>
            <tr className="border-b border-gray-100 text-base">
              <th className="pl-0.5 font-normal">Timestamp</th>
              <th className="pl-0.5 font-normal">TX ID</th>
              <th className="pl-0.5 font-normal">Amount</th>
              <th className="text-right font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(20)].map((_, index) => (
              <tr key={index} className="border-b border-gray-100 text-base text-black">
                <td className="pr-2 text-nowrap">{(index + 1) * 2} second ago</td>
                <td className="text-link pr-2 font-mono">
                  <span className="hidden md:table-cell">
                    <Link to="/transactions/330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7">
                      {"330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7"}
                    </Link>
                  </span>
                  <span className="xs:table-cell hidden md:hidden">{"330ecb081ea2093ffb...ef667d5fa0ce7dfccd7"}</span>
                  <span className="xs:hidden table-cell">{"330ecb08...d5fa0ce7dfccd7"}</span>
                </td>
                <td className="hidden sm:table-cell">
                  82.9981<span className="text-sm text-gray-500"> KAS</span>
                </td>
                <td className="flex flex-row justify-end py-3 pl-5">
                  <Accepted />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MainBox>
      <FooterHelper icon={Transaction}>
        A transaction is a cryptographically signed command that modifies the blockchain's state. Block explorers
        monitor and display the details of every transaction within the network.
      </FooterHelper>
    </>
  );
}
