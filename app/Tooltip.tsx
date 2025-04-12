import { type ReactNode, useEffect, useRef, useState } from "react";
import Triangle from "~/assets/triangle.svg";

const Tooltip = (props: {
  className?: string;
  message: string;
  children: ReactNode;
  duration?: number;
  showAlways?: boolean;
  hover?: boolean;
  click?: boolean;
}) => {
  const tooltipDiv = useRef<HTMLDivElement>(null);
  const [fullOpacity, setFullOpacity] = useState(props.showAlways || false);
  const [isHovered, setIsHovered] = useState(props.showAlways || false);
  const [additionalClassName, setAdditionalClassName] = useState("");

  useEffect(() => {
    if (props.showAlways) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
      setFullOpacity(false);
    }
  }, [props.showAlways]);

  useEffect(() => {
    setFullOpacity(false);

    if (tooltipDiv.current) {
      const rect = tooltipDiv.current.getBoundingClientRect();

      if (rect.right > window.innerWidth) {
        tooltipDiv.current.style.left =
          Math.round(parseFloat(tooltipDiv.current.style.left || "0") - rect.right + window.innerWidth - 16) + "px";
      }
      if (rect.left < 0) {
        tooltipDiv.current.style.left = Math.round(-1 * rect.left + 16) + "px";
      }

      if (rect.width > 320) {
        setAdditionalClassName("w-80 text-wrap");
      }
    }
    if (isHovered) {
      const opacityTimer = setTimeout(() => setFullOpacity(true), 300);
      // if isHovered changes to false during timeout -> clear timer!
      return () => clearTimeout(opacityTimer);
    }
  }, [isHovered]);

  return (
    <div className={`relative inline-block ${props.className}`}>
      <span
        onMouseEnter={() => props.hover && setIsHovered(true)}
        onMouseLeave={() => props.hover && setIsHovered(false)}
        onClick={() => (props.click || props.hover) && setIsHovered(true)}
      >
        {props.children}
      </span>

      {props.message && isHovered && (
        <>
          <Triangle
            className={
              `absolute top-0 inline-block ${fullOpacity ? "opacity-100" : "opacity-0"} right-1/2 h-3 w-3 translate-x-1/2 -translate-y-full` +
              ` fill-black transition-opacity duration-500`
            }
          />
          <div
            ref={tooltipDiv}
            className={`absolute top-0 left-1/2 inline-block ${fullOpacity ? "opacity-100" : "opacity-0"} -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-xl bg-black p-2 text-nowrap text-white transition-opacity duration-500 ${additionalClassName}`}
          >
            <span className="">{props.message}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Tooltip;
