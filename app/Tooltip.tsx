import Triangle from "./assets/triangle.svg";
import { type ReactNode, useEffect, useRef, useState } from "react";

export enum TooltipDisplayMode {
  Sticky = "showAlways",
  Hover = "hover",
  Click = "click",
}

const Tooltip = (props: {
  className?: string;
  message: string;
  children: ReactNode;
  duration?: number;
  display: TooltipDisplayMode;
  multiLine?: boolean;
  clickTimeout?: number;
}) => {
  const tooltipDiv = useRef<HTMLDivElement>(null);

  const [showElement, setShowElement] = useState(props.display == TooltipDisplayMode.Sticky);

  useEffect(() => {
    if (tooltipDiv.current) {
      const rect = tooltipDiv.current.getBoundingClientRect();

      if (rect.left < 0) {
        tooltipDiv.current.style.transform = `translateX(${Math.round(-1 * rect.left + 8)}px)`;
      }
    }
    if (showElement && props.clickTimeout) setTimeout(() => setShowElement(false), props.clickTimeout);
  }, [showElement]);

  return (
    <div className={`relative inline-block ${props.className}`}>
      <span
        onMouseEnter={() => props.display === TooltipDisplayMode.Hover && setShowElement(true)}
        onMouseLeave={() => props.display === TooltipDisplayMode.Hover && setShowElement(false)}
        onClick={() =>
          [TooltipDisplayMode.Hover, TooltipDisplayMode.Click].includes(props.display) && setShowElement(true)
        }
      >
        {props.children}
      </span>

      {props.message && showElement && (
        <>
          <Triangle
            className={`fadeIn absolute top-0 right-1/2 z-900 inline-block h-3 w-3 translate-x-1/2 -translate-y-full fill-black opacity-100 transition-opacity duration-500`}
          />
          <div
            ref={tooltipDiv}
            className={`fadeIn absolute top-0 left-1/2 z-900 inline-block max-w-[96vw] -translate-x-1/2 -translate-y-[calc(100%+8px)] overflow-hidden rounded-xl bg-black p-2 text-nowrap text-white opacity-100 transition-opacity duration-500 ${props.multiLine ? "w-80 text-wrap" : ""}`}
          >
            {props.message}
          </div>
        </>
      )}
    </div>
  );
};

export default Tooltip;
