import Button from "./Button";
import Data from "./assets/data.svg";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

interface DataMessageProps {
  children: ReactNode;
  goBack?: boolean;
}

export default function DataMessage(props: DataMessageProps) {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col items-center rounded-4xl bg-white px-4 py-12 sm:py-24">
      <Data className="m h-24 w-24" />
      <p className="overflow- mt-4 mb-6">{props.children}</p>
      {props.goBack && <Button className="h-10" value="Go back" primary onClick={() => navigate(-1)} />}
    </div>
  );
}
