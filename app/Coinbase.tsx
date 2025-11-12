import Tooltip, { TooltipDisplayMode } from "./Tooltip";
import Info from "./assets/info.svg";

export default () => (
  <div className="flex flex-row flex-nowrap items-center justify-start gap-x-0.5">
    COINBASE
    <Tooltip message="Newly mined coins." display={TooltipDisplayMode.Hover}>
      <Info className="fill-gray-500 h-4 w-4 -translate-y-0.25" />
    </Tooltip>
  </div>
);
