import type { Route } from "./+types/blocks";
import numeral from "numeral";

// @ts-ignore
import Box from "../assets/box.svg?react";
import { Link } from "react-router";
import CardContainer from "~/layout/CardContainer";
import Card from "~/layout/Card";
import MainBox from "~/layout/MainBox";
import FooterHelper from "~/layout/FooterHelper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kaspa Explorer - Blocks" },
    {
      name: "description",
      content:
        "Overview page of Kaspa Block Explorer, showcasing recent blocks, their details, and insights into the Kaspa blockchain.",
    },
  ];
}

export default function Blocks() {
  return (
    <>
      <MainBox>
        <CardContainer title="Blocks">
          <Card
            title="Total blocks"
            value={`${numeral(100990000).format("0,0")}`}
          />
          <Card
            title="Total transactions"
            value={`${numeral(11412419616).format("0,0")}`}
          />
          <Card
            title="Average block time"
            value={`${numeral(0.14).format("0.00")} s`}
          />
          <Card
            title="Block rewards"
            value={`${numeral(88.988).format("0.00")} KAS`}
          />
        </CardContainer>
      </MainBox>

      <div className="flex w-full flex-col rounded-4xl bg-white p-4 text-left text-gray-500 sm:p-8">
        <div className="bg-primary/20 text-md mb-2 basis-full rounded-2xl p-6 text-left text-black">
          Blocks are arriving with a speed of 10 blocks per second. The network
          is currently at block 119,762,579.
        </div>

        <table>
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pl-0.5 font-normal">Timestamp</th>
              <th className="pl-0.5 font-normal">Hash</th>
              <th className="hidden pl-0.5 text-left font-normal sm:table-cell">
                BlueScore
              </th>
              <th className="text-right font-normal text-nowrap">TX Count</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(20)].map((_, index) => (
              <tr key={index} className="border-b border-gray-100 text-black">
                <td className="pr-2 text-nowrap">1 second ago</td>
                <td className="text-link pr-2">
                  <span className="hidden md:table-cell">
                    <Link to="/blocks/330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7">
                      {
                        "330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7"
                      }
                    </Link>
                  </span>
                  <span className="xs:table-cell hidden md:hidden">
                    {"330ecb081ea2093ffb...ef667d5fa0ce7dfccd7"}
                  </span>
                  <span className="xs:hidden table-cell">
                    {"330ecb08...d5fa0ce7dfccd7"}
                  </span>
                </td>
                <td className="hidden sm:table-cell">124121225</td>
                <td className="py-3 pl-5 text-right">55</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FooterHelper>
        <div className="me-2 h-5 w-5">
          <Box className="h-5 w-5 fill-gray-500" />
        </div>
        <span>
          A block is a secure, sequential record in the blockchain containing
          verified transactions, a unique hash, and a reference to the previous
          block, ensuring data integrity.
        </span>
      </FooterHelper>
    </>
  );
}
