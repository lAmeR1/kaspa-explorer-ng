import SpinnerIcon from "./assets/loader.svg";

const Spinner = ({ className }: { className?: string }) => (
  <SpinnerIcon className={`fill-primary animate-spin ${className}`} />
);

export default Spinner;
