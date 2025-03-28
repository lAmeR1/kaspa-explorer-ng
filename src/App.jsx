import './App.css'

import Navbar from "./components/mainpage/navbar/Navbar.tsx";
import {useState} from "react";
import Footer from "./components/mainpage/footer/Footer.js";

function App() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className={`flex flex-col justify-start min-h-screen relative 
                        ${expanded ? "h-screen overflow-hidden" : ""}`}>

            <Navbar onExpandChange={(e) => setExpanded(e)}/>
            <div className="block bg-white m-2 mt-18 rounded-4xl text-black p-8 text-left">
                <div className="text-2xl mb-4">Blocks</div>

                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 justify-between items-stretch flex-wrap">
                    <div className="grow grid border-[1px] border-gray-100 rounded-2xl p-4">
                        <span className="text-sm">Total blocks</span>
                        <span className="text-xl">119,762,579</span>
                    </div>
                    <div className="grow grid border-[1px] border-gray-100 rounded-2xl p-4">
                        <span className="text-sm">Total transactions</span>
                        <span className="text-xl">119,762,579</span>
                    </div>
                    <div className="grow grid border-[1px] border-gray-100 rounded-2xl p-4">
                        <span className="text-sm">Average block time</span>
                        <span className="text-xl">0,4 <span className="text-gray-500 text-sm">s</span></span>
                    </div>
                    <div className="grow grid border-[1px] border-gray-100 rounded-2xl p-4">
                        <span className="text-sm">Block rewards</span>
                        <span className="text-xl">77.32 <span className="text-gray-500 text-sm">KAS</span></span>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default App
