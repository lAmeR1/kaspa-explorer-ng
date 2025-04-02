import type {Route} from "./+types/accountdetails";

// @ts-ignore
import Swap from "../assets/swap.svg?react";
// @ts-ignore
import Info from "../assets/info.svg?react";
// @ts-ignore
import Kaspa from "../assets/kaspa.svg?react";
// @ts-ignore
import ArrowRight from "../assets/arrow-right.svg?react";
// @ts-ignore
import AccountBalanceWallet from "../assets/account_balance_wallet.svg?react"


import {Link, NavLink, useLocation} from "react-router";
import Accepted from "~/Accepted";
import Button from "~/Button";
import KaspaAddress from "~/KaspaAddress";

export async function loader({params}: Route.LoaderArgs) {
    const txId = params.blockId;
    return {txId};
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Kaspa Explorer - Account Details"},
        {
            name: "description",
            content: "Overview page of Kaspa Block Explorer, showcasing recent blocks, their details, and insights into the Kaspa blockchain."
        },
    ];
}

export default function Accountdetails({loaderData}: Route.ComponentProps) {
    const location = useLocation();

    const isTabActive = (tab: string) => {
        const params = new URLSearchParams(location.search); // Lesen der Query-Parameter

        if (tab === "transactions" && params.get("tab") === null) {
            return true;
        }

        return params.get("tab") === tab;
    };


    return <>
        <div
            className="flex flex-col bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full">
            <div className="sm:col-span-2 text-2xl flex flex-row items-center">
                <AccountBalanceWallet className="w-8 h-8 mr-2"/>
                <span>Account details</span>
            </div>

            <span className="mt-4 mb-0">Balance</span>

            <span className="text-[32px] flex flex-row items-center">
                14,324,124
                <Kaspa className="fill-primary w-8 h-8 ml-1"/>
            </span>
            <span className="text-gray-500 text-sm ml-1">$900,313.32</span>
            {/*horizontal rule*/}
            <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>

            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-y-2 gap-x-14">

                <FieldName name="Address"/>
                <FieldValue value={<KaspaAddress link value="kaspa:qqscm7geuuc26ffneeyslsfcytg0vzf9848slkxchzdkgx3mn5mdx4dcavk2r" />} />
                <FieldName name="Transactions"/>
                <FieldValue value="1,885" />
                <FieldName name="UTXOs"/>
                <FieldValue value="102" />
            </div>
        </div>

        <div
            className="flex flex-col bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full
            gap-y-2 gap-x-18 overflow-x-auto">

            <div
                className="flex flex-row w-auto items-center justify-around bg-gray-50 rounded-full p-1 mr-auto gap-x-1 px-1">
                <NavLink
                    to="/accounts/kaspaqyp3ffdjvv6de6cg6jjgyhlg3mt3fngna2vzukdpzvwkaj5j3hctsyqecqf7dh3?tab=transactions"
                    preventScrollReset={true}
                    className={() => `hover:bg-white hover:cursor-pointer px-4 py-1.5 rounded-full ${isTabActive("transactions") ? "bg-white" : ""}`}>
                    Transactions
                </NavLink>
                <NavLink
                    to="/accounts/kaspaqyp3ffdjvv6de6cg6jjgyhlg3mt3fngna2vzukdpzvwkaj5j3hctsyqecqf7dh3?tab=utxos"
                    preventScrollReset={true}
                    className={() => `hover:bg-white hover:cursor-pointer px-4 py-1.5 rounded-full ${isTabActive("utxos") ? "bg-white" : ""}`}>
                    UTXOs
                </NavLink>
            </div>

            {isTabActive("transactions") && <div
                className="grid grid-cols-1 text-nowrap bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full
            gap-y-2 gap-x-18 overflow-x-auto">
                <div className="w-full grid grid-cols-[auto_3fr_auto_2fr_auto_auto_auto] gap-x-4 gap-y-2">
                    <div className="text-gray-500">Timestamp</div>
                    <div className="text-gray-500">TX-ID</div>
                    <div className="text-gray-500 col-span-2">From</div>
                    <div className="text-gray-500">To</div>
                    <div className="text-gray-500">Status</div>
                    <div className="text-gray-500 text-right">Amount</div>


                    {Array.from({length: 20}).map((_, index) => (
                        <>
                            <div className="col-span-7 h-[1px] bg-gray-100"/>
                            <div className="text-black">12 sec. ago</div>
                            <div className="text-black">123b12....28b12b318293</div>
                            <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn
                            </div>
                            <div className="text-black fill-black flex items-center"><ArrowRight className="w-5 h-5"/>
                            </div>
                            <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn
                            </div>
                            <div className="text-success"><Accepted/></div>
                            <div className="text-black">1234<span className="text-sm text-gray-500"> KAS</span></div>
                        </>
                    ))}

                </div>
            </div>}

            {isTabActive("utxos") && <div
                className="grid grid-cols-1 text-nowrap bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full
            gap-y-2 gap-x-18 overflow-x-auto">
                <div className="w-full grid grid-cols-[auto_3fr_auto_auto_auto] gap-x-4 gap-y-2">
                    <div className="text-gray-500">Timestamp</div>
                    <div className="text-gray-500">TX-ID</div>
                    <div className="text-gray-500">Index</div>
                    <div className="text-gray-500">Block DAA score</div>
                    <div className="text-gray-500 text-right">Amount</div>


                    {Array.from({length: 20}).map((_, index) => (
                        <>
                            <div className="col-span-7 h-[1px] bg-gray-100"/>
                            <div className="text-black">12 sec. ago - Dec 01 2025 14:12:22</div>
                            <div className="text-black">123b12....28b12b318293</div>
                            <div className="text-link text-sm">0</div>
                            <div className="text-black fill-black flex items-center">9125185</div>
                            <div className="text-black">1234<span className="text-sm text-gray-500"> KAS</span></div>
                        </>
                    ))}

                </div>
            </div>}

        </div>
    </>;
}


const FieldName = ({name}: { name: string }) => <div
    className="flex flex-row items-start sm:col-start-1 text-gray-500 fill-gray-500">
    <div className="flex flex-row items-center"><Info className="w-4 h-4 mr-1"/><span>{name}</span></div>
</div>;

const FieldValue = ({value}: { value: string | React.ReactNode }) => (<span className="overflow-hidden">{value}</span>);