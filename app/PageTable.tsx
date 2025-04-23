import dayjs from "dayjs";
import React, { type ReactNode } from "react";

interface PageTableProps {
  rows: ReactNode[][];
  headers: ReactNode[];
}

const PageTable = (props: PageTableProps) => {
  return (
    <div
      className={`grid grid-cols-1
      
     sm:grid-cols-[3fr_3fr_3fr_1fr_5fr_3fr_3fr]`}
    >
      {props.headers.map((headerName, i) => (
        <div
          className={`hidden sm:block ps-4 text-gray-500 ${i + 1 === props.headers.length ? "text-right sm:pe-4" : ""}`}
        >
          {headerName}
        </div>
      ))}

      <div className={`col-span-1 sm:col-span-${props.headers.length} col-start-1 h-[1px] bg-gray-100 my-3`} />

      {props.rows.map((row, rowNr) => (
        <>
          {row.map((cell, colNr) => (
            <>
              <div className="sm:hidden py-1 sm:py-3 text-gray-500 col-start-1">{props.headers[colNr]}</div>
              <div
                className={`block self-center text-left text-ellipsis ps-4 py-1 sm:py-3 text-black 
             ${colNr === 0 ? " sm:col-start-1" : ""}
             ${colNr + 1 === props.headers.length ? " sm:text-right sm:pe-4" : " sm:text-left"}
            `}
              >
                {cell}
              </div>
            </>
          ))}
          {rowNr + 1 < props.rows.length && (
            <div className={`col-span-1 sm:col-span-${props.headers.length} col-start-1 h-[1px] bg-gray-100 my-3`} />
          )}
        </>
      ))}
    </div>
  );
};

export default PageTable;
