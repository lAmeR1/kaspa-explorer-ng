import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import Button from "~/Button";
import InfoBox from "~/InfoBox";
import Close from "~/assets/close.svg";
import Kaspa from "~/assets/kaspa.svg";

interface QrCodeModalProps {
  value: string;
  setShowQr: (show: boolean) => void;
}

const QrCodeModal = (props: QrCodeModalProps) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(props.value);
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };
  return (
    <div
      className="fixed top-0 left-0 z-10 flex h-screen w-full items-center justify-center bg-black/80"
      onClick={() => props.setShowQr(false)}
      id="qr-code"
    >
      <div
        className="relative z-200 flex w-[360px] flex-col items-center justify-around rounded-4xl bg-white p-6 opacity-100"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="mb-8 flex w-full flex-row items-center justify-between text-[24px]">
          <span>Kaspa address</span>
          <Close className="fill-black" onClick={() => props.setShowQr(false)} />
        </div>

        <div className="relative mx-8 mb-6">
          <QRCodeSVG className="block" value={props.value} level="M" size={180} />
          <Kaspa className="absolute top-1/2 left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 bg-white" />
        </div>

        <div className="text-gray-500">Scan or copy the Kaspa address</div>
        <div className="mt-2 w-full text-center text-wrap break-all text-black">{props.value}</div>

        <div className="relative mt-8 w-full">
          <Button className="h-10 w-full" value={"Copy to clipboard"} primary onClick={handleClick} />
          {clicked && <InfoBox>copied</InfoBox>}
        </div>
      </div>
    </div>
  );
};

export default QrCodeModal;
