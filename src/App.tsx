import Navbar from "./components/mainpage/navbar/Navbar";
import {useEffect, useRef, useState} from "react";
import Footer from "./components/mainpage/footer/Footer";
import numeral from "numeral";

// @ts-ignore
import Box from "./assets/box.svg?react";

function App() {
    const [expanded, setExpanded] = useState(false);
    const navbarRef = useRef(null);
    const [navbarHeight, setNavbarHeight] = useState(0);

    const updateNavbarHeight = () => {
        if (navbarRef.current)
            setNavbarHeight(navbarRef.current.offsetHeight);
    };

    useEffect(() => {
        updateNavbarHeight();
        window.addEventListener('resize', updateNavbarHeight);

        return () => window.removeEventListener('resize', updateNavbarHeight);
    }, []);


    return <>
        {expanded && <div className="absolute top-0 left-0 z-2 w-screen h-screen bg-black opacity-15"
                          onClick={() => setExpanded(false)}/>}
        <div
            className={`flex flex-col justify-start items-center min-h-screen relative 
                        ${expanded ? "h-screen overflow-hidden" : ""}`}>


            <Navbar ref={navbarRef} expanded={expanded} setExpanded={setExpanded}/>

            <div id="main-content"
                 className="w-full flex flex-col items-stretch max-w-[1100px] px-2 sm:px-4 py-2 gap-y-2"
                 style={{marginTop: navbarHeight}}>

                <div className="bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full">
                    <div className="text-2xl mb-4">Blocks</div>

                    <div
                        className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 justify-between items-stretch flex-wrap">
                        <div className="grow grid border border-gray-100 rounded-2xl p-4">
                            <span className="text-xs sm:text-sm">Total blocks</span>
                            <span
                                className="text-base sm:text-xl">{numeral(Math.random() * 100990000).format("0,0")}</span>
                        </div>
                        <div className="grow grid border border-gray-100 rounded-2xl p-4">
                            <span className="text-xs sm:text-sm">Total transactions</span>
                            <span
                                className="text-base sm:text-xl">{numeral(Math.random() * 1000000).format("0,0")}</span>
                        </div>
                        <div className="grow grid border border-gray-100 rounded-2xl p-4">
                            <span className="text-xs sm:text-sm">Average block time</span>
                            <span className="text-base sm:text-xl">{numeral(Math.random()).format("0.00")}
                                <span className="text-gray-500 text-sm"> s</span>
                            </span>
                        </div>
                        <div className="grow grid border border-gray-100 rounded-2xl p-4">
                            <span className="text-xs sm:text-sm">Block rewards</span>
                            <span className="text-base sm:text-xl">{numeral(Math.random() * 10 + 70).format("0.00")}
                                <span
                                    className="text-gray-500 text-sm"> KAS</span></span>
                        </div>
                    </div>

                </div>

                <div
                    className="w-full flex flex-col bg-white rounded-4xl p-4 sm:p-8 text-left text-gray-500 ">
                    <div className="bg-primary/20 basis-full mb-2 p-6 rounded-2xl text-black text-left text-sm">
                        Blocks are arriving with a speed of 10 blocks per second. The network is currently at block
                        119,762,579.
                    </div>

                    <table>
                        <thead>
                        <tr className="text-sm border-b border-gray-100">
                            <th className="font-normal pl-1">Timestamp</th>
                            <th className="font-normal pl-1">Hash</th>
                            <th className="font-normal pl-1 text-left hidden sm:table-cell">BlueScore</th>
                            <th className="text-right font-normal text-nowrap">TX Count</th>
                        </tr>
                        </thead>

                        {[...Array(20)].map((_, index) => (
                            <tr key={index} className="border-b border-gray-100 text-black text-sm">
                                <td className="pr-2 text-nowrap">1 second ago</td>
                                <td className="text-link pr-2 font-mono">
                                    <span
                                        className="hidden md:table-cell">{"330ecb081ea2093ffb8de8662518a5320e778851dfa44ef667d5fa0ce7dfccd7"}</span>
                                    <span
                                        className="hidden xs:table-cell md:hidden">{"330ecb081ea2093ffb...ef667d5fa0ce7dfccd7"}</span>
                                    <span
                                        className="table-cell xs:hidden">{"330ecb08...d5fa0ce7dfccd7"}</span>
                                </td>
                                <td className="hidden sm:table-cell">124121225</td>
                                <td className="pl-5 py-3 text-right">{Math.floor(Math.random() * 100) + 1}</td>

                            </tr>
                        ))}

                    </table>

                </div>
                <div
                    className="w-full flex flex-row bg-white rounded-4xl p-4 sm:p-8 text-left  text-gray-500">
                    <div className="h-5 w-5 me-2">
                        <Box className="h-5 w-5 fill-gray-500"/>
                    </div>
                    <span>A block is a secure, sequential record in the blockchain containing verified transactions, a unique hash, and a reference to the previous block, ensuring data integrity.</span>
                </div>
            </div>

            <Footer/>
        </div>
    </>;
}

export default App;
