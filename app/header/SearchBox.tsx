import Search from "../assets/search.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "~/Spinner";
import Error from "~/assets/error.svg";
import { useBlockById } from "~/hooks/useBlockById";
import { useTransactionById } from "~/hooks/useTansactionById";
import { isValidHashSyntax, isValidKaspaAddressSyntax } from "~/utils/kaspa";

interface Props {
  className?: string;
  value: string;
  onChange: (e: string) => void;
}

const SearchBox = (props: Props) => {
  const inputFieldRef = useRef<HTMLInputElement | null>(null);
  const [invalidInput, setInvalidInput] = useState(false);
  const navigate = useNavigate();
  const [searchHashValue, setSearchHashValue] = useState<string>("");
  const { isError, isSuccess, isLoading } = useBlockById(searchHashValue);
  const {
    isSuccess: txIsSuccess,
    isError: txIsError,
    isLoading: txIsLoading,
  } = useTransactionById(isError ? searchHashValue : "");

  const navigateAndReset = (to: string) => {
    props.onChange("");
    setSearchHashValue("");
    navigate(to);
  };

  useEffect(() => {
    if (isSuccess) navigateAndReset(`/blocks/${searchHashValue}`);
  }, [isSuccess]);

  useEffect(() => {
    if (txIsSuccess) {
      navigateAndReset(`/transactions/${searchHashValue}`);
    }
  }, [txIsSuccess]);

  useEffect(() => {
    if (txIsError) setInvalidInput(true);
  }, [txIsError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const searchValue = inputFieldRef.current?.value.trim() || "";
    setSearchHashValue("");

    if (isValidKaspaAddressSyntax(searchValue)) {
      navigateAndReset(`/addresses/${searchValue}`);
    } else if (isValidHashSyntax(searchValue)) {
      setSearchHashValue(searchValue);
    } else {
      setInvalidInput(true);
    }
    e.preventDefault();
  };

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
      className={`flex grow flex-row items-center justify-start rounded-lg bg-gray-50 p-2 text-sm hover:cursor-text ${props.className || ""}`}
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
      <form onSubmit={handleSubmit} className="grow">
        <input
          type="text"
          ref={inputFieldRef}
          className={`${invalidInput ? "text-alert" : ""} w-full pe-2 text-sm focus:outline-none md:text-base lg:text-lg`}
          placeholder="Search for address, transaction, token..."
          onChange={(e) => {
            setInvalidInput(false);
            return props.onChange(e.target.value);
          }}
          value={props.value}
        />
      </form>
      <div className="ms-auto flex h-6 w-6 items-center justify-center rounded-sm bg-white text-gray-500">
        {invalidInput ? (
          <Error className="fill-alert h-5 w-5" />
        ) : isLoading || txIsLoading ? (
          <Spinner className="fill-primary h-5 w-5 animate-spin" />
        ) : (
          "/"
        )}
      </div>
    </div>
  );
};
export default SearchBox;
