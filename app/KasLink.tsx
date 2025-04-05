import { Link } from "react-router";

interface KasLinkProps {
  linkType: "transaction" | "block";
  linkAdditionalParams?: string;
  to: string;
  className?: string;
}

const linkTypeToAddress: Record<KasLinkProps["linkType"], string> = {
  transaction: "/transactions/",
  block: "/blocks/",
};

const KasLink = ({ to, className, linkType }: KasLinkProps) => {
  return (
    <Link to={linkTypeToAddress[linkType] + to} className={className || "text-link"}>
      {to}?
    </Link>
  );
};

export default KasLink;
