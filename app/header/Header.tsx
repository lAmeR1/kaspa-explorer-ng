import Close from "../assets/close.svg";
import Menu from "../assets/menu.svg";
import Logo from "./Logo";
import Price from "./Price";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { NavLink } from "react-router";
import DesktopMenu from "~/header/DesktopMenu";
import MobileMenu from "~/header/MobileMenu";

const Header = ({
  expanded,
  setExpanded,
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
        <div
          className={`hover:fill-primary ms-auto transition-transform duration-300 hover:cursor-pointer sm:hidden ${expanded ? "rotate-360" : ""}`}
          onClick={() => setExpanded(!expanded)}
        >
          {!expanded ? <Menu /> : <Close />}
        </div>
      </div>

      {!expanded &&
        typeof window !== "undefined" &&
        window.location.pathname !== "/" && (
          <div className="mx-6 mt-4 lg:hidden">
            <SearchBox
              value={searchValue}
              className="w-full"
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
