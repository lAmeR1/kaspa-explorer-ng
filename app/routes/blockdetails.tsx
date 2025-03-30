import type {Route} from "./+types/blocks";

// @ts-ignore
import Box from "../assets/box.svg?react";
// @ts-ignore
import Info from "../assets/info.svg?react";
// @ts-ignore
import ArrowRight from "../assets/arrow-right.svg?react";
import Accepted from "~/Accepted";

export async function loader({params}: Route.LoaderArgs) {
    const blockId = params.blockId;
    return {blockId};
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

export default function Blocks({loaderData}: Route.ComponentProps) {
    return <>
        <div
            className="grid grid-cols-1 text-nowrap sm:grid-cols-[auto_1fr] bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full
            gap-y-2 gap-x-18">
            <div className="sm:col-span-2 text-xl flex flex-row items-center"><Box className="w-8 h-8 mr-2"/>Blocks
                details
            </div>

            <div className="sm:col-span-2 text-black mt-4">Main information</div>
            <FieldName name="Block Hash"/>
            <FieldValue value="aeb12eb8a2e89e1a282e18e9b28a2eb81b28a9eb18eb9128eb12b9e81b28be8a982be"/>
            <FieldName name="Blue score"/>
            <FieldValue value="123125156"/>
            <FieldName name="Bits"/>
            <FieldValue value="123125156"/>
            <FieldName name="Timestamp"/>
            <FieldValue value="19 minutes ago"/>
            <FieldName name="Version"/>
            <FieldValue value="1"/>
            <FieldName name="Is chain block"/>
            <FieldValue value="true"/>
            {/*horizontal rule*/}
            <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
            <div className="sm:col-span-2 text-black">Connections</div>
            <FieldName name="Parents"/>
            <FieldValue value={<>
                <div>ac46f5d3d5cff91e5db9503827d4fdeb9067dfcb53d5ac0d6f1d77c81d9e9cf9</div>
                <div>ac46f5d3d5cff91e5db9503827d4fdeb9067dfcb53d5ac0d6f1d77c81d9e9cf9</div>
            </>}/>
            <FieldName name="Children"/>
            <FieldValue value={<>
                <div>a6b668a689b698a698ba698b698a6b986a67dfcb53d5ac0d6f1d77c81d9e9cf9</div>
                <div>ef7e009e790709e709e7f09e709f790ef790ef9073d5ac0d6f1d77c81d9e9cf9</div>
            </>}/>
            <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
            <div className="sm:col-span-2 text-black">Merkle and UTXO data</div>
            <FieldName name="Markle root"/>
            <FieldValue value="26cb8cf11612de0ea6066bb8c31c0afc51d96cbfe35e1165f1beb23ae1794ad8"/>
            <FieldName name="Accepted merkle root"/>
            <FieldValue value="ac46f5d3d5cff91e5db9503827d4fdeb9067dfcb53d5ac0d6f1d77c81d9e9cf9"/>
            <FieldName name="UTXO commitment"/>
            <FieldValue value="f9a50119f1d03ca736926e39b683467d6c65ea397deba49ccc79d86cf852ac70"/>
            <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
            <div className="sm:col-span-2 text-black flex flex-row items-start">Difficulty and computation</div>
            <FieldName name="Nonce"/>
            <FieldValue value="14209147295666810466"/>
            <FieldName name="DAA score"/>
            <FieldValue value="97998764589"/>
            <FieldName name="Blue work"/>
            <FieldValue value="f0d242482d43c49ab4791"/>
            <div className={`sm:col-span-2 h-[1px] bg-gray-100 my-4`}/>
            <div className="sm:col-span-2 text-black">Additional data</div>
            <FieldName name="Pruning point"/>
            <FieldValue value="97998764589"/>
            <FieldName name="Miner info"/>
            <FieldValue value={<>
                <div className="text-link">kaspa:qrelgny7sr3vahq69yykxx36m65gvmhryxrlwngfzgu8xkdslum2yxjp3ap8m</div>
                <div className="text-gray-500 text-sm">GreatPool 0.15.1/1.0.2</div>
            </>}/>
        </div>

        <div
            className="grid grid-cols-1 text-nowrap bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full
            gap-y-2 gap-x-18 overflow-x-scroll">
            <div className="sm:col-span-2 text-black mt-4 mb-2">Transactions ( 19 minutes ago )</div>

            <div className="w-full grid grid-cols-[auto_2fr_auto_2fr_auto_auto] gap-x-4 gap-y-2">
                <div className="text-gray-500">TX-ID</div>
                <div className="text-gray-500 col-span-2">From</div>
                <div className="text-gray-500">To</div>
                <div className="text-gray-500">Status</div>
                <div className="text-gray-500 text-right">Amount</div>

                <div className="col-span-6 h-[1px] bg-gray-100" />
                <div className="text-black">123b12....28b12b318293</div>
                <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn</div>
                <div className="text-black fill-black flex items-center"><ArrowRight className="w-5 h-5" /></div>
                <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn</div>
                <div className="text-success"><Accepted /></div>
                <div className="text-black">1234<span className="text-sm text-gray-500"> KAS</span></div>

                <div className="col-span-6 h-[1px] bg-gray-100" />
                <div className="text-black">123b12....28b12b318293</div>
                <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn</div>
                <div className="text-black fill-black flex items-center"><ArrowRight className="w-5 h-5" /></div>
                <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn</div>
                <div className="text-success"><Accepted /></div>
                <div className="text-black">1234<span className="text-sm text-gray-500"> KAS</span></div>
                <div className="col-span-6 h-[1px] bg-gray-100" />
                <div className="text-black">123b12....28b12b318293</div>
                <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn</div>
                <div className="text-black fill-black flex items-center"><ArrowRight className="w-5 h-5" /></div>
                <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn</div>
                <div className="text-success"><Accepted /></div>
                <div className="text-black">1234<span className="text-sm text-gray-500"> KAS</span></div>
                <div className="col-span-6 h-[1px] bg-gray-100" />
                <div className="text-black">123b12....28b12b318293</div>
                <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn</div>
                <div className="text-black fill-black flex items-center"><ArrowRight className="w-5 h-5" /></div>
                <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn</div>
                <div className="text-success"><Accepted /></div>
                <div className="text-black">1234<span className="text-sm text-gray-500"> KAS</span></div>
                <div className="col-span-6 h-[1px] bg-gray-100" />
                <div className="text-black">123b12....28b12b318293</div>
                <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn</div>
                <div className="text-black fill-black flex items-center"><ArrowRight className="w-5 h-5" /></div>
                <div className="text-link text-sm">kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn<br/>kaspa:qzyzhlkd8thwywu...tfj222rtgcn</div>
                <div className="text-success"><Accepted /></div>
                <div className="text-black">1234<span className="text-sm text-gray-500"> KAS</span></div>


            </div>
        </div>
    </>;
}


const FieldName = ({name}: { name: string }) => <div
    className="flex flex-row items-start sm:col-start-1 text-gray-500 fill-gray-500">
    <div className="flex flex-row items-center">
        <Info className="w-4 h-4 mr-1"/>
        <span>{name}</span>
    </div>
</div>;

const FieldValue = ({value}: { value: string | React.ReactNode }) => (
    <span className="overflow-hidden">{value}</span>
);