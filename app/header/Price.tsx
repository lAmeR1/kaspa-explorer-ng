// @ts-ignore
import KaspaIcon from '../assets/kaspa.svg';

const PriceLabel = () => (
    <div className="hidden sm:flex flex-row justify-around items-center p-1 bg-white border-[1px] border-gray-100 rounded-4xl pr-2
    gap-x-1 ms-4">
        <img src={KaspaIcon} alt="" className="w-4 h-4"/>
        <span>$0.3122</span>
        <span className="text-success">+4.81%</span>
    </div>
);

export default PriceLabel;