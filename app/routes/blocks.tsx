import IconMessageBox from "../IconMessageBox";
import Box from "../assets/box.svg";
import { useBlockdagInfo } from "../hooks/useBlockDagInfo";
import { useBlockReward } from "../hooks/useBlockReward";
import { type Block } from "../hooks/useIncomingBlocks";
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
import React, { useState } from "react";

dayjs().locale("en");
dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

export function meta() {
  return [
    { title: "Kaspa Blocks List | Kaspa Explorer" },
    {
      name: "description",
      content:
        "Explore recent Kaspa blocks. View height, timestamp, transactions, block hash, and miner details in real-time.",
    },
    { name: "keywords", content: "Kaspa blocks, blockchain explorer, latest blocks, transactions, miners" },
  ];
}

export default function Blocks() {
  const { data: blockDagInfo, isLoading: isLoadingBlockDagInfo } = useBlockdagInfo();
  const { data: blockReward, isLoading: isLoadingBlockReward } = useBlockReward();
  const { data: transactionsCount, isLoading: isLoadingTxCount } = useTransactionsCount();

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
          <Card title="Average block time" value="0.1s" />
          <Card
            loading={isLoadingBlockReward}
            title="Block rewards"
            value={`${numeral(blockReward?.blockreward).format("0.00")} KAS`}
          />
        </CardContainer>
      </MainBox>

      <div className="flex w-full flex-col rounded-4xl bg-white p-4 text-left sm:p-8">
        <IconMessageBox
          icon="error"
          title="Update"
          description="This part of the page is currently getting an update."
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
