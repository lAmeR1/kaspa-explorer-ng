import Logo from "./Logo";
import Price from "./Price";
import {useEffect, useState} from "react";
// @ts-ignore
import menu from "../../../assets/menu.svg";
// @ts-ignore
import close from "../../../assets/close.svg";

// @ts-ignore
import ChevronUp from '../../../assets/chevron-up.svg?react'
// @ts-ignore
import ChevronDown from '../../../assets/chevron-down.svg?react'
import SearchBox from "./SearchBox";

const Navbar = ({onExpandChange, ref}) => {
    const [expanded, setExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState('');


    useEffect(() => {
        onExpandChange(expanded);
    }, [expanded])

    return <div ref={ref}
                className={`flex flex-col bg-white px-6 rounded-b-4xl
            items-stretch py-4 w-full gap-y-6
            transition-all duration-300 absolute z-20
            ${expanded ? 'h-[100vh] overflow-hidden rounded-b-none' : ''}`}>

        <div className="flex flex-row items-center w-full text-sm md:text-md">
            <Logo/>
            <Price/>

            <SearchBox value={searchValue} className="hidden lg:flex" onChange={(e) => setSearchValue(e.target.value)}/>

            <div className="hidden sm:flex flex-row gap-x-10 ms-auto">
                <span>BlockDAG</span>
                <span>Assets</span>
                <span>Analytics</span>
            </div>
            <div className="sm:hidden ms-auto">
                <img src={!expanded ? menu : close} alt="open menu"
                     className={`hover:cursor-pointer transition-transform duration-200 ${expanded ? 'rotate-360' : ''}`}
                     onClick={() => setExpanded(!expanded)}/>

            </div>
        </div>
        <SearchBox value={searchValue} className="lg:hidden w-full" onChange={(e) => setSearchValue(e.target.value)}/>

        {expanded && <>
            <div className="">
                <span>BlockDAG</span>
                <span className=""></span>
            </div>
            <div className="flex flex-row w-full">
                <span>Transactions</span>
                <span className="ms-auto">
                    <ChevronUp/>
                </span>
            </div>
            <div className="">
                <span>Accounts</span>
                <span></span>
            </div>
            <div className="">
                <span>Blocks</span>
                <span></span>
            </div>
            <div className="flex flex-row w-full">
                <span>Assets</span>
                <span className="ms-auto">
                    <ChevronDown/>
                </span>
            </div>
            <div className="">
                <span>Analytics</span>
                <span className=""></span>
            </div>
        </>}
    </div>
};

export default Navbar;