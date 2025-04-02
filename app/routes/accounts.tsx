import type {Route} from "./+types/transactions";
import numeral from "numeral";

// @ts-ignore
import AccountBalanceWallet from "../assets/account_balance_wallet.svg?react";
import {Link} from "react-router";
import Accepted from "~/Accepted";
import Button from "~/Button";
import MainBox from "~/layout/MainBox";
import Card from "~/layout/Card";
import CardContainer from "~/layout/CardContainer";
import FooterHelper from "~/layout/FooterHelper";

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
        <MainBox>
            <CardContainer title="Accounts">
                <Card
                    title="Number of accounts"
                    value={`${numeral(1541252).format("0,")}`}
                    subtext="with at least 1 KAS"
                />
                <Card
                    title="Top 10 addresses"
                    value={`${numeral(0).format("0.[00]")}%`}
                    subtext="of circulating supply"
                />
                <Card
                    title="Top 100 addresses"
                    value={`${numeral(34.245).format("0.[00]")}%`}
                    subtext="of circulating supply"
                />
                <Card
                    title="Top 1000 addresses"
                    value={`${numeral(58.2).format("0.0")}`}
                    subtext="of circulating supply"
                />
            </CardContainer>

        </MainBox>

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
                            <span className="bg-accent-yellow text-nowrap text-black rounded-full px-4 py-0.5 text-center text-base">
                                exchange1 wallet
                            </span>
                        </td>
                        <td className="pr-2">1,124,124<span className="text-gray-500"> KAS</span></td>
                        <td className="pl-5 py-3 flex flex-row justify-end">1.25%</td>

                    </tr>
                ))}
                </tbody>

            </table>

        </div>
        <FooterHelper
          icon={AccountBalanceWallet}>
            <span className="text-sm">An account is a unique identifier on the blockchain used to send, receive, and store assets or data. It holds balances and interacts with the network securely.</span>
        </FooterHelper>
    </>;
}
