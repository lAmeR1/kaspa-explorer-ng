// @ts-ignore
import ChevronDown from '../assets/chevron-down.svg?react'
import React, {type ReactNode, useEffect} from "react";
import {NavLink, useLocation} from "react-router";

interface Props {
    showMenu: boolean;
    onCloseRequest: () => void;
}

const MobileMenu = ({showMenu, onCloseRequest}: Props) => {
    const location = useLocation();

    useEffect(() => {
        if (showMenu) {
            onCloseRequest();
        }
    }, [location]);


    return (showMenu && <div className="flex flex-col sm:hidden">
        <MenuItem name="BlockDAG" expandable={true}>
            <MenuItem name="Blocks" linkTo="/blocks" indent/>
            <MenuItem name="Transactions" linkTo="/transactions" indent/>
            <MenuItem name="Accounts" linkTo="/accounts" indent/>
        </MenuItem>
        <MenuItem name="Assets"/>
        <MenuItem name="Analytics"/>
    </div>)

}

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

    return <Wrapper to={props.linkTo || ""}>
        <div key={props.name} className={`flex flex-row w-full items-center px-6 py-1 ${props.indent ? "pl-10" : ""}`}

             onClick={() => props.expandable && setIsOpen(!isOpen)}
        >
            <span>{props.name}</span>
            <span className="ms-auto">
                    {props.expandable && <ChevronDown
                        className={`h-5 w-5 transform-all duration-250 fill-gray-500 ${!isOpen ? "rotate-180" : ""}`}
                    />}
        </span>
        </div>

        <div className={`flex flex-col py-1 overflow-hidden
                 transition-all duration-250
                 ${isOpen ? `max-h-50` : "max-h-0"}`}
        >
            {React.Children.map(props.children, (child) => {
                return <span>{child}</span>
            })}
        </div>
    </Wrapper>;

};

export default MobileMenu;