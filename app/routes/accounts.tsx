import type {Route} from "./+types/transactions";
import numeral from "numeral";

// @ts-ignore
import AccountBalanceWallet from "../assets/account_balance_wallet.svg?react";
import {Link} from "react-router";
import Accepted from "~/Accepted";
import Button from "~/Button";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Kaspa Explorer - Accounts"},
        {
            name: "description",
            content: "",
        },
    ];
}

export default function Accounts() {
    return <>
        <div className="bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full">
            <div className="text-2xl mb-4">Accounts</div>
            <div
                className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 justify-between items-stretch flex-wrap">
                <div className="grow grid border border-gray-100 rounded-2xl p-4">
                    <span className="text-xs sm:text-sm">Number of accounts</span>
                    <span className="text-base sm:text-lg md:text-xl">{numeral(1541252).format("0,")}</span>
                    <span className="text-base text-sm text-gray-500">with at least 1 KAS</span>
                </div>
                <div className="grow grid border border-gray-100 rounded-2xl p-4">
                    <span className="text-xs sm:text-sm">Top 10 addresses</span>
                    <span className="text-base sm:text-lg md:text-xl">{numeral(17.245).format("0.[00]")}%</span>
                    <span className="text-base text-sm text-gray-500">of circulating supply</span>
                </div>
                <div className="grow grid border border-gray-100 rounded-2xl p-4">
                    <span className="text-xs sm:text-sm">Top 100 addresses</span>
                    <span className="text-base sm:text-lg md:text-xl">{numeral(34.245).format("0.[00]")}%</span>
                    <span className="text-base text-sm text-gray-500">of circulating supply</span>
                </div>
                <div className="grow grid border border-gray-100 rounded-2xl p-4">
                    <span className="text-xs sm:text-sm">Top 1000 addresses</span>
                    <span className="text-base sm:text-lg md:text-xl">{numeral(58.2).format("0.0")}</span>
                    <span className="text-base text-sm text-gray-500">of circulating supply</span>
                </div>
            </div>

        </div>

        <div
            className="w-full flex flex-col bg-white rounded-4xl p-4 sm:p-8 text-left text-gray-500 ">


            <table className="mt-4">
                <thead>
                <tr className="text-base border-b border-gray-100">
                    <th className="font-normal pl-0.5">Rank</th>
                    <th className="font-normal pl-0.5">Address</th>
                    <th className="font-normal pl-0.5">Label</th>
                    <th className="font-normal pl-0.5">Balance</th>
                    <th className="font-normal text-right">Percentage</th>
                </tr>
                </thead>
                <tbody>
                {[...Array(100)].map((_, index) => (
                    <tr key={index} className="border-t border-gray-100 text-black text-base">
                        <td className="pr-2 text-nowrap">{index+1}</td>
                        <td className="text-link pr-2 font-mono">
                                    <span
                                        className=""><Link
                                        to="/accounts/kaspa:qyp3ffdjvv6de6cg6jjgyhlg3mt3fngna2vzukdpzvwkaj5j3hctsyqecqf7dh3">{"kaspa:qyp3ffdjvv6de6cg6jjgyhlg3mt3fngna2vzukdpzvwkaj5j3hctsyqecqf7dh3"}</Link></span>
                        </td>
                        <td>
                            <span className="bg-accent-yellow text-black rounded-full px-4 py-0.5 text-center text-base">
                                bitget wallet
                            </span>
                        </td>
                        <td className="pr-2">1,124,124<span className="text-gray-500"> KAS</span></td>
                        <td className="pl-5 py-3 flex flex-row justify-end">1.25%</td>

                    </tr>
                ))}
                </tbody>

            </table>

        </div>
        <div
            className="w-full flex flex-row bg-white rounded-4xl p-4 sm:p-8 text-left  text-gray-500">
            <div className="h-5 w-5 me-2">
                <AccountBalanceWallet className="h-4 w-4 fill-gray-500"/>
            </div>
            <span className="text-sm">An account is a unique identifier on the blockchain used to send, receive, and store assets or data. It holds balances and interacts with the network securely.</span>
        </div>
    </>;
}
