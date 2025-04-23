import QrCodeModal from "./QrCodeModal";
import Tooltip, { TooltipDisplayMode } from "./Tooltip";
import Copy from "./assets/copy.svg";
import CopyCheck from "./assets/copycheck.svg";
import QrCode from "./assets/qr_code.svg";
import { useState } from "react";
import { Link } from "react-router";

interface KasLinkProps {
  linkType: "transaction" | "block" | "address";
  linkAdditionalParams?: string;
  to: string;
  className?: string;
  copy?: boolean;
  qr?: boolean;
  link?: boolean;
  active?: boolean;
  shorten?: boolean;
}

const linkTypeToAddress: Record<KasLinkProps["linkType"], string> = {
  transaction: "/transactions/",
  block: "/blocks/",
  address: "/addresses/",
};

const KasLink = ({ to, className, linkType, copy, qr, link, active, shorten }: KasLinkProps) => {
  const [clicked, setClicked] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const linkHref = linkTypeToAddress[linkType] + to;

  const handleClick = () => {
    navigator.clipboard.writeText(to);
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };

  if (!to) {
    return <></>;
  }

  // if (active) {
  //   return <span>this address</span>;
  // }

  const splitAt = linkType === "address" ? 13 : 8;
  const displayValue = shorten ? to.substring(0, splitAt) + "…" + to.substring(to.length - 8) : to;

  return (
    <span>
      <span className="break-all">
        {link && linkHref && !active ? (
          <Link className="text-link hover:underline" to={linkHref}>
            {displayValue}
          </Link>
        ) : (
          displayValue
        )}
      </span>
      <span className="fill-gray-500">
        <Tooltip message={"copied"} display={TooltipDisplayMode.Click} clickTimeout={1000}>
          {copy &&
            (!clicked ? (
              <Copy
                className="hover:fill-primary mx-1 inline h-4 w-4 align-middle hover:cursor-pointer"
                onClick={handleClick}
              />
            ) : (
              <CopyCheck className="mx-1 inline h-4 w-4 animate-[spin_0.2s_linear_1] align-middle" />
            ))}
        </Tooltip>

        {qr && (
          <QrCode
            className="hover:fill-primary relative inline h-4 w-4 align-middle hover:cursor-pointer"
            onClick={() => setShowQr(!showQr)}
          />
        )}
      </span>
      {showQr && <QrCodeModal value={to} setShowQr={setShowQr} />}
    </span>
  );
};

export default KasLink;
