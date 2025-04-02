import Logo from "./Logo";
import Price from "./Price";
import {useState} from "react";
// @ts-ignore
import menu from "../assets/menu.svg";
// @ts-ignore
import close from "../assets/close.svg";

// @ts-ignore
import ChevronUp from '../assets/chevron-up.svg?react';
// @ts-ignore
import ChevronDown from '../assets/chevron-down.svg?react';
import SearchBox from "./SearchBox";
import {NavLink} from "react-router";

const Header = ({expanded, setExpanded, ref}: {
    expanded: boolean;
    setExpanded: (value: boolean) => void;
    ref?: React.RefObject<HTMLDivElement>
}) => {
    const [searchValue, setSearchValue] = useState('');

    return <div
        id="header"
        className={`flex flex-col bg-white px-6 rounded-b-4xl
            items-stretch py-4 w-full gap-y-6
            transition-all duration-600
            ${expanded ? 'h-[100vh] sm:h-auto overflow-hidden rounded-b-none sm:rounded-b-4xl' : ''}`}>
        <div className="flex flex-row items-center w-full text-sm md:text-md">
            <NavLink to={"/"}><Logo/></NavLink>
            <Price/>

            {typeof window !== "undefined" &&
                window.location.pathname !== "/" && (
                    <SearchBox value={searchValue} className="hidden lg:flex lg:ml-4 lg:mr-8"
                               onChange={setSearchValue}/>
                )}

            <div className="hidden  sm:flex flex-row gap-x-4 ms-auto">
                <div className="hover:cursor-pointer relative p-2 group hover:text-primary hover:fill-primary">
                    <span className="flex flex-row justify-center items-center">BlockDAG <ChevronUp className="h-4 duration-200
                        group-hover:fill-primary
                          group-hover:block
                          group-hover:rotate-180"/>
                    </span>

                    <div className="absolute
                        hidden group-hover:flex
                        flex-col
                        -translate-x-1/2
                        left-1/2
                        mt-2
                        h-6
                        w-48"/>
                    <div className="absolute
                        hidden group-hover:flex
                        flex
                        flex-col
                        -translate-x-1/2
                        left-1/2
                        w-48 bg-white text-black z-2 mt-4
                     p-4 rounded-2xl shadow-[#00000012] shadow-[0px_4px_32px_0px]">
                        <NavLink to="/blocks">
                            <div className="w-full hover:bg-gray-25 py-2">
                                Blocks
                            </div>
                        </NavLink>
                        <NavLink to="/transactions">
                            <div className="w-full hover:bg-gray-25 py-2">
                                Transactions
                            </div>
                        </NavLink>
                        <NavLink to="/accounts">
                            <div className="w-full hover:bg-gray-25 py-2">
                                Accounts
                            </div>
                        </NavLink>

                    </div>

                </div>
                <div className="relative group hover:cursor-pointer p-2">
                    <NavLink to={"/transactions"}>Assets</NavLink>
                    <div className="absolute
                        hidden group-hover:flex
                        flex-col
                        -translate-x-1/2
                        left-1/2
                        mt-2
                        h-6
                        w-48"/>
                    <div className="absolute
                        hidden group-hover:flex
                        flex
                        flex-col
                        -translate-x-1/2
                        left-1/2
                        w-48 bg-white text-black z-2 mt-4
                     p-4 rounded-2xl shadow-[#00000012] shadow-[0px_4px_32px_0px]">
                        <div className="w-full hover:bg-gray-25 py-2">Blocks</div>
                        <div className="w-full hover:bg-gray-25 py-2">Transactions</div>
                        <div className="w-full hover:bg-gray-25 py-2">Accounts..</div>

                    </div>
                </div>
                <div className="hover:cursor-pointer relative p-2 group hover:text-primary">
                    <NavLink to={"/blocks"}>Analytics</NavLink>
                    <div className="absolute
                        hidden group-hover:flex
                        flex-col
                        -translate-x-1/2
                        left-1/2
                        mt-2
                        h-6
                        w-48"/>
                    <div className="absolute
                        hidden group-hover:flex
                        flex
                        flex-col
                        -translate-x-1/2
                        left-1/2
                        w-48 bg-white text-black z-2 mt-4
                     p-4 rounded-2xl shadow-[#00000012] shadow-[0px_4px_32px_0px]">
                        <div className="w-full hover:bg-gray-25 py-2">Blocks</div>
                        <div className="w-full hover:bg-gray-25 py-2">Transactions</div>
                        <div className="w-full hover:bg-gray-25 py-2">Accounts</div>

                    </div>

                </div>
            </div>
            <div className="sm:hidden ms-auto">
                <img src={!expanded ? menu : close} alt="open menu"
                     className={`hover:cursor-pointer transition-transform duration-300 ${expanded ? 'rotate-360' : ''}`}
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
        {!expanded && typeof window !== "undefined" &&
            window.location.pathname !== "/" && <SearchBox value={searchValue} className="lg:hidden w-full"
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
    </div>;
};

export default Header;