// @ts-ignore
import ChevronUp from '../assets/chevron-up.svg?react'

import {NavLink} from "react-router";
import {useEffect, useState} from "react";

const DesktopMenu = () => {
    const [menuEnabled, setMenuEnabled] = useState(false);

    useEffect(() => {
        !menuEnabled && setTimeout(() => setMenuEnabled(true), 100)
    }, [menuEnabled])

    return <div className="hidden sm:flex flex-row gap-x-4 ms-auto">
        <div className="hover:cursor-pointer relative p-2 group hover:text-primary hover:fill-primary">
                    <span className="flex flex-row justify-center items-center">
                        BlockDAG
                        <ChevronUp className="w-4 h-4 ms-1 duration-200
                        group-hover:fill-primary
                          group-hover:block
                          group-hover:rotate-0
                          -rotate-180
                          "/>
                    </span>

            {menuEnabled && <>
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
                     p-4 rounded-2xl shadow-[#00000012] shadow-[0px_4px_32px_0px]"
                >
                    <NavLink to="/blocks" onClick={() => setMenuEnabled(false)}>
                        <div className="w-full hover:bg-gray-25 p-2">
                            Blocks
                        </div>
                    </NavLink>
                    <NavLink to="/transactions" onClick={() => setMenuEnabled(false)}>
                        <div className="w-full hover:bg-gray-25 p-2">
                            Transactions
                        </div>
                    </NavLink>
                    <NavLink to="/accounts" onClick={() => setMenuEnabled(false)}>
                        <div className="w-full hover:bg-gray-25 p-2">
                            Accounts
                        </div>
                    </NavLink>

                </div>
            </>}

        </div>
        <div className="hover:cursor-pointer relative p-2 group hover:text-primary">
            <NavLink to={"/assets"}>Assets</NavLink>
        </div>
        <div className="hover:cursor-pointer relative p-2 group hover:text-primary">
            <NavLink to={"/analytics"}>Analytics</NavLink>
        </div>
    </div>
}

export default DesktopMenu;