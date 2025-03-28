// @ts-ignore
import Search from '../../../assets/search.svg?react';
import {useRef} from "react";

interface BProps {
    className?: string;
    value: string;
    onChange: (e: any) => void;
}

const SearchBox = (props: BProps) => {
    const inputFieldRef = useRef(null);


    return <div
        className={`grow text-sm lg:ml-4 lg:mr-8 w-96 flex flex-row items-center justify-start bg-gray-50 p-1 hover:cursor-text rounded-lg ${props.className || ""}`}
        onClick={() => {
            inputFieldRef.current.focus();
        }}>
        <Search className="w-5 mx-2 fill-gray-500" onClick={() => {
            inputFieldRef.current.focus();
        }}/>
        <input type="text" ref={inputFieldRef} className="grow focus:outline-none"
               placeholder="Search for address, transaction, token..."
               onChange={props.onChange}
               value={props.value}
        />
        <button className="w-6 h-6 rounded-lg ms-auto bg-white hover:cursor-pointer">
            /
        </button>
    </div>;
};

export default SearchBox;