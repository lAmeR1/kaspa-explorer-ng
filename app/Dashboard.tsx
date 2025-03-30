import SearchBox from "~/header/SearchBox";
import {useState} from "react";
import numeral from "numeral";

// @ts-ignore
import Swap from "./assets/swap.svg?react";
// @ts-ignore
import Box from "./assets/box.svg?react";
// @ts-ignore
import Coins from "./assets/coins.svg?react";
// @ts-ignore
import Landslide from "./assets/landslide.svg?react";
// @ts-ignore
import Time from "./assets/time.svg?react";
// @ts-ignore
import AccountBalanceWallet from "./assets/account_balance_wallet.svg?react";
// @ts-ignore
import Trophy from "./assets/trophy.svg?react";
// @ts-ignore
import Rocket from "./assets/rocket_launch.svg?react";
// @ts-ignore
import BackToTab from "./assets/back_to_tab.svg?react";
// @ts-ignore
import VerifiedUser from "./assets/verified_user.svg?react";
// @ts-ignore
import FlashOn from "./assets/flash_on.svg?react";

const Dashboard = () => {
    const [search, setSearch] = useState('');

    return <>
        <div className="flex flex-col w-full bg-white rounded-4xl gap-y-3
                px-4 sm:px-8 md:px-20 lg:px-24 xl:px-36
                py-12 sm:py-12 md:py-20 lg:py-24 xl:py-38
        ">
            <span className="text-4xl">Kaspa Explorer</span>
            <span className="text-sm mb-6">Kaspa is the fastest, open-source, decentralized & fully scalable Layer-1 PoW network in the world.</span>
            <SearchBox value={search} onChange={setSearch} className="w-full py-4"/>
        </div>
        <div className="flex flex-col w-full bg-black text-white rounded-4xl
                px-4 sm:px-8 md:px-20 lg:px-24 xl:px-36
                py-12 sm:py-12 md:py-20 lg:py-24 xl:py-38
        ">
            <span className="text-4xl mb-7">Kaspa by the numbers</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
                <DashboardBox
                    description="Total transactions"
                    value={numeral(566754156).format("0,0")}
                    icon={<Swap className="w-5"/>}/>
                <DashboardBox
                    description="Total blocks"
                    value={numeral(566754156).format("0,0")}
                    icon={<Box className="w-5"/>}/>
                <DashboardBox
                    description="Total supply"
                    value={numeral(21588635122).format("0,0")}
                    unit="KAS"
                    icon={<Coins className="w-5"/>}/>
                <DashboardBox
                    description="Mined"
                    value={90.12}
                    unit="%"
                    icon={<Landslide className="w-5"/>}/>
                <DashboardBox
                    description="Average block time"
                    value={"1.7"}
                    unit="s"
                    icon={<Time className="w-5"/>}/>
                <DashboardBox
                    description="Wallet addresses"
                    value={numeral(349212812).format("0,0")}
                    icon={<AccountBalanceWallet className="w-5"/>}/>
                <DashboardBox
                    description="Block reward"
                    value={77.76}
                    unit="KAS"
                    icon={<Trophy className="w-5"/>}/>
                <DashboardBox
                    description="Reward reduction"
                    value={"12 Dec 2024 19:20"}
                    icon={<Swap className="w-5"/>}/>
            </div>
        </div>
        <div className="flex w-full text-black
                flex-col sm:flex-row
                gap-x-28 gap-y-14
                px-4 sm:px-8 md:px-20 lg:px-24 xl:px-36
                pt-4 sm:pt-12 md:pt-20 lg:pt-24 xl:pt-38
                pb-4 sm:pb-6 md:pb-8 lg:pb-12 xl:pb-14
                ">
            <div className="text-5xl flex-1/2">About Kaspa</div>
            <div className="text-base flex-1/2">Kaspa is a community project – completely open source with no central
                governance – following in the ethos of coins like Bitcoin. The coin was fair-launched without pre-mining
                or any other pre-allocation of coins.
            </div>
        </div>
        <div className="flex flex-row w-full text-black
        px-4 sm:px-8 md:px-20 lg:px-24 xl:px-36
        ">
            <div className="w-full h-[1px] bg-gray-300"/>
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-y-12 gap-x-28 text-black
                px-4 sm:px-8 md:px-20 lg:px-24 xl:px-36
                pt-4 sm:pt-6 md:pt-8 lg:pt-12 xl:pt-14
                pb-4 sm:pb-12 md:pb-20 lg:pb-24 xl:pb-38
                ">
            <div className="text-xl flex-1/2">The world’s first blockDAG – a digital ledger enabling parallel blocks
                and instant transaction confirmation – built on a robust proof-of-work engine with rapid single-second
                block intervals.
            </div>
            <div className="text-base flex-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-16">
                    <DashboardInfoBox
                        description="Kaspa enables near-instant transaction confirmations, ensuring seamless and efficient user experiences for payments and transfers."
                        title="Instant transactions"
                        icon={<Rocket className="w-5"/>}
                    />
                    <DashboardInfoBox
                        description="Designed with scalability in mind, Kaspa handles high transaction volumes without compromising speed or decentralization."
                        title="Scalable Network"
                        icon={<BackToTab className="w-5"/>}
                    />
                    <DashboardInfoBox
                        description="Kaspa uses innovative technology to minimize energy consumption, making it a greener choice in blockchain networks."
                        title="Energy Efficiency"
                        icon={<FlashOn className="w-5"/>}
                    />
                    <DashboardInfoBox
                        description="With its robust and decentralized infrastructure, Kaspa ensures secure transactions without reliance on central authorities."
                        title="Decentralized Security"
                        icon={<VerifiedUser className="w-5"/>}
                    />

                </div>
            </div>
        </div>

    </>;
};


interface DashboardBoxProps {
    icon: React.ReactNode;
    description: string;
    value: string | number;
    unit?: string;
}

const DashboardBox = (props: DashboardBoxProps) => {
    return <div className="flex flex-col gap-y-2 border border-gray-800 py-4 px-6 rounded-2xl">
        <div className="text-lg flex flex-row items-center overflow-hidden">
            <div className="fill-primary mr-1 w-5">
                {props.icon}
            </div>
            <span className="text-sm text-gray-500">{props.description}</span></div>
        <span className="text-base md:text-lg xl:text-xl">
            {props.value}
            {props.unit ? <span className="text-base text-gray-500"> {props.unit}</span> : ""}
        </span>
    </div>
}

export default Dashboard;


interface InfoBoxProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const DashboardInfoBox = (props: InfoBoxProps) => {
    return <div className="flex flex-col gap-y-2">
        <>{props.icon}</>
        <span className="text-xl">{props.title}</span>
        <span className="text-sm text-gray-500">{props.description}</span>
    </div>
}