import type { ReactNode } from "react";
import Triangle from "~/assets/triangle.svg";

const InfoBox = (props: { className?: string; children: ReactNode }) => (
  <div
    className={`absolute top-0 right-1/2 z-10 flex translate-x-1/2 -translate-y-[110%] flex-col items-center ${props.className}`}
  >
    <div className="rounded-xl bg-black p-2 text-white">{props.children}</div>
    <Triangle className="fill-black align-middle" />
  </div>
);

export default InfoBox;
