import Button from "./Button";
import ErrorIcon from "./assets/404.svg";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

interface ErrorMessageProps {
  children: ReactNode;
  goBack?: boolean;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  const navigate = useNavigate();
  return (
    <div className="flex w-full max-w-300 flex-col items-center rounded-4xl bg-white px-4 py-12 sm:py-24">
      <ErrorIcon className="m h-40 w-40" />
      <p className="overflow- mt-8 mb-6">{props.children}</p>
      {props.goBack && <Button className="h-10" value="Go back" primary onClick={() => navigate(-1)} />}
    </div>
  );
}
