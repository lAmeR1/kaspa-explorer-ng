import KaspaIcon from "../assets/kaspa.svg";

const PriceLabel = () => (
  <div className="ms-4 hidden flex-row items-center justify-around gap-x-1 rounded-4xl border-[1px] border-gray-100 bg-white p-1 pr-2 sm:flex">
    <img src={KaspaIcon} alt="" className="h-4 w-4" />
    <span className="text-sm">$0.3122</span>
    <span className="text-success text-sm">+4.81%</span>
  </div>
);

export default PriceLabel;
