// @ts-ignore
import Search from "../assets/search.svg?react";
import { useRef, useEffect } from "react";

interface Props {
  className?: string;
  value: string;
  onChange: (e: any) => void;
}

const SearchBox = (props: Props) => {
  const inputFieldRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <div
      className={`flex w-96 grow flex-row items-center justify-start rounded-lg bg-gray-50 p-2 text-sm hover:cursor-text ${props.className || ""}`}
      onClick={() => {
        inputFieldRef.current?.focus();
      }}
    >
      <Search
        className="mx-2 w-5 fill-gray-500"
        onClick={() => {
          inputFieldRef.current?.focus();
        }}
      />
      <input
        type="text"
        ref={inputFieldRef}
        className="grow text-sm focus:outline-none md:text-base lg:text-lg"
        placeholder="Search for address, transaction, token..."
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      />
      <div className="ms-auto flex h-6 w-6 items-center justify-center rounded-sm bg-white text-gray-500">
        /
      </div>
    </div>
  );
};

export default SearchBox;
