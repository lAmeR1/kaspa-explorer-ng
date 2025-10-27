import KasLink from "../KasLink";
import PageTable from "../PageTable";
import Box from "../assets/box.svg";
import { useBlockdagInfo } from "../hooks/useBlockDagInfo";
import { useBlockReward } from "../hooks/useBlockReward";
import { type Block, useIncomingBlocks } from "../hooks/useIncomingBlocks";
import { useSocketCommand } from "../hooks/useSocketCommand";
import { useTransactionsCount } from "../hooks/useTransactionsCount";
import Card from "../layout/Card";
import CardContainer from "../layout/CardContainer";
import FooterHelper from "../layout/FooterHelper";
import MainBox from "../layout/MainBox";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import numeral from "numeral";
import { useEffect, useState } from "react";

dayjs().locale("en");
dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

export function meta() {
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
  const { data: blockDagInfo, isLoading: isLoadingBlockDagInfo } = useBlockdagInfo();
  const { data: blockReward, isLoading: isLoadingBlockReward } = useBlockReward();
  const { data: transactionsCount, isLoading: isLoadingTxCount } = useTransactionsCount();

  const [blocks, setBlocks] = useState<Block[]>([]);

  const { blocks: incomingBlocks, avgBlockTime } = useIncomingBlocks();

  useEffect(() => {
    setBlocks(incomingBlocks.concat(blocks).slice(0, 20));
  }, [incomingBlocks]);

  useSocketCommand({
    command: "last-blocks",
    onReceive: (data: Block[]) => {
      setBlocks(data.reverse());
    },
  });

  const totalTxCount = isLoadingTxCount
    ? ""
    : Math.floor((transactionsCount!.regular + transactionsCount!.coinbase) / 1_000_000).toString();

  return (
    <>
      <MainBox>
        <CardContainer title="Blocks">
          <Card
            loading={isLoadingBlockDagInfo}
            title="Total blocks"
            value={`${numeral(blockDagInfo?.virtualDaaScore).format("0,0")}`}
          />
          <Card loading={isLoadingTxCount} title="Total transactions" value={`> ${totalTxCount} M `} />
          <Card title="Average block time" value={`${numeral(avgBlockTime).format("0.0")} bps`} />
          <Card
            loading={isLoadingBlockReward}
            title="Block rewards"
            value={`${numeral(blockReward?.blockreward).format("0.00")} KAS`}
          />
        </CardContainer>
      </MainBox>

      <div className="flex w-full flex-col rounded-4xl bg-white p-4 text-left sm:p-8">
        <div className="bg-primary/20 text-md mb-2 basis-full rounded-2xl p-6 text-left text-black">
          Blocks are arriving with a speed of 10 blocks per second. The network is currently at block 119,762,579.
        </div>

        <PageTable
          className="text-black"
          headers={["Timestamp", "Hash", "BlueScore", "TX Count"]}
          additionalClassNames={{ 1: "overflow-hidden " }}
          rows={blocks
            .slice(0, 10)
            .map((block) => [
              dayjs(parseInt(block.timestamp)).format("HH:mm:ss"),
              <KasLink linkType="block" link to={block.block_hash} />,
              block.blueScore,
              block.txCount,
            ])}
        />
      </div>
      <FooterHelper icon={Box}>
        <span>
          A block is a secure, sequential record in the blockchain containing verified transactions, a unique hash, and
          a reference to the previous block, ensuring data integrity.
        </span>
      </FooterHelper>
    </>
  );
}
