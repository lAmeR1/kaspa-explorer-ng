// @ts-ignore
import ChevronUp from '../assets/chevron-up.svg?react'

import {NavLink} from "react-router";
import {useEffect, useState} from "react";

const MAIN_MENU = [
    {
        name: "BlockDAG",
        expandable: true,
        children: [
            {
                name: "Blocks",
                linkTo: "/blocks"
            },
            {
                name: "Transactions",
                linkTo: "/transactions"
            },
            {
                name: "Accounts",
                linkTo: "/accounts"
            }]
    },
    {
        name: "Assets",
        linkTo: "/assets"
    },
    {
        name: "Analytics",
    }
]


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
        !menuEnabled && setTimeout(() => setMenuEnabled(true), 100)
    }, [menuEnabled])

    const InnerLink = () => <div
        className="hover:cursor-pointer relative p-2 group hover:text-primary hover:fill-primary">
                    <span className="flex flex-row justify-center items-center">
                        {props.name}
                        {props.expandable && (
                            <ChevronUp className="w-4 h-4 ms-1 duration-200
                                                group-hover:fill-primary
                                                  group-hover:block
                                                  group-hover:rotate-0
                                                  -rotate-180
                          "/>)}
                    </span>

        {(props.children && menuEnabled) && <>
            <HiddenDiv/>
            <div className="absolute
                        hidden group-hover:flex
                        flex-col
                        -translate-x-1/2
                        left-1/2
                        w-48 bg-white text-black z-2 mt-4
                     p-4 rounded-2xl shadow-[#00000012] shadow-[0px_4px_32px_0px]"
            >
                {props.children.map((menuItem) => <NavLink to={menuItem.linkTo}
                                                           onClick={() => setMenuEnabled(false)}>
                    <div className="w-full hover:bg-gray-25 p-2">
                        {menuItem.name}
                    </div>
                </NavLink>)}

            </div>
        </>}

    </div>

    return (props.linkTo ? <NavLink to={props.linkTo}><InnerLink/></NavLink> : <InnerLink/>);
}

const DesktopMenu = () => {

    return <div className="hidden sm:flex flex-row gap-x-4 ms-auto">
        {MAIN_MENU.map((menuItem) => (
            <MenuItem
                name={menuItem.name}
                linkTo={menuItem.linkTo || ""}
                expandable={menuItem.expandable}
                children={menuItem.children}
            />))}
    </div>
}

const HiddenDiv = () => <div className="absolute
hidden group-hover:flex
flex-col
-translate-x-1/2
left-1/2
mt-2
h-6
w-48"/>

export default DesktopMenu;