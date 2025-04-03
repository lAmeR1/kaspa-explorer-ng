import type { Route } from "./+types/transactions";
import numeral from "numeral";

// @ts-ignore
import Transaction from "../assets/transaction.svg?react";
import { Link } from "react-router";
import Accepted from "~/Accepted";
import Button from "~/Button";
import CardContainer from "~/layout/CardContainer";
import Card from "~/layout/Card";
import MainBox from "~/layout/MainBox";
import HelperBox from "~/layout/HelperBox";
import FooterHelper from "~/layout/FooterHelper";

export function meta({}: Route.MetaArgs) {
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
          <Card
            title="Average TPS (24 hrs)"
            value={`${numeral(154.2).format("0.0")}`}
          />
          <Card
            title="Volume transacted (30 days)"
            value={`${numeral(603123943).format("0,0")} KAS`}
          />
          <Card
            title="Volume transacted (24 hours)"
            value={`${numeral(69951282).format("0,0")} KAS`}
          />
          <Card
            title="Average Transaction Fee (24 hours)"
            value={`${numeral(0.02332).format("0.0000[0000]")} KAS`}
          />
        </CardContainer>
      </MainBox>

      <MainBox>
        <HelperBox>
          Blocks and its transactions are arriving with a speed of 10 blocks per
          second. You can pause the update using the button.
          <Button value={"Pause??"} primary />
          <Button value="Ignore coinbase TXs" primary />
        </HelperBox>

        <table className="mt-4">
          <thead>
            <tr className="text-base border-b border-gray-100">
              <th className="font-normal pl-0.5">Timestamp</th>
              <th className="font-normal pl-0.5">TX ID</th>
              <th className="font-normal pl-0.5">Amount</th>
              <th className="font-normal text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(20)].map((_, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 text-black text-base"
              >
                <td className="pr-2 text-nowrap">
                  {(index + 1) * 2} second ago
                </td>
                <td className="text-link pr-2 font-mono">
                  <span className="hidden md:table-cell">
                    <Link to="/transactions/330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7">
                      {
                        "330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7"
                      }
                    </Link>
                  </span>
                  <span className="hidden xs:table-cell md:hidden">
                    {"330ecb081ea2093ffb...ef667d5fa0ce7dfccd7"}
                  </span>
                  <span className="table-cell xs:hidden">
                    {"330ecb08...d5fa0ce7dfccd7"}
                  </span>
                </td>
                <td className="hidden sm:table-cell">
                  82.9981<span className="text-gray-500 text-sm"> KAS</span>
                </td>
                <td className="pl-5 py-3 flex flex-row justify-end">
                  <Accepted />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MainBox>
      <FooterHelper icon={Transaction}>
        A transaction is a cryptographically signed command that modifies the
        blockchain's state. Block explorers monitor and display the details of
        every transaction within the network.
      </FooterHelper>
    </>
  );
}
