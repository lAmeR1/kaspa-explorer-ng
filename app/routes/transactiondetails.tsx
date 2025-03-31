import type {Route} from "./+types/transactiondetails";

// @ts-ignore
import Swap from "../assets/swap.svg?react";
// @ts-ignore
import Info from "../assets/info.svg?react";
// @ts-ignore
import Kaspa from "../assets/kaspa.svg?react";
// @ts-ignore
import ClockLoader from "../assets/clock_loader_10.svg?react";
// @ts-ignore
import ArrowRight from "../assets/arrow-right.svg?react";
import {NavLink, useLocation} from "react-router";
import Accepted from "~/Accepted";

export async function loader({params}: Route.LoaderArgs) {
    const txId = params.blockId;
    return {txId};
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Kaspa Explorer - Blocks"},
        {
            name: "description",
            content: "Overview page of Kaspa Block Explorer, showcasing recent blocks, their details, and insights into the Kaspa blockchain."
        },
    ];
}

export default function TransactionDetails({loaderData}: Route.ComponentProps) {
    const location = useLocation();

    const isTabActive = (tab: string) => {
        const params = new URLSearchParams(location.search); // Lesen der Query-Parameter

        if (tab === "general" && params.get("tab") === null) {
            return true;
        }

        return params.get("tab") === tab;
    };


    return <>
        <div
            className="flex flex-col bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full">
            <div className="sm:col-span-2 text-2xl flex flex-row items-center">
                <Swap className="w-8 h-8 mr-2"/>
                <span>Transaction details</span>
            </div>

            <span className="mt-4 mb-0">Transfer details</span>

            <span className="text-[32px] flex flex-row items-center">
                14,324
                <Kaspa className="fill-primary w-8 h-8 ml-1"/>
            </span>
            <span className="text-gray-500 text-sm ml-1">$9,3213.32</span>
            {/*horizontal rule*/}
            <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>

            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-y-2 gap-x-14">
                <FieldName name="From"/>
                <FieldValue value={<>
                        <span>kaspa:qqscm7geuuc26ffneeyslsfcytg0vzf9848slkxchzdkgx3mn5mdx4dcavk2r</span><br />
                        <span>kaspa:qqscm7geuuc26ffneeyslsfcytg0vzf9848slkxchzdkgx3mn5mdx4dcavk2r</span><br />
                        <span>kaspa:qqscm7geuuc26ffneeyslsfcytg0vzf9848slkxchzdkgx3mn5mdx4dcavk2r</span><br />
                        <span>kaspa:qqscm7geuuc26ffneeyslsfcytg0vzf9848slkxchzdkgx3mn5mdx4dcavk2r</span><br />
                        <span>kaspa:qqscm7geuuc26ffneeyslsfcytg0vzf9848slkxchzdkgx3mn5mdx4dcavk2r</span>
                        </>} />
                <FieldName name="To"/>
                <FieldValue value={<>
                        <span>kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022</span><br />
                        <span>kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022</span><br />
                        <span>kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022</span><br />
                        <span>kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022</span><br />
                        <span>kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022</span>
                        </>

                }/>
            </div>
        </div>

        <div
            className="flex flex-col bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full
            gap-y-2 gap-x-18 overflow-x-auto">

            <div
                className="flex flex-row w-auto items-center justify-around bg-gray-50 rounded-full p-1 mr-auto gap-x-1 px-1">
                <NavLink
                    to="/transactions/330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7?tab=general"
                    preventScrollReset={true}
                    className={() => `hover:bg-white hover:cursor-pointer px-4 py-1.5 rounded-full ${isTabActive("general") ? "bg-white" : ""}`}>
                    General information
                </NavLink>
                <NavLink
                    to="/transactions/330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7?tab=inputs"
                    preventScrollReset={true}
                    className={() => `hover:bg-white hover:cursor-pointer px-4 py-1.5 rounded-full ${isTabActive("inputs") ? "bg-white" : ""}`}>
                    Inputs
                </NavLink>
                <NavLink
                    to="/transactions/330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7?tab=outputs"
                    preventScrollReset={true}
                    className={() => `hover:bg-white hover:cursor-pointer px-4 py-1.5 rounded-full ${isTabActive("outputs") ? "bg-white" : ""}`}>
                    Outputs
                </NavLink>
            </div>

            {isTabActive("general") && <div
                className="grid grid-cols-1 text-nowrap sm:grid-cols-[auto_1fr] bg-white rounded-4xl text-black text-left w-full
            gap-y-2 gap-x-18">
                <FieldName name="Transaction ID"/>
                <FieldValue value="c071097c901709c70197c9017c0971097109c71907c1097c0917c097"/>
                <FieldName name="Subnetwork ID"/>
                <FieldValue value={"0".repeat(32)}/>
                <FieldName name="Status"/>
                <FieldValue value={<div className="flex flex-row items-center gap-x-1">
                    <Accepted/>
                    <span>470 confirmations</span>
                    <ClockLoader className="w-4 h-4"/>
                </div>}/>
                {/*horizontal rule*/}
                <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
                <FieldName name="Hash"/>
                <FieldValue value="cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f0226a7db"/>
                <FieldName name="Compute mass"/>
                <FieldValue value="2036"/>
                {/*horizontal rule*/}
                <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
                <FieldName name="Block hashes"/>
                <FieldValue value={<>
                    <span>cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f0226a7db</span><br/><span>cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f0226a7db</span></>}/>
                <FieldName name="Block time"/>
                <FieldValue value={<>
                    <div className="flex flex-col"><span>20 minutes ago</span><span className="text-gray-500 text-sm">Dec 14 2024 14:13:22</span>
                    </div>
                </>}/>
                <FieldName name="Accepting block hash"/>
                <FieldValue value="cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f0226a7db"/>
                {/*horizontal rule*/}
                <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
                <FieldName name="Transaction fee"/>
                <FieldValue value={<><span>0.00002036</span><span className="text-gray-500"> KAS</span></>}/>

            </div>}

            {isTabActive("inputs") && <div
                className="grid grid-cols-1 text-nowrap sm:grid-cols-[auto_1fr] bg-white rounded-4xl text-black text-left w-full
            gap-y-2 gap-x-18">
                <FieldName name="Signature Op Count"/>
                <FieldValue value="1"/>
                <FieldName name="Signature Script"/>
                <FieldValue value={"14122242".repeat(8)}/>
                <FieldName name="Amount"/>
                <FieldValue value={<><span>14,123.24045</span><span className="text-gray-500"> KAS</span></>}/>
                <FieldName name="Previous Outpoint Index"/>
                <FieldValue value="#2"/>
                <FieldName name="Hash"/>
                <FieldValue value="3eaa150bc6300ca0fe8fa6a2724f832a37e963a0399850177151a72461e16ea2"/>
                <FieldName name="Address"/>
                <FieldValue value="kaspa:qzapfmt7zeh0rzakhrce72rfm6c3r06nw6vxx6e8qjlxntdw7zcaxajep8w82"/>
                {/*horizontal rule*/}
                <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
                <FieldName name="Signature Op Count"/>
                <FieldValue value="1"/>
                <FieldName name="Signature Script"/>
                <FieldValue value={"14122242".repeat(8)}/>
                <FieldName name="Amount"/>
                <FieldValue value={<><span>14,123.24045</span><span className="text-gray-500"> KAS</span></>}/>
                <FieldName name="Previous Outpoint Index"/>
                <FieldValue value="#2"/>
                <FieldName name="Hash"/>
                <FieldValue value="3eaa150bc6300ca0fe8fa6a2724f832a37e963a0399850177151a72461e16ea2"/>
                <FieldName name="Address"/>
                <FieldValue value="kaspa:qzapfmt7zeh0rzakhrce72rfm6c3r06nw6vxx6e8qjlxntdw7zcaxajep8w82"/>
                {/*horizontal rule*/}
                <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
                <FieldName name="Signature Op Count"/>
                <FieldValue value="1"/>
                <FieldName name="Signature Script"/>
                <FieldValue value={"14122242".repeat(8)}/>
                <FieldName name="Amount"/>
                <FieldValue value={<><span>14,123.24045</span><span className="text-gray-500"> KAS</span></>}/>
                <FieldName name="Previous Outpoint Index"/>
                <FieldValue value="#2"/>
                <FieldName name="Hash"/>
                <FieldValue value="3eaa150bc6300ca0fe8fa6a2724f832a37e963a0399850177151a72461e16ea2"/>
                <FieldName name="Address"/>
                <FieldValue value="kaspa:qzapfmt7zeh0rzakhrce72rfm6c3r06nw6vxx6e8qjlxntdw7zcaxajep8w82"/>
                {/*horizontal rule*/}
                <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
                <FieldName name="Signature Op Count"/>
                <FieldValue value="1"/>
                <FieldName name="Signature Script"/>
                <FieldValue value={"14122242".repeat(8)}/>
                <FieldName name="Amount"/>
                <FieldValue value={<><span>14,123.24045</span><span className="text-gray-500"> KAS</span></>}/>
                <FieldName name="Previous Outpoint Index"/>
                <FieldValue value="#2"/>
                <FieldName name="Hash"/>
                <FieldValue value="3eaa150bc6300ca0fe8fa6a2724f832a37e963a0399850177151a72461e16ea2"/>
                <FieldName name="Address"/>
                <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022"/>

            </div>}

            {isTabActive("outputs") && <div
                className="grid grid-cols-1 text-nowrap sm:grid-cols-[auto_1fr] bg-white rounded-4xl text-black text-left w-full
            gap-y-2 gap-x-18">
                <FieldName name="Index"/>
                <FieldValue value="1"/>
                <FieldName name="Amount"/>
                <FieldValue value={<><span>14,123.24045</span><span className="text-gray-500"> KAS</span></>}/>
                <FieldName name="Script Public Key Type"/>
                <FieldValue value="scripthash" />
                <FieldName name="Script Public Key"/>
                <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187"/>
                <FieldName name="Script Public Key Address"/>
                <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022"/>
                {/*horizontal rule*/}
                <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
                <FieldName name="Index"/>
                <FieldValue value="1"/>
                <FieldName name="Amount"/>
                <FieldValue value={<><span>14,123.24045</span><span className="text-gray-500"> KAS</span></>}/>
                <FieldName name="Script Public Key Type"/>
                <FieldValue value="scripthash" />
                <FieldName name="Script Public Key"/>
                <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187"/>
                <FieldName name="Script Public Key Address"/>
                <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022"/>
                {/*horizontal rule*/}
                <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
                <FieldName name="Index"/>
                <FieldValue value="1"/>
                <FieldName name="Amount"/>
                <FieldValue value={<><span>14,123.24045</span><span className="text-gray-500"> KAS</span></>}/>
                <FieldName name="Script Public Key Type"/>
                <FieldValue value="scripthash" />
                <FieldName name="Script Public Key"/>
                <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187"/>
                <FieldName name="Script Public Key Address"/>
                <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022"/>
                {/*horizontal rule*/}
                <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
                <FieldName name="Index"/>
                <FieldValue value="1"/>
                <FieldName name="Amount"/>
                <FieldValue value={<><span>14,123.24045</span><span className="text-gray-500"> KAS</span></>}/>
                <FieldName name="Script Public Key Type"/>
                <FieldValue value="scripthash" />
                <FieldName name="Script Public Key"/>
                <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187"/>
                <FieldName name="Script Public Key Address"/>
                <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022"/>
                {/*horizontal rule*/}
                <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
                <FieldName name="Index"/>
                <FieldValue value="1"/>
                <FieldName name="Amount"/>
                <FieldValue value={<><span>14,123.24045</span><span className="text-gray-500"> KAS</span></>}/>
                <FieldName name="Script Public Key Type"/>
                <FieldValue value="scripthash" />
                <FieldName name="Script Public Key"/>
                <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187"/>
                <FieldName name="Script Public Key Address"/>
                <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022"/>
                {/*horizontal rule*/}
                <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
                <FieldName name="Index"/>
                <FieldValue value="1"/>
                <FieldName name="Amount"/>
                <FieldValue value={<><span>14,123.24045</span><span className="text-gray-500"> KAS</span></>}/>
                <FieldName name="Script Public Key Type"/>
                <FieldValue value="scripthash" />
                <FieldName name="Script Public Key"/>
                <FieldValue value="aa20d931af57ebd107c6d89a75e187c3a4c8fc2dc198a47b707cc76936d0a53addf187"/>
                <FieldName name="Script Public Key Address"/>
                <FieldValue value="kaspa:cec522ca95cd595b2e0dfb29e59fb53d93863330fe745e2698aa1f9f022"/>
            </div>
            }

        </div>
    </>;
}


const FieldName
    = ({
           name
       }:
       {
           name: string
       }
) => <div
    className
        =
        "flex flex-row items-start sm:col-start-1 text-gray-500 fill-gray-500">
    <div className
             =
             "flex flex-row items-center">
        <Info className
                  =
                  "w-4 h-4 mr-1"/>
        <span>
{name
}
</span>
    </div>
</div>;

const FieldValue
    = ({
           value
       }:
       {
           value: string | React.ReactNode
       }
) =>
    (
        <
            span className
                     =
                     "overflow-hidden">
{value
}
</span>
    );