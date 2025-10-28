import KasLink from "../KasLink";
import LoadingMessage from "../LoadingMessage";
import PageTable from "../PageTable";
import AccountBalanceWallet from "../assets/account_balance_wallet.svg";
import { useAddressDistribution } from "../hooks/useAddressDistribution";
import { useAddressNames } from "../hooks/useAddressNames";
import { useCoinSupply } from "../hooks/useCoinSupply";
import { useTopAddresses } from "../hooks/useTopAddresses";
import Card from "../layout/Card";
import CardContainer from "../layout/CardContainer";
import FooterHelper from "../layout/FooterHelper";
import MainBox from "../layout/MainBox";
import numeral from "numeral";

export function meta() {
  return [
    { title: "Kaspa Explorer - Addresses" },
    {
      name: "description",
      content: "",
    },
  ];
}

export default function Addresses() {
  const { data: topAddresses, isLoading } = useTopAddresses();
  const { data: coinSupply, isLoading: isLoadingSupply } = useCoinSupply();

  const { data: addressNames } = useAddressNames();
  const { data: addressDistribution, isLoading: isLoadingDistribution } = useAddressDistribution();

  if (isLoading || isLoadingSupply) {
    return <LoadingMessage>Loading addresses</LoadingMessage>;
  }

  const getAddressCountAbove1KAS = () => {
    if (!addressDistribution) return;
    return addressDistribution[0].tiers?.reduce((acc, curr) => acc + (curr.tier > 0 ? curr.count : 0), 0);
  };

  const calculateSum = (top: number) => topAddresses!.ranking.slice(0, top).reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <>
      <MainBox>
        <CardContainer title="Addresses">
          <Card
            title="Number of addresses"
            loading={isLoadingDistribution}
            value={`${numeral(getAddressCountAbove1KAS()).format("0,")}`}
            subtext="with at least 1 KAS"
          />
          <Card
            title="Top 10 addresses"
            loading={isLoadingSupply}
            value={`${numeral((calculateSum(10) / (coinSupply!.circulatingSupply / 1_0000_0000)) * 100).format("0.00")}%`}
            subtext="of circulating supply"
          />
          <Card
            title="Top 100 addresses"
            loading={isLoadingSupply}
            value={`${numeral((calculateSum(100) / (coinSupply!.circulatingSupply / 1_0000_0000)) * 100).format("0.00")}%`}
            subtext="of circulating supply"
          />
          <Card
            title="Top 1000 addresses"
            loading={isLoadingSupply}
            value={`${numeral((calculateSum(1000) / (coinSupply!.circulatingSupply / 1_0000_0000)) * 100).format("0.00")}%`}
            subtext="of circulating supply"
          />
        </CardContainer>
      </MainBox>

      <div className="flex w-full flex-col rounded-4xl bg-white p-4 text-left text-gray-500 sm:p-8">
        <PageTable
          className="text-black"
          headers={["Rank", "Address", "Label", "Balance", "Percentage"]}
          rows={topAddresses!.ranking.slice(0, 100).map((addressInfo) => [
            addressInfo.rank + 1,
            <KasLink linkType="address" link to={addressInfo.address} />,
            addressNames && addressNames[addressInfo.address] && (
              <span className="bg-accent-yellow rounded-full px-4 py-0.5 text-center text-nowrap text-black">
                {addressNames[addressInfo.address]}
              </span>
            ),
            <>
              {numeral(addressInfo.amount).format("0,0")}
              <span className="text-gray-500"> KAS</span>
            </>,
            <>
              {numeral((addressInfo.amount / (coinSupply!.circulatingSupply / 1_0000_0000)) * 100).format("0.00")}
              <span className="text-gray-500">&nbsp;%</span>
            </>,
          ])}
        />
      </div>
      <FooterHelper icon={AccountBalanceWallet}>
        <span className="">
          An address is a unique identifier on the blockchain used to send, receive, and store assets or data. It holds
          balances and interacts with the network securely.
        </span>
      </FooterHelper>
    </>
  );
}
