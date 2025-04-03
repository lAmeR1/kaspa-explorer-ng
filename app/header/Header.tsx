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
      className={`flex flex-col bg-white rounded-b-4xl
            items-stretch py-4 w-full
            transition-all duration-600
            ${expanded ? "h-[100vh] sm:h-auto overflow-hidden rounded-b-none sm:rounded-b-4xl" : ""}`}
    >
      <div className="flex flex-row items-center w-full text-sm md:text-md px-6">
        <NavLink to={"/"}>
          <Logo />
        </NavLink>
        <Price />

        {typeof window !== "undefined" && window.location.pathname !== "/" && (
          <SearchBox
            value={searchValue}
            className="hidden lg:flex lg:ml-4 lg:mr-8"
            onChange={setSearchValue}
          />
        )}

        <DesktopMenu />
        <div className="sm:hidden ms-auto">
          <img
            src={!expanded ? menu : close}
            alt="open menu"
            className={`hover:cursor-pointer transition-transform duration-300 ${expanded ? "rotate-360" : ""}`}
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
              className="lg:hidden w-full"
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
