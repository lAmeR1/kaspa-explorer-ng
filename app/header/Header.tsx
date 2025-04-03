import Logo from "./Logo";
import Price from "./Price";
import { useState } from "react";
// @ts-ignore
import menu from "../assets/menu.svg";
// @ts-ignore
import close from "../assets/close.svg";

// @ts-ignore
import ChevronUp from "../assets/chevron-up.svg?react";
// @ts-ignore
import ChevronDown from "../assets/chevron-down.svg?react";
import SearchBox from "./SearchBox";
import { NavLink } from "react-router";
import MobileMenu from "~/header/MobileMenu";
import DesktopMenu from "~/header/DesktopMenu";

const Header = ({
  expanded,
  setExpanded,
  ref,
}: {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div
      id="header"
      className={`flex w-full flex-col items-stretch rounded-b-4xl bg-white py-4 transition-all duration-600 ${expanded ? "h-[100vh] overflow-hidden rounded-b-none sm:h-auto sm:rounded-b-4xl" : ""}`}
    >
      <div className="md:text-md flex w-full flex-row items-center px-6 text-sm">
        <NavLink to={"/"}>
          <Logo />
        </NavLink>
        <Price />

        {typeof window !== "undefined" && window.location.pathname !== "/" && (
          <SearchBox
            value={searchValue}
            className="hidden lg:mr-8 lg:ml-4 lg:flex"
            onChange={setSearchValue}
          />
        )}

        <DesktopMenu />
        <div className="ms-auto sm:hidden">
          <img
            src={!expanded ? menu : close}
            alt="open menu"
            className={`transition-transform duration-300 hover:cursor-pointer ${expanded ? "rotate-360" : ""}`}
            onClick={() => setExpanded(!expanded)}
          />
        </div>
      </div>

      {!expanded &&
        typeof window !== "undefined" &&
        window.location.pathname !== "/" && (
          <div className="mx-6 mt-4">
            <SearchBox
              value={searchValue}
              className="w-full lg:hidden"
              onChange={setSearchValue}
            />
          </div>
        )}

      <MobileMenu
        showMenu={expanded}
        onCloseRequest={() => setExpanded(false)}
      />
    </div>
  );
};

export default Header;
