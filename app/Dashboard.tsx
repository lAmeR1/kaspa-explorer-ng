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
import BarChart from "./assets/bar_chart.svg?react";

const Dashboard = () => {
    const [search, setSearch] = useState('');

    return <>
        <div className="flex flex-col w-full bg-white rounded-4xl gap-y-3
                px-4 sm:px-8 md:px-20 lg:px-24 xl:px-36
                py-12 sm:py-12 md:px-24 lg:py-24 xl:py-38
        ">
            <span className="text-4xl">Kaspa Explorer</span>
            <span className="text-sm mb-6">Kaspa is the fastest, open-source, decentralized & fully scalable Layer-1 PoW network in the world.</span>
            <SearchBox value={search} onChange={setSearch} className="w-full py-4"/>
        </div>
        <div className="flex flex-col w-full bg-black text-white rounded-4xl
                px-4 sm:px-8 md:px-20 lg:px-24 xl:px-36
                py-12 sm:py-12 md:px-24 lg:py-24 xl:py-38
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