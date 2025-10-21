import Spinner from "./Spinner";
import ClockLoader from "./assets/clock_loader_10.svg";
import { useVirtualChainBlueScore } from "./hooks/useVirtualChainBlueScore";

export const Accepted = () => (
  <div className="bg-accent-green text-success inline rounded-full px-2 py-0.5 text-center break-keep">Accepted</div>
);

export const NotAccepted = () => (
  <div className="bg-accent-red text-alert inline rounded-full px-2 py-0.5 text-center break-keep">Not accepted</div>
);

export const Confirmed = () => (
  <div className="bg-accent-green text-success inline rounded-full px-2 py-0.5 text-center break-keep">Confirmed</div>
);

export const displayAcceptance = (accepted: boolean, confirmations: number | undefined) => {
  return (
    <div className="flex flex-row items-center gap-x-1">
      {accepted ? <Accepted /> : <NotAccepted />}
      {accepted && confirmations && (
        <>
          {confirmations < 86400 ? (
            <span className="flex flex-row items-center gap-x-1">
              {confirmations ? confirmations : <Spinner className="w-4 h-4" />} confirmations
              <ClockLoader className="h-4 w-4" />
            </span>
          ) : (
            <Confirmed />
          )}
        </>
      )}
    </div>
  );
};
