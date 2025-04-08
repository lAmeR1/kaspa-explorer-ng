import Button from "../Button";
import { useNavigate } from "react-router";
import ErrorIcon from "~/assets/404.svg";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full max-w-300 flex-col items-center rounded-4xl bg-white py-12 sm:py-24">
      <ErrorIcon className="m h-40 w-40" />
      <p className="mt-8 mb-6">Sorry, we couldn't find the page you were looking for.</p>
      <Button className="mb-24" value="Go back" primary onClick={() => navigate(-1)} />
    </div>
  );
}
