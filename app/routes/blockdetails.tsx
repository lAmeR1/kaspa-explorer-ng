import type { Route } from "./+types/blocks";

import Box from "../assets/box.svg";

import Info from "../assets/info.svg";

import ArrowRight from "../assets/arrow-right.svg";
import Accepted from "~/Accepted";

export async function loader({ params }: Route.LoaderArgs) {
  const blockId = params.blockId;
  return { blockId };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kaspa Explorer - Blocks" },
    {
      name: "description",
      content:
        "Overview page of Kaspa Block Explorer, showcasing recent blocks, their details, and insights into the Kaspa blockchain.",
    },
  ];
}

export default function Blocks({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 rounded-4xl bg-white p-4 text-left text-nowrap text-black sm:grid-cols-[auto_1fr] sm:p-8">
        <div className="flex flex-row items-center text-2xl sm:col-span-2">
          <Box className="mr-2 h-8 w-8" />
          Blocks details
        </div>

        <div className="mt-4 text-black sm:col-span-2">Main information</div>
        <FieldName name="Block Hash" />
        <FieldValue value="aeb12eb8a2e89e1a282e18e9b28a2eb81b28a9eb18eb9128eb12b9e81b28be8a982be" />
        <FieldName name="Blue score" />
        <FieldValue value="123125156" />
        <FieldName name="Bits" />
        <FieldValue value="123125156" />
        <FieldName name="Timestamp" />
        <FieldValue value="19 minutes ago" />
        <FieldName name="Version" />
        <FieldValue value="1" />
        <FieldName name="Is chain block" />
        <FieldValue value="true" />
        {/*horizontal rule*/}
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
        <div className="text-black sm:col-span-2">Connections</div>
        <FieldName name="Parents" />
        <FieldValue
          value={
            <>
              <div>
                ac46f5d3d5cff91e5db9503827d4fdeb9067dfcb53d5ac0d6f1d77c81d9e9cf9
              </div>
              <div>
                ac46f5d3d5cff91e5db9503827d4fdeb9067dfcb53d5ac0d6f1d77c81d9e9cf9
              </div>
            </>
          }
        />
        <FieldName name="Children" />
        <FieldValue
          value={
            <>
              <div>
                a6b668a689b698a698ba698b698a6b986a67dfcb53d5ac0d6f1d77c81d9e9cf9
              </div>
              <div>
                ef7e009e790709e709e7f09e709f790ef790ef9073d5ac0d6f1d77c81d9e9cf9
              </div>
            </>
          }
        />
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
        <div className="text-black sm:col-span-2">Merkle and UTXO data</div>
        <FieldName name="Merkle root" />
        <FieldValue value="26cb8cf11612de0ea6066bb8c31c0afc51d96cbfe35e1165f1beb23ae1794ad8" />
        <FieldName name="Accepted merkle root" />
        <FieldValue value="ac46f5d3d5cff91e5db9503827d4fdeb9067dfcb53d5ac0d6f1d77c81d9e9cf9" />
        <FieldName name="UTXO commitment" />
        <FieldValue value="f9a50119f1d03ca736926e39b683467d6c65ea397deba49ccc79d86cf852ac70" />
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
        <div className="flex flex-row items-start text-black sm:col-span-2">
          Difficulty and computation
        </div>
        <FieldName name="Nonce" />
        <FieldValue value="14209147295666810466" />
        <FieldName name="DAA score" />
        <FieldValue value="97998764589" />
        <FieldName name="Blue work" />
        <FieldValue value="f0d242482d43c49ab4791" />
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
        <div className="text-black sm:col-span-2">Additional data</div>
        <FieldName name="Pruning point" />
        <FieldValue value="97998764589" />
        <FieldName name="Miner info" />
        <FieldValue
          value={
            <>
              <div className="text-link">
                kaspa:qrelgny7sr3vahq69yykxx36m65gvmhryxrlwngfzgu8xkdslum2yxjp3ap8m
              </div>
              <div className="text-sm text-gray-500">
                GreatPool 0.15.1/1.0.2
              </div>
            </>
          }
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 overflow-x-auto rounded-4xl bg-white p-4 text-left text-nowrap text-black sm:p-8">
        <div className="mt-4 mb-2 text-black sm:col-span-2">Transactions</div>

        <div className="grid w-full grid-cols-[auto_2fr_auto_2fr_auto_auto] gap-x-4 gap-y-2">
          <div className="text-gray-500">TX-ID</div>
          <div className="col-span-2 text-gray-500">From</div>
          <div className="text-gray-500">To</div>
          <div className="text-gray-500">Status</div>
          <div className="text-right text-gray-500">Amount</div>

          <div className="col-span-6 h-[1px] bg-gray-100" />
          <div className="text-black">123b12....28b12b318293</div>
          <div className="text-link text-sm">
            kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
          </div>
          <div className="flex items-center fill-black text-black">
            <ArrowRight className="h-5 w-5" />
          </div>
          <div className="text-link text-sm">
            kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
          </div>
          <div className="text-success">
            <Accepted />
          </div>
          <div className="text-black">
            1234<span className="text-sm text-gray-500"> KAS</span>
          </div>

          <div className="col-span-6 h-[1px] bg-gray-100" />
          <div className="text-black">123b12....28b12b318293</div>
          <div className="text-link text-sm">
            kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
          </div>
          <div className="flex items-center fill-black text-black">
            <ArrowRight className="h-5 w-5" />
          </div>
          <div className="text-link text-sm">
            kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
          </div>
          <div className="text-success">
            <Accepted />
          </div>
          <div className="text-black">
            1234<span className="text-sm text-gray-500"> KAS</span>
          </div>
          <div className="col-span-6 h-[1px] bg-gray-100" />
          <div className="text-black">123b12....28b12b318293</div>
          <div className="text-link text-sm">
            kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
          </div>
          <div className="flex items-center fill-black text-black">
            <ArrowRight className="h-5 w-5" />
          </div>
          <div className="text-link text-sm">
            kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
          </div>
          <div className="text-success">
            <Accepted />
          </div>
          <div className="text-black">
            1234<span className="text-sm text-gray-500"> KAS</span>
          </div>
          <div className="col-span-6 h-[1px] bg-gray-100" />
          <div className="text-black">123b12....28b12b318293</div>
          <div className="text-link text-sm">
            kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
          </div>
          <div className="flex items-center fill-black text-black">
            <ArrowRight className="h-5 w-5" />
          </div>
          <div className="text-link text-sm">
            kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
          </div>
          <div className="text-success">
            <Accepted />
          </div>
          <div className="text-black">
            1234<span className="text-sm text-gray-500"> KAS</span>
          </div>
          <div className="col-span-6 h-[1px] bg-gray-100" />
          <div className="text-black">123b12....28b12b318293</div>
          <div className="text-link text-sm">
            kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
          </div>
          <div className="flex items-center fill-black text-black">
            <ArrowRight className="h-5 w-5" />
          </div>
          <div className="text-link text-sm">
            kaspa:qzyzhlkd8thwy...4h6mtfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
            <br />
            kaspa:qzyzhlkd8thwywu...tfj222rtgcn
          </div>
          <div className="text-success">
            <Accepted />
          </div>
          <div className="text-black">
            1234<span className="text-sm text-gray-500"> KAS</span>
          </div>
        </div>
      </div>
    </>
  );
}

const FieldName = ({ name }: { name: string }) => (
  <div className="flex flex-row items-start fill-gray-500 text-gray-500 sm:col-start-1">
    <div className="flex flex-row items-center">
      <Info className="mr-1 h-4 w-4" />
      <span>{name}</span>
    </div>
  </div>
);

const FieldValue = ({ value }: { value: string | React.ReactNode }) => (
  <span className="overflow-hidden">{value}</span>
);
