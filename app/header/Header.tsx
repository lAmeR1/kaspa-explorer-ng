import Close from "../assets/close.svg";
import LogoIcon from "../assets/logo.svg";
import Menu from "../assets/menu.svg";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import Price from "./Price";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const Header = ({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  return (
    <div
      id="header"
      className={`flex w-full flex-col items-stretch rounded-b-4xl bg-white px-2 py-4 text-base transition-all duration-600 ${expanded ? "h-[100vh] overflow-hidden rounded-b-none sm:h-auto sm:rounded-b-4xl" : ""}`}
    >
      <div className="md:text-md flex w-full flex-row items-center">
        <Link to={"/"}>
          <LogoIcon className="ms-4 h-10 w-48 md:h-10 md:w-50" />
        </Link>
        <Price />

        {location.pathname !== "/" && (
          <SearchBox value={searchValue} className="ms-auto hidden max-w-170 lg:flex" onChange={setSearchValue} />
        )}

        <DesktopMenu />
        <div
          className={`hover:fill-primary ms-auto me-4 transition-transform duration-300 hover:cursor-pointer sm:hidden ${expanded ? "rotate-360" : ""}`}
          onClick={() => setExpanded(!expanded)}
        >
          {!expanded ? <Menu /> : <Close />}
        </div>
      </div>

      {!expanded && location.pathname !== "/" && (
        <div className="mx-6 mt-4 lg:hidden">
          <SearchBox value={searchValue} className="w-full" onChange={setSearchValue} />
        </div>
      )}

      <MobileMenu showMenu={expanded} onCloseRequest={() => setExpanded(false)} />
    </div>
  );
};

export default Header;
