import { useState } from "react";
import { Link } from "react-router";
import QrCodeModal from "~/QrCodeModal";
import Copy from "~/assets/copy.svg";
import CopyCheck from "~/assets/copycheck.svg";
import QrCode from "~/assets/qr_code.svg";

interface KasLinkProps {
  linkType: "transaction" | "block" | "address";
  linkAdditionalParams?: string;
  to: string;
  className?: string;
  copy?: boolean;
  qr?: boolean;
  link?: boolean;
  active?: boolean;
}

const linkTypeToAddress: Record<KasLinkProps["linkType"], string> = {
  transaction: "/transactions/",
  block: "/blocks/",
  address: "/addresses/",
};

const KasLink = ({ to, className, linkType, copy, qr, link, active }: KasLinkProps) => {
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

  const splitAt = to.length - 8;

  return (
    <div className={`grid grid-cols-[auto_1fr] text-ellipsis ${className}`}>
      <span className="break-keep text-ellipsis">
        {link && linkHref && !active ? (
          <Link className="text-link" to={linkHref}>
            {to.substring(0, splitAt)}
          </Link>
        ) : (
          <>{to.substring(0, splitAt)}</>
        )}
      </span>

      <span className="relative fill-gray-500 text-nowrap">
        {link && linkHref && !active ? (
          <Link className="text-link" to={linkHref}>
            {to.substring(splitAt)}
          </Link>
        ) : (
          to.substring(splitAt)
        )}
        {copy &&
          (!clicked ? (
            <Copy
              className="hover:fill-primary mx-1 inline h-4 w-4 align-middle hover:cursor-pointer"
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
            className="hover:fill-primary relative inline h-4 w-4 align-middle hover:cursor-pointer"
            onClick={() => setShowQr(!showQr)}
          />
        )}

        {showQr && <QrCodeModal value={to} setShowQr={setShowQr} />}
      </span>
    </div>
  );
};

export default KasLink;
