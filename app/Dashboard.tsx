import numeral from "numeral";
import { useState } from "react";
import SearchBox from "~/header/SearchBox";

import Swap from "./assets/swap.svg";

import Box from "./assets/box.svg";

import Coins from "./assets/coins.svg";

import Landslide from "./assets/landslide.svg";

import Time from "./assets/time.svg";

import AccountBalanceWallet from "./assets/account_balance_wallet.svg";

import Trophy from "./assets/trophy.svg";

import Rocket from "./assets/rocket_launch.svg";

import BackToTab from "./assets/back_to_tab.svg";

import VerifiedUser from "./assets/verified_user.svg";

import FlashOn from "./assets/flash_on.svg";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="flex w-full flex-col gap-y-3 rounded-4xl bg-white px-4 py-12 sm:px-8 sm:py-12 md:px-20 md:py-20 lg:px-24 lg:py-24 xl:px-36 xl:py-38">
        <span className="text-[54px]">Kaspa Explorer</span>
        <span className="mb-6 text-lg">
          Kaspa is the fastest, open-source, decentralized & fully scalable
          Layer-1 PoW network in the world.
        </span>
        <SearchBox
          value={search}
          onChange={setSearch}
          className="w-full py-4"
        />
      </div>
      <div className="flex w-full flex-col rounded-4xl bg-black px-4 py-12 text-white sm:px-8 sm:py-12 md:px-20 md:py-20 lg:px-24 lg:py-24 xl:px-36 xl:py-26">
        <span className="mb-7 text-3xl md:text-4xl lg:text-5xl">
          Kaspa by the numbers
        </span>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardBox
            description="Total transactions"
            value={numeral(566754156).format("0,0")}
            icon={<Swap className="w-5" />}
          />
          <DashboardBox
            description="Total blocks"
            value={numeral(566754156).format("0,0")}
            icon={<Box className="w-5" />}
          />
          <DashboardBox
            description="Total supply"
            value={numeral(21588635122).format("0,0")}
            unit="KAS"
            icon={<Coins className="w-5" />}
          />
          <DashboardBox
            description="Mined"
            value={90.12}
            unit="%"
            icon={<Landslide className="w-5" />}
          />
          <DashboardBox
            description="Average block time"
            value={"1.7"}
            unit="s"
            icon={<Time className="w-5" />}
          />
          <DashboardBox
            description="Wallet addresses"
            value={numeral(349212812).format("0,0")}
            icon={<AccountBalanceWallet className="w-5" />}
          />
          <DashboardBox
            description="Block reward"
            value={77.76}
            unit="KAS"
            icon={<Trophy className="w-5" />}
          />
          <DashboardBox
            description="Reward reduction"
            value={"12 Dec 2024 19:20"}
            icon={<Swap className="w-5" />}
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-x-28 gap-y-14 px-4 pt-10 pb-4 text-black sm:flex-row sm:px-8 sm:pt-12 sm:pb-6 md:px-20 md:pt-20 md:pb-8 lg:px-24 lg:pt-24 lg:pb-12 xl:px-36 xl:pt-38 xl:pb-14">
        <div className="flex-1/2 text-5xl">About Kaspa</div>
        <div className="flex-1/2 text-base">
          Kaspa is a community project – completely open source with no central
          governance – following in the ethos of coins like Bitcoin. The coin
          was fair-launched without pre-mining or any other pre-allocation of
          coins.
        </div>
      </div>
      <div className="flex w-full flex-row px-4 text-black sm:px-8 md:px-20 lg:px-24 xl:px-36">
        <div className="h-[1px] w-full bg-gray-300" />
      </div>
      <div className="flex w-full flex-col gap-x-28 gap-y-12 px-4 pt-4 pb-10 text-black sm:px-8 sm:pt-6 sm:pb-12 md:px-20 md:pt-8 md:pb-20 lg:flex-row lg:px-24 lg:pt-12 lg:pb-24 xl:px-36 xl:pt-14 xl:pb-38">
        <div className="flex-1/2 text-base">
          The world’s first blockDAG – a digital ledger enabling parallel blocks
          and instant transaction confirmation – built on a robust proof-of-work
          engine with rapid single-second block intervals.
        </div>
        <div className="flex-1/2 text-base">
          <div className="grid grid-cols-1 gap-x-14 gap-y-16 sm:grid-cols-2">
            <DashboardInfoBox
              description="Kaspa enables near-instant transaction confirmations, ensuring seamless and efficient user experiences for payments and transfers."
              title="Instant transactions"
              icon={<Rocket className="w-5" />}
            />
            <DashboardInfoBox
              description="Designed with scalability in mind, Kaspa handles high transaction volumes without compromising speed or decentralization."
              title="Scalable Network"
              icon={<BackToTab className="w-5" />}
            />
            <DashboardInfoBox
              description="Kaspa uses innovative technology to minimize energy consumption, making it a greener choice in blockchain networks."
              title="Energy Efficiency"
              icon={<FlashOn className="w-5" />}
            />
            <DashboardInfoBox
              description="With its robust and decentralized infrastructure, Kaspa ensures secure transactions without reliance on central authorities."
              title="Decentralized Security"
              icon={<VerifiedUser className="w-5" />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

interface DashboardBoxProps {
  icon: React.ReactNode;
  description: string;
  value: string | number;
  unit?: string;
}

const DashboardBox = (props: DashboardBoxProps) => {
  return (
    <div className="flex flex-col gap-y-2 rounded-2xl border border-gray-800 px-6 py-4">
      <div className="flex flex-row items-center overflow-hidden text-lg">
        <div className="fill-primary mr-1 w-5">{props.icon}</div>
        <span className="text-sm text-gray-500">{props.description}</span>
      </div>
      <span className="text-base md:text-lg xl:text-xl">
        {props.value}
        {props.unit ? (
          <span className="text-base text-gray-500"> {props.unit}</span>
        ) : (
          ""
        )}
      </span>
    </div>
  );
};

export default Dashboard;

interface InfoBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DashboardInfoBox = (props: InfoBoxProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <>{props.icon}</>
      <span className="text-xl">{props.title}</span>
      <span className="text-sm text-gray-500">{props.description}</span>
    </div>
  );
};
