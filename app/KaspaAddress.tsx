import Copy from "./assets/copy.svg";

import QrCode from "./assets/qr_code.svg";

import CopyCheck from "./assets/copycheck.svg";

import Close from "./assets/close.svg";

import Kaspa from "./assets/kaspa.svg";

import { useState } from "react";

import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router";

const KaspaAddress = ({
  value,
  copy = false,
  qr = false,
  link = false,
}: {
  value: string;
  copy?: boolean;
  qr?: boolean;
  link?: boolean;
}) => {
  const [clicked, setClicked] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const linkHref = "/accounts/" + value;

  const handleClick = () => {
    navigator.clipboard.writeText(value);
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <div className="grid grid-cols-[auto_1fr] overflow-hidden text-ellipsis">
      <span className="overflow-hidden text-ellipsis">
        {value.substring(0, 54)}
      </span>

      <span className="fill-gray-500 text-nowrap">
        {link && linkHref ? (
          <Link className="text-link" to={linkHref}>
            {value.substring(54)}
          </Link>
        ) : (
          value
        )}
        {copy &&
          (!clicked ? (
            <Copy
              className="hover:fill-primary mx-1 inline h-4 w-4 align-middle"
              onClick={handleClick}
            />
          ) : (
            <CopyCheck className="mx-1 inline h-4 w-4 animate-[spin_0.2s_linear_1] align-middle" />
          ))}

        {clicked && (
          <div className="bg-primary absolute z-10 inline -translate-x-full -translate-y-full rounded-lg p-2 text-white">
            copied
          </div>
        )}

        {qr && (
          <QrCode
            className="hover:fill-primary relative inline h-4 w-4 align-middle"
            onClick={() => setShowQr(!showQr)}
          />
        )}

        {showQr && <QrCodeModal value={value} setShowQr={setShowQr} />}
      </span>
    </div>
  );
};

export default KaspaAddress;

interface QrCodeModalProps {
  value: string;
  setShowQr: (show: boolean) => void;
}

const QrCodeModal = (props: QrCodeModalProps) => (
  <div
    className="fixed top-0 left-0 z-10 flex h-screen w-full items-center justify-center bg-black/80"
    onClick={() => props.setShowQr(false)}
    id="qr-code"
  >
    <div
      className="relative z-200 flex flex-col items-center justify-around rounded-4xl bg-white opacity-100"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Close
        className="m-3 self-end hover:cursor-pointer"
        onClick={() => props.setShowQr(false)}
      />

      <span className="mb-4 text-2xl">Scan or copy the Kaspa address</span>
      <div className="relative mx-8 mb-6">
        <QRCodeSVG className="block" value={props.value} level="M" size={180} />
        <Kaspa className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 bg-white" />
      </div>

      <div className="mx-8 mt-4 mb-8 flex w-128 flex-row items-center justify-center rounded-lg bg-gray-50 p-2 text-sm hover:cursor-text">
        {props.value}
      </div>
    </div>
  </div>
);
