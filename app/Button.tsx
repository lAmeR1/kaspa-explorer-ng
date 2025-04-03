import React from "react";

interface ButtonProps {
  primary?: boolean;
  value: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => {
  let className =
    "rounded-full h-8 min-w-8 hover:cursor-pointer border hover:border-gray-200 px-6 py-2" +
    "flex flex-row items-center justify-center text-nowrap";

  if (props.primary) {
    className += " bg-primary text-white";
  } else {
    className += " text-gray-500 bg-white border border-gray-100";
  }

  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Button;
