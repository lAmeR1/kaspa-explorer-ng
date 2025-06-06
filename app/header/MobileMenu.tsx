import ChevronDown from "../assets/chevron-down.svg";
import React, { type ReactNode, useEffect } from "react";
import { NavLink, useLocation } from "react-router";

interface Props {
  showMenu: boolean;
  onCloseRequest: () => void;
}

const MobileMenu = ({ showMenu, onCloseRequest }: Props) => {
  const location = useLocation();

  useEffect(() => {
    if (showMenu) {
      onCloseRequest();
    }
  }, [location]);

  return (
    showMenu && (
      <div className="flex flex-col pt-4 sm:hidden">
        <MenuItem name="Explore" expandable={true}>
          <MenuItem name="Blocks" linkTo="/blocks" indent />
          <MenuItem name="Transactions" linkTo="/transactions" indent />
          <MenuItem name="Addresses" linkTo="/addresses" indent />
        </MenuItem>
        <MenuItem name="Assets" />
        <MenuItem name="Analytics" />
      </div>
    )
  );
};

interface MenuItemProps {
  name: string;
  expandable?: boolean;
  children?: ReactNode;
  linkTo?: string;
  indent?: boolean;
}

const MenuItem = (props: MenuItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const Wrapper = props.linkTo ? NavLink : "div";

  return (
    <Wrapper to={props.linkTo || ""}>
      <div
        key={props.name}
        className={`flex w-full flex-row items-center px-6 py-1 ${props.indent ? "pl-10" : ""}`}
        onClick={() => props.expandable && setIsOpen(!isOpen)}
      >
        <span>{props.name}</span>
        <span className="ms-auto">
          {props.expandable && (
            <ChevronDown
              className={`transform-all h-5 w-5 fill-gray-500 duration-250 ${!isOpen ? "rotate-180" : ""}`}
            />
          )}
        </span>
      </div>

      <div
        className={`flex flex-col overflow-hidden py-1 transition-all duration-250 ${isOpen ? `max-h-50` : "max-h-0"}`}
      >
        {React.Children.map(props.children, (child) => {
          return <span>{child}</span>;
        })}
      </div>
    </Wrapper>
  );
};

export default MobileMenu;
