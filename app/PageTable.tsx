import dayjs from "dayjs";
import React, { type ReactNode } from "react";

interface PageTableProps {
  rows: ReactNode[][];
  headers: ReactNode[];
}

const PageTable = (props: PageTableProps) => {
  return (
    <div
      className={`grid grid-cols-[1fr_auto]
      gap-x-2 sm:gap-x-4
     sm:grid-cols-[auto_auto_auto_auto_auto_auto]`}
    >
      {props.headers.map((headerName, i) => (
        <div className={`hidden sm:block text-gray-500 ${i + 1 === props.headers.length ? "text-right" : ""}`}>
          {headerName}
        </div>
      ))}

      {props.rows.map((row) => (
        <>
          {row.map((cell, i) => (
            <>
              <div className="sm:hidden py-1 sm:py-3 text-gray-500 col-start-1">{props.headers[i]}</div>
              <div
                className={`block text-right overflow-hidden text-ellipsis py-1 sm:py-3 text-black 
             ${i === 0 ? " sm:col-start-1" : ""}
             ${i + 1 === props.headers.length ? " sm:text-right" : " sm:text-left"}
            `}
              >
                {cell}
              </div>
            </>
          ))}
          <div className="col-span-2 sm:col-span-6 col-start-1 h-[1px] bg-gray-100 my-3" />
        </>
      ))}
    </div>
  );
};

export default PageTable;
