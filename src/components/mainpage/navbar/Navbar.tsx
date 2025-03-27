import Logo from "./Logo";
import Price from "./Price";
import {useEffect, useState} from "react";
// @ts-ignore
import menu from "../../../assets/menu.svg";

const Navbar = ({onExpandChange}) => {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        onExpandChange(expanded);
    }, [expanded])

    return <div
        className={`flex flex-col bg-white px-6 rounded-b-4xl
            items-start py-4 w-full h-16 gap-y-6
            transition-all duration-600 absolute z-20
            ${expanded ? 'h-[100vh] overflow-hidden rounded-b-none' : ''}`}>

        <div className="flex flex-row justify-center w-full">
            <Logo/>
            <Price/>

            <div className="hidden sm:flex flex-row gap-x-10 ms-auto">
                <span>BlockDAG</span>
                <span>Assets</span>
                <span>Analytics</span>
            </div>
            <div className="sm:hidden ms-auto">
                <img src={menu}
                     className={`hover:cursor-pointer transition-transform duration-200 ${expanded ? 'rotate-360' : ''}`}
                     onClick={() => setExpanded(!expanded)}/>

            </div>
        </div>
        {expanded && <>
            <div className="font-medium">BlockDAG</div>
            <div className="font-medium">Transactions</div>
            <div className="font-medium">Analytics</div>
            <div className="font-medium">And</div>
            <div className="font-medium">So</div>
            <div className="font-medium">on..</div>
        </>}
    </div>
};

export default Navbar;