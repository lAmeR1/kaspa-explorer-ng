import Spinner from "./Spinner";
import type { ReactNode } from "react";

interface LoadingMessageProps {
  children: ReactNode;
  goBack?: boolean;
}

export default function LoadingMessage(props: LoadingMessageProps) {
  return (
    <div className="flex w-full max-w-300 flex-col items-center rounded-4xl bg-white py-12 sm:py-24">
      <Spinner className="m h-15 w-15" />
      <p className="mt-8 mb-6">{props.children}</p>
    </div>
  );
}
