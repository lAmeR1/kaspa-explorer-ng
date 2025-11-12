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
        <MenuItem name="Blocks" linkTo="/blocks" />
        <MenuItem name="Transactions" linkTo="/transactions" />
        <MenuItem name="Addresses" linkTo="/addresses" />
        <div className="h-[1px] my-4 bg-gray-100 mx-4"></div>
        <MenuItem name="Analytics" linkTo="/analytics" />
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
  const Wrapper = props.linkTo ? NavLink : "div";

  return (
    <Wrapper to={props.linkTo ?? ""}>
      <div
        key={props.name}
        className={`flex w-full flex-row h-10 items-center px-4 py-1 ${props.indent ? "pl-10" : ""}`}
      >
        <span className="hover:bg-gray-25 rounded-lg w-full h-10 content-center px-1">{props.name}</span>
      </div>

      <div className={`flex flex-col overflow-hidden py-1 transition-all duration-250`}>
        {React.Children.map(props.children, (child) => {
          return <span>{child}</span>;
        })}
      </div>
    </Wrapper>
  );
};

export default MobileMenu;
