// @ts-ignore
import Search from '../assets/search.svg?react';
import {useRef, useEffect} from "react";

interface Props {
    className?: string;
    value: string;
    onChange: (e: any) => void;
}



const SearchBox = (props: Props) => {
    const inputFieldRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                (event.key === "#" || event.key === "/" || event.key === "-") &&
                document.activeElement !== inputFieldRef.current
            ) {
                event.preventDefault();
                inputFieldRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    
    return <div
        className={`grow text-sm w-96 flex flex-row items-center justify-start bg-gray-50 p-2 hover:cursor-text rounded-lg ${props.className || ""}`}
        onClick={() => {
            inputFieldRef.current?.focus();
        }}>
        <Search className="w-5 mx-2 fill-gray-500" onClick={() => {
            inputFieldRef.current?.focus();
        }}/>
        <input type="text" ref={inputFieldRef} className="grow focus:outline-none text-sm md:text-base lg:text-lg"
               placeholder="Search for address, transaction, token..."
               onChange={(e) => props.onChange(e.target.value)}
               value={props.value}
        />
        <div className="text-gray-500
        w-6 h-6 rounded-sm flex justify-center items-center ms-auto bg-white">
            /
        </div>
    </div>;
};

export default SearchBox;