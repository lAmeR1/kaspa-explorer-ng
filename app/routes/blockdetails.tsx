import ArrowRight from "../assets/arrow-right.svg";
import Box from "../assets/box.svg";
import Info from "../assets/info.svg";
import type { Route } from "./+types/blockdetails";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router";
import { Accepted } from "~/Accepted";
import { useBlockById } from "~/hooks/useBlockById";

dayjs().locale("en");
dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

export async function loader({ params }: Route.LoaderArgs) {
  const blockId = params.blockId;
  return { blockId };
}

export function meta() {
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
  const { data: block, isLoading, isError } = useBlockById(loaderData.blockId);
  const blockTime = dayjs(Number(block?.header.timestamp));
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>ERROR! Loading...</div>;
  }

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 rounded-4xl bg-white p-4 text-left text-nowrap text-black sm:grid-cols-[auto_1fr] sm:p-8">
        <div className="flex flex-row items-center text-2xl sm:col-span-2">
          <Box className="mr-2 h-8 w-8" />
          Blocks details
        </div>

        <div className="mt-4 text-black sm:col-span-2">Main information</div>
        <FieldName name="Block Hash" />
        <FieldValue value={loaderData.blockId} />
        <FieldName name="Blue score" />
        <FieldValue value={block?.header.blueScore} />
        <FieldName name="Bits" />
        <FieldValue value={block?.header.bits} />
        <FieldName name="Timestamp" />
        <FieldValue
          value={
            <div className="flex flex-col">
              <span>{blockTime.fromNow()}</span>
              <span className="text-sm text-gray-500">{blockTime.format("ll LTS")}</span>
            </div>
          }
        />
        <FieldName name="Version" />
        <FieldValue value={block?.header.version} />
        <FieldName name="Is chain block" />
        <FieldValue value={block?.verboseData.isChainBlock ? "Yes" : "No"} />
        {/*horizontal rule*/}
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
        <div className="text-black sm:col-span-2">Connections</div>
        <FieldName name="Parents" />
        <FieldValue
          value={block?.header.parents[0].parentHashes.map((parentHash) => (
            <div>
              <Link className="hover:text-primary" to={`/blocks/${parentHash}`}>
                {parentHash}
              </Link>
            </div>
          ))}
        />
        <FieldName name="Children" />
        <FieldValue
          value={block?.verboseData.childrenHashes.map((child) => (
            <div>
              <Link className="hover:text-primary" to={`/blocks/${child}`}>
                {child}
              </Link>
            </div>
          ))}
        />
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
        <div className="text-black sm:col-span-2">Merkle and UTXO data</div>
        <FieldName name="Merkle root" />
        <FieldValue value={block?.header.hashMerkleRoot} />
        <FieldName name="Accepted merkle root" />
        <FieldValue value={block?.header.acceptedIdMerkleRoot} />
        <FieldName name="UTXO commitment" />
        <FieldValue value={block?.header.utxoCommitment} />
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
        <div className="flex flex-row items-start text-black sm:col-span-2">Difficulty and computation</div>
        <FieldName name="Nonce" />
        <FieldValue value={block?.header.nonce} />
        <FieldName name="DAA score" />
        <FieldValue value={block?.header.daaScore} />
        <FieldName name="Blue work" />
        <FieldValue value={block?.header.blueWork} />
        <div className={`my-4 h-[1px] bg-gray-100 sm:col-span-2`} />
        <div className="text-black sm:col-span-2">Additional data</div>
        <FieldName name="Pruning point" />
        <FieldValue value={block?.header.pruningPoint} />
        {block?.extra?.minerInfo && (
          <>
            <FieldName name="Miner info" />
            <FieldValue
              value={
                <>
                  <div className="text-link">
                    <Link to={`/addresses/${block.extra.minerAddress}`}>{block.extra.minerAddress}</Link>
                  </div>
                  <div className="text-sm text-gray-500">{block.extra.minerInfo}</div>
                </>
              }
            />
          </>
        )}
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

const FieldValue = ({ value }: { value: string | React.ReactNode }) => <span className="overflow-hidden">{value}</span>;
