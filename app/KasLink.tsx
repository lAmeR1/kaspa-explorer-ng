import QrCodeModal from "./QrCodeModal";
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
  shorten?: number;
}

const linkTypeToAddress: Record<KasLinkProps["linkType"], string> = {
  transaction: "/transactions/",
  block: "/blocks/",
  address: "/addresses/",
};

const KasLink = ({ to, className, shorten, linkType, copy, qr, link, active }: KasLinkProps) => {
  const [clicked, setClicked] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const linkHref = linkTypeToAddress[linkType] + to;

  const handleClick = async () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
    await navigator.clipboard.writeText(to);
  };

  if (!to) {
    return <></>;
  }

  const displayAddress = !shorten ? to : to.slice(0, shorten) + "..." + to.slice(to.length - shorten);

  return (
    <>
      <span className="inline break-all">
        {link && linkHref && !active ? (
          <Link className="text-link hover:underline" to={linkHref}>
            {displayAddress}
          </Link>
        ) : (
          <>{displayAddress}</>
        )}

        {(copy || qr) && (
          <span className="relative inline fill-gray-500 break-all">
            {copy &&
              (!clicked ? (
                <Copy
                  className="hover:fill-primary mx-1 inline h-4 w-4 align-middle hover:cursor-pointer"
                  onClick={handleClick}
                />
              ) : (
                <CopyCheck className="mx-1 inline h-4 w-4 animate-[spin_0.2s_linear_1] align-middle" />
              ))}
            {qr && (
              <QrCode
                className="hover:fill-primary relative inline h-4 w-4 align-middle hover:cursor-pointer"
                onClick={() => setShowQr(!showQr)}
              />
            )}
            {showQr && <QrCodeModal value={to} setShowQr={setShowQr} />}
          </span>
        )}
      </span>
    </>
  );
};

export default KasLink;
