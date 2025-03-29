import Logo from "./Logo";
import Price from "./Price";
import {useState} from "react";
// @ts-ignore
import menu from "../../../assets/menu.svg";
// @ts-ignore
import close from "../../../assets/close.svg";

// @ts-ignore
import ChevronUp from '../../../assets/chevron-up.svg?react'
// @ts-ignore
import ChevronDown from '../../../assets/chevron-down.svg?react'
import SearchBox from "./SearchBox";

const Navbar = ({expanded, setExpanded, ref}) => {
    const [searchValue, setSearchValue] = useState('');

    return <div ref={ref}
                className={`flex flex-col bg-white px-6 rounded-b-4xl
            items-stretch py-4 w-full gap-y-6
            transition-all duration-300 absolute z-20
            ${expanded ? 'h-[100vh] sm:h-auto overflow-hidden rounded-b-none sm:rounded-b-4xl' : ''}`}>

        <div className="flex flex-row items-center w-full text-sm md:text-md">
            <Logo/>
            <Price/>

            <SearchBox value={searchValue} className="hidden lg:flex" onChange={(e) => setSearchValue(e.target.value)}/>

            <div className="hidden sm:flex flex-row gap-x-4 ms-auto">
                <div className="hover:cursor-pointer p-2">BlockDAG</div>
                <div className="hover:cursor-pointer p-2">Assets</div>
                <div className="hover:cursor-pointer p-2" onClick={() => setExpanded(true)}>Analytics</div>
            </div>
            <div className="sm:hidden ms-auto">
                <img src={!expanded ? menu : close} alt="open menu"
                     className={`hover:cursor-pointer transition-transform duration-200 ${expanded ? 'rotate-360' : ''}`}
                     onClick={() => setExpanded(!expanded)}/>

            </div>

        </div>
        {expanded && <div className="hidden w-full sm:flex flex-row text-sm">
            <div className="hidden sm:flex flex-row gap-x-4 ms-auto">
                <div className="hover:cursor-pointer p-2 flex flex-col gap-y-2">
                    <div>Blocks</div>
                    <div>Transactions</div>
                    <div>Accounts</div>

                </div>
                <div className="hover:cursor-pointer p-2">Assets</div>
                <div className="hover:cursor-pointer p-2">Analytics</div>
            </div>
        </div>}
        {!expanded && <SearchBox value={searchValue} className="lg:hidden w-full"
                                 onChange={(e) => setSearchValue(e.target.value)}/>}

        {expanded && <div className="flex flex-col gap-y-3 sm:hidden">
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
        </div>}
    </div>
};

export default Navbar;