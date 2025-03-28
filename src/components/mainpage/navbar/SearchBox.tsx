// @ts-ignore
import Search from '../../../assets/search.svg?react'

interface Props {
    className?: string;
}

const SearchBox = ({className = ""}: Props) => {
    return <div
        className={`grow lg:ml-4 lg:mr-8 w-96 flex flex-row items-center justify-start bg-gray-50 p-1 hover:cursor-text rounded-lg ${className || ""}`}
        onClick={() => {
            document.getElementById("searchField")?.focus()
        }}>
        <Search className="w-5 mx-2 fill-gray-500" onClick={() => {
            document.getElementById("searchField")?.focus()
        }}/>
        <input type="text" id="searchField" className="grow focus:outline-none"
               placeholder="Search for address, transaction, token..."/>
        <button className="w-6 h-6 rounded-lg ms-auto bg-white hover:cursor-pointer">
            /
        </button>
    </div>
}

export default SearchBox;