import type {Route} from "./+types/transactions";
import numeral from "numeral";

// @ts-ignore
import Box from "../assets/box.svg?react";
import {Link} from "react-router";
import Accepted from "~/Accepted";
import Button from "~/Button";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Kaspa Explorer - Transactions"},
        {
            name: "description",
            content: "Transactions page of Kaspa Explorer displaying a comprehensive overview of recent transactions," +
                " including their details and insights into the Kaspa blockchain.",
        },
    ];
}

export default function Transactions() {
    return <>
        <div className="bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full">
            <div className="text-2xl mb-4">Transactions</div>
            <div
                className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 justify-between items-stretch flex-wrap">
                <div className="grow grid border border-gray-100 rounded-2xl p-4">
                    <span className="text-xs sm:text-sm">Average TPS (24 hrs)</span>
                    <span className="text-base sm:text-lg md:text-xl">{numeral(154.2).format("0.0")}</span>
                </div>
                <div className="grow grid border border-gray-100 rounded-2xl p-4">
                    <span className="text-xs sm:text-sm">Volume transacted (30 days)</span>
                    <span
                        className="text-base sm:text-lg md:text-xl">{numeral(603123943).format("0,0")}
                        <span className="text-gray-500 text-sm"> KAS</span>
                    </span>

                </div>
                <div className="grow grid border border-gray-100 rounded-2xl p-4">
                    <span className="text-xs sm:text-sm">Volume transacted (24 hours)</span>
                    <span
                        className="text-base sm:text-lg md:text-xl">{numeral(69951282).format("0,0")}
                        <span className="text-gray-500 text-sm"> KAS</span>
                    </span>
                </div>
                <div className="grow grid border border-gray-100 rounded-2xl p-4">
                    <span className="text-xs sm:text-sm">Average Transaction Fee (24 hours)</span>
                    <span className="text-base sm:text-lg md:text-xl">{numeral(0.02332).format("0.0000[0000]")}
                        <span className="text-gray-500 text-sm"> KAS</span>
                            </span>
                </div>
            </div>

        </div>

        <div
            className="w-full flex flex-col bg-white rounded-4xl p-4 sm:p-8 text-left text-gray-500 ">
            <div className="bg-primary/20 basis-full mb-2 p-6 rounded-2xl text-black text-left text-base
            flex flex-row justify-around items-center">
                Blocks and its transactions are arriving with a speed of 10 blocks per second. You can pause the update using the button.
                <Button value={"Pause??"} primary />
                <Button value="Ignore coinbase TXs" primary />
            </div>

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
                    <tr key={index} className="border-b border-gray-100 text-black text-base">
                        <td className="pr-2 text-nowrap">{(index+1) *2} second ago</td>
                        <td className="text-link pr-2 font-mono">
                                    <span
                                        className="hidden md:table-cell"><Link
                                        to="/transactions/330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7">{"330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7"}</Link></span>
                            <span
                                className="hidden xs:table-cell md:hidden">{"330ecb081ea2093ffb...ef667d5fa0ce7dfccd7"}</span>
                            <span
                                className="table-cell xs:hidden">{"330ecb08...d5fa0ce7dfccd7"}</span>
                        </td>
                        <td className="hidden sm:table-cell">82.9981<span className="text-gray-500 text-sm"> KAS</span>
                        </td>
                        <td className="pl-5 py-3 flex flex-row justify-end"><Accepted/></td>

                    </tr>
                ))}
                </tbody>

            </table>

        </div>
        <div
            className="w-full flex flex-row bg-white rounded-4xl p-4 sm:p-8 text-left  text-gray-500">
            <div className="h-5 w-5 me-2">
                <Box className="h-5 w-5 fill-gray-500"/>
            </div>
            <span>A block is a secure, sequential record in the blockchain containing verified transactions, a unique hash, and a reference to the previous block, ensuring data integrity.</span>
        </div>
    </>;
}
