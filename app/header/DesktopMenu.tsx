import ChevronUp from "../assets/chevron-up.svg";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const MAIN_MENU = [
  {
    name: "BlockDAG",
    expandable: true,
    children: [
      {
        name: "Blocks",
        linkTo: "/blocks",
      },
      {
        name: "Transactions",
        linkTo: "/transactions",
      },
      {
        name: "Addresses",
        linkTo: "/addresses",
      },
    ],
  },
  {
    name: "Assets",
    linkTo: "/assets",
  },
  {
    name: "Analytics",
  },
];

interface MenuItemProps {
  name: string;
  linkTo?: string;
  expandable?: boolean;
  children?: Array<{
    name: string;
    linkTo: string;
  }>;
}

const MenuItem = (props: MenuItemProps) => {
  const [menuEnabled, setMenuEnabled] = useState(false);

  useEffect(() => {
    if (!menuEnabled) setTimeout(() => setMenuEnabled(true), 100);
  }, [menuEnabled]);

  const InnerLink = () => (
    <div className="group hover:text-primary hover:fill-primary relative p-2 hover:cursor-pointer">
      <span className="flex flex-row items-center justify-center">
        {props.name}
        {props.expandable && (
          <ChevronUp className="group-hover:fill-primary ms-1 h-4 w-4 -rotate-180 duration-200 group-hover:block group-hover:rotate-0" />
        )}
      </span>

      {props.children && menuEnabled && (
        <>
          <HiddenDiv />
          <div className="absolute left-1/2 z-2 mt-4 hidden w-48 -translate-x-1/2 flex-col rounded-2xl bg-white p-4 text-black shadow-[0px_4px_32px_0px] shadow-[#00000012] group-hover:flex">
            {props.children.map((menuItem) => (
              <NavLink to={menuItem.linkTo} onClick={() => setMenuEnabled(false)}>
                <div className="hover:bg-gray-25 w-full p-2">{menuItem.name}</div>
              </NavLink>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return props.linkTo ? (
    <NavLink to={props.linkTo}>
      <InnerLink />
    </NavLink>
  ) : (
    <InnerLink />
  );
};

const DesktopMenu = () => {
  return (
    <div className="ms-2 hidden flex-row gap-x-4 sm:flex">
      {MAIN_MENU.map((menuItem) => (
        <MenuItem
          name={menuItem.name}
          linkTo={menuItem.linkTo || ""}
          expandable={menuItem.expandable}
          children={menuItem.children}
        />
      ))}
    </div>
  );
};

const HiddenDiv = () => (
  <div className="absolute left-1/2 mt-2 hidden h-6 w-48 -translate-x-1/2 flex-col group-hover:flex" />
);

export default DesktopMenu;
