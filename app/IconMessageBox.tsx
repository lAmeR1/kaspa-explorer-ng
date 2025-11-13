import Button from "./Button";
import ErrorIcon from "./assets/404.svg";
import Data from "./assets/data.svg";
import { useNavigate } from "react-router";

interface DataMessageProps {
  goBack?: boolean;
  icon: "data" | "error";
  title: string;
  description: string | React.ReactNode;
}

export default function IconMessageBox(props: DataMessageProps) {
  const navigate = useNavigate();
  const iconClassName = "h-24 w-24";

  return (
    <div className="flex w-full flex-col items-center rounded-4xl bg-white px-4 py-12 sm:py-24">
      {props.icon == "data" && <Data className={iconClassName} />}
      {props.icon == "error" && <ErrorIcon className={iconClassName} />}

      <p className="overflow- mt-4 mb-6">
        <div className="flex flex-col items-center justify-center">
          <div className="text-xl font-medium">{props.title}</div>
          <div className="text-center">{props.description}</div>
        </div>
      </p>
      {props.goBack && <Button className="h-10" value="Go back" primary onClick={() => navigate(-1)} />}
    </div>
  );
}
